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

const resend = new Resend(process.env.RESEND_API_KEY || "re_123");

export async function submitContactForm(
  prevState: ContactFormState,
  data: FormData
): Promise<ContactFormState> {
  const formData = Object.fromEntries(data);
  const parsed = ContactFormSchema.safeParse(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    parsed.error.issues.forEach(issue => {
      if (issue.path.length > 0) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
    });
    return {
      message: "Invalid form data. Please check the fields below.",
      fields: formData as Record<string, string>,
      issues: parsed.error.issues.map((issue) => issue.message),
      success: false,
    };
  }

  const { name, email, message: userMessage } = parsed.data;

  try {
    const response = await resend.emails.send({
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
      message: `Thank you, ${name}! Your message has been received.`,
      success: true,
      fields: undefined,
      issues: undefined,
    };

  } catch (error) {
    console.error("Failed to send email:", error);
    return {
      message: "Sorry, there was an error sending your message. Please try again later.",
      success: false,
      fields: parsed.data,
      issues: ["Email sending failed due to a server error."],
    };
  }
}