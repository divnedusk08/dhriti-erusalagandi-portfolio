"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Send, MessageSquare, User, MapPin } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { submitContactForm } from "@/lib/actions";

export default function ContactSection() {
  const { toast } = useToast();
  const db = useFirestore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(values);

      if (result.success) {
        toast({ title: "Success!", description: result.message });
        form.reset();
      } else {
        toast({ variant: "destructive", title: "Failed", description: result.message });
      }

      if (db) {
        const contactsRef = collection(db, "contacts");
        addDoc(contactsRef, { ...values, createdAt: serverTimestamp() }).catch(() => {});
      }
    } catch {
      toast({ variant: "destructive", title: "Error", description: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  }

  const myInfo = [
    { icon: User, label: "Full Name", value: "Dhriti Erusalagandi" },
    { icon: Mail, label: "Email", value: "divineduskdragon08@gmail.com" },
    { icon: MapPin, label: "Location", value: "Austin, Texas" },
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 md:px-10">
      <header className="mb-12 max-w-2xl">
        <p className="eyebrow mb-4">Contact</p>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h2>
      </header>

      <div
        ref={containerRef}
        className={cn(
          "grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16 fade-in-up",
          { "is-visible": isVisible }
        )}
      >
        <div className="space-y-8">
          {myInfo.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <item.icon className="mt-1 h-5 w-5 flex-shrink-0 text-primary" strokeWidth={1.5} />
              <div>
                <p className="eyebrow mb-1 text-[0.65rem]">{item.label}</p>
                <p className="text-base text-foreground">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-muted-foreground"><User className="mr-2 h-4 w-4" />Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Type your full name..." {...field} className="bg-background/70" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-muted-foreground"><Mail className="mr-2 h-4 w-4" />Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background/70" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-muted-foreground"><MessageSquare className="mr-2 h-4 w-4" />Your Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Your message here..."
                            className="min-h-[150px] bg-background/70"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 md:w-auto">
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Send Message
                  </Button>
                </form>
              </Form>
        </div>
      </div>
    </div>
  );
}
