import { NextResponse } from "next/server";
import { render } from "@react-email/components";
import { Resend } from "resend";
import { z } from "zod";
import { ContactNotification } from "@/features/contact/emails/contact-notification";
import type {
  ContactFieldError,
  ContactValidationErrorResponse,
} from "@/shared/types/contact";

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
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "validation_error", details: [{ field: "body", message: "Invalid JSON" }] } satisfies ContactValidationErrorResponse,
      { status: 400 }
    );
  }

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

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { success: false, error: "send_failed" },
      { status: 500 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const html = await render(
      ContactNotification({ name, email, message })
    );

    await resend.emails.send({
      from: "Portfolio Contact <contact@christianborrello.dev>",
      to: "christian.borrello@live.it",
      subject: `Portfolio contact from ${name || "Anonymous"}`,
      html,
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
