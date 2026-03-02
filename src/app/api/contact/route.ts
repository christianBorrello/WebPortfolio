import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import type {
  ContactFieldError,
  ContactValidationErrorResponse,
} from "@/shared/types/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactRequestSchema = z.object({
  name: z.string().max(100).default(""),
  email: z.string().email("Invalid email address"),
  message: z.string().max(5000).default(""),
});

function zodToFieldErrors(error: z.ZodError): ContactFieldError[] {
  const { fieldErrors } = error.flatten();
  return Object.entries(fieldErrors).flatMap(([field, messages]) =>
    (messages ?? []).map((message) => ({ field, message }))
  );
}

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const result = contactRequestSchema.safeParse(body);

  if (!result.success) {
    const response: ContactValidationErrorResponse = {
      success: false,
      error: "validation_error",
      details: zodToFieldErrors(result.error),
    };
    return NextResponse.json(response, { status: 400 });
  }

  const { name, email, message } = result.data;

  try {
    await resend.emails.send({
      from: "Portfolio Contact <contact@christianborrello.dev>",
      to: "christian@christianborrello.dev",
      subject: `Portfolio contact from ${name || "Anonymous"}`,
      text: [
        `Name: ${name || "Not provided"}`,
        `Email: ${email}`,
        "",
        "Message:",
        message || "No message provided",
      ].join("\n"),
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "send_failed" },
      { status: 500 }
    );
  }
}
