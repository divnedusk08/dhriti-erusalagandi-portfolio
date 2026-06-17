import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";
import { Resend } from "resend";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = ContactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ message: "Invalid form data.", success: false }, { status: 400 });
  }

  const { name, email, message: userMessage } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ message: "Missing RESEND_API_KEY.", success: false }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["divineduskdragon08@gmail.com"],
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

    if (error) {
      return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }

    return NextResponse.json({ message: `Thank you, ${name}! Your message has been sent.`, success: true });
  } catch (e: any) {
    return NextResponse.json({ message: e?.message || "Something went wrong.", success: false }, { status: 500 });
  }
}
