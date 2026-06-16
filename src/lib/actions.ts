"use server";

import { ContactFormSchema, type ContactFormValues } from "./schemas";
import { Resend } from 'resend';

export type ContactFormState = {
  message: string;
  success: boolean;
};

export async function submitContactForm(
  values: ContactFormValues
): Promise<ContactFormState> {
  const parsed = ContactFormSchema.safeParse(values);

  if (!parsed.success) {
    return {
      message: "Invalid form data. Please check the fields below.",
      success: false,
    };
  }

  const { name, email, message: userMessage } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    return {
      message: "Missing RESEND_API_KEY. Copy env.example to .env.local and add your key from https://resend.com/api-keys",
      success: false,
    };
  }

  try {
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
      message: `Thank you, ${name}! Your message has been sent.`,
      success: true,
    };

  } catch (error: any) {
    console.error("Failed to send email:", error);
    return {
      message: `Error: ${error?.message || "Something went wrong. Please try again."}`,
      success: false,
    };
  }
}
