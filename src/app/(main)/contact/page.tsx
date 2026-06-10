"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, type ContactFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Send, MessageSquare, User, MapPin } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useFirestore } from "@/firebase";
import { submitContactForm } from "@/lib/actions";

function InteractiveWrapper({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const rotateX = (y - height / 2) / (height / 2) * -8;
    const rotateY = (x - width / 2) / (width / 2) * 8;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-in-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={style}
      className="h-full"
    >
      {children}
    </div>
  );
}

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
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("message", values.message);

      const result = await submitContactForm({ success: false, message: "" }, formData);

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Sending Failed",
          description: result.message,
        });
      }

      if (db) {
        const contactsRef = collection(db, "contacts");
        addDoc(contactsRef, {
          ...values,
          createdAt: serverTimestamp(),
        }).catch(() => {});
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
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
    <div className="container mx-auto max-w-5xl py-8 px-4 md:py-12">
      <header className="mb-10 text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl interactive-text-hover">
          <span className="text-accent">Get in</span> <span className="text-accent">Touch</span>
        </h2>
      </header>

      <div
        ref={containerRef}
        className={cn(
          "grid gap-10 md:grid-cols-2 md:gap-12 fade-in-up",
          { "is-visible": isVisible }
        )}
      >
        <div className="h-full">
          <InteractiveWrapper>
            <Card className="shadow-xl bg-card/80 backdrop-blur-sm rounded-3xl h-full border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">My Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {myInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <item.icon className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      <p className="text-lg text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </InteractiveWrapper>
        </div>

        <div className="h-full">
          <InteractiveWrapper>
            <Card className="shadow-xl bg-card/80 backdrop-blur-sm rounded-3xl h-full border-accent/20">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-primary">Send Message</CardTitle>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </InteractiveWrapper>
        </div>
      </div>
    </div>
  );
}