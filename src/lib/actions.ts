
"use server";

import { z } from "zod";
import { ContactFormSchema } from "./schemas";
import { Resend } from 'resend';

export type ContactFormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  success: boolean;
};

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = ContactFormSchema.safeParse(formData);

  if (!parsed.success) {
    return {
      message: "Invalid form data. Please check the fields below.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const { name, email, message: userMessage } = parsed.data;

  // Safely check for API key
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    console.warn("RESEND_API_KEY is missing. Please add it to your environment variables.");
    return {
      message: "Email service not configured. Please add your RESEND_API_KEY to receive emails.",
      success: false,
    };
  }

  try {
    // Initialize Resend only when the key is confirmed to exist
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: ['divineduskdragon08@gmail.com'],
      subject: `New Contact from ${name} via Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; border-left: 3px solid #eee; padding-left: 10px;">${userMessage}</p>
        </div>
      `,
    });

    return {
      message: `Thank you, ${name}! Your message has been sent to my Gmail.`,
      success: true,
    };

  } catch (error: any) {
    console.error("Failed to send email:", error);
    return {
      message: `Error sending message: ${error.message || "Please try again later."}`,
      success: false,
    };
  }
}
