
"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { submitContactForm } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Send, MessageSquare, User, MapPin, Building } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

const initialState = {
  message: "",
  success: false,
  fields: undefined as Record<string, string> | undefined,
  issues: undefined as string[] | undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 md:w-auto">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Send className="mr-2 h-4 w-4" />
      )}
      Send Message
    </Button>
  );
}

export default function ContactSection() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { toast } = useToast();
  const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: state.fields?.name || "",
      email: state.fields?.email || "",
      message: state.fields?.message || "",
    },
  });

  useEffect(() => {
    if (state.fields) {
      form.setValue("name", state.fields.name || "");
      form.setValue("email", state.fields.email || "");
      form.setValue("message", state.fields.message || "");
    }

    if (state.message) {
      if (state.success) {
        toast({
          title: "Success!",
          description: state.message,
        });
        form.reset({ name: "", email: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: state.message || "Failed to send message.",
          variant: "destructive",
        });
      }
    }
  }, [state, toast, form]);

  const myInfo = [
    { icon: User, label: "Full Name", value: "Dhriti Erusalagandi" },
    { icon: Mail, label: "Email", value: "divineduskdragon08@gmail.com" },
    { icon: MapPin, label: "Location", value: "Austin, Texas" },
  ];

  return (
    <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl interactive-text-hover">
          <span className="text-accent">Get in</span> <span className="text-accent">Touch</span>
        </h2>
      </header>

      <div
        ref={containerRef}
        className={cn(
          "grid gap-10 md:grid-cols-2 md:gap-12",
          "fade-in-up",
          { "is-visible": isVisible }
        )}
      >
        {/* My Info Section */}
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary interactive-text-hover">My Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {myInfo.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                  <p className="text-lg text-foreground interactive-text-hover">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Send Message Form Section */}
        <Card className="shadow-xl bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary interactive-text-hover">Send Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form action={formAction} className="space-y-6">
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
                <SubmitButton />
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
