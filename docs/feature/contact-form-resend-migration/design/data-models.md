# Data Models: Contact Form Resend Migration

## Request Body Schema

The POST `/api/contact` endpoint accepts a JSON body with three fields.

```typescript
// Zod schema (server-side validation in route.ts)
import { z } from "zod";

const contactRequestSchema = z.object({
  name: z.string().max(100).default(""),
  email: z.string().email("Invalid email address"),
  message: z.string().max(5000).default(""),
});

type ContactRequest = z.infer<typeof contactRequestSchema>;
```

`.default("")` makes the field optional in input (can be omitted or undefined) but always resolves to a `string` after parsing. This is preferable over `.optional()` because downstream code (email template) never needs to handle `undefined`.

Resolved shape after `schema.parse()`:
```typescript
{
  name: string;    // "" if omitted, max 100 chars
  email: string;   // required, valid email format
  message: string; // "" if omitted, max 5000 chars
}
```

Validation error examples:
```typescript
// Missing email → { email: ["Invalid email address"] }
// Name too long → { name: ["String must contain at most 100 character(s)"] }
// Message too long → { message: ["String must contain at most 5000 character(s)"] }
```

## Response Schemas

Defined in `src/shared/types/contact.ts` alongside the existing `FormStatus` type.

### Success Response

```typescript
type ContactSuccessResponse = {
  readonly success: true;
};
```

HTTP 200. Returned when Resend accepts the email for delivery.

### Validation Error Response

```typescript
type ContactFieldError = {
  readonly field: string;
  readonly message: string;
};

type ContactValidationErrorResponse = {
  readonly success: false;
  readonly error: "validation_error";
  readonly details: readonly ContactFieldError[];
};
```

HTTP 400. Returned when Zod validation fails. The `details` array is converted from Zod's `flatten().fieldErrors` object (which is keyed by field name) into an array of `{ field, message }` pairs:

```typescript
// Zod flatten().fieldErrors shape: { email: ["Invalid email address"], name: ["Too long"] }
// Converted to response details array:
function zodToFieldErrors(error: z.ZodError): ContactFieldError[] {
  const { fieldErrors } = error.flatten();
  return Object.entries(fieldErrors).flatMap(([field, messages]) =>
    (messages ?? []).map((message) => ({ field, message }))
  );
}
```

### Server Error Response

```typescript
type ContactServerErrorResponse = {
  readonly success: false;
  readonly error: "send_failed";
};
```

HTTP 500. Returned when Resend API call fails (network error, rate limit, invalid API key, etc.). No internal details are exposed to the client.

### Union Type

```typescript
type ContactResponse =
  | ContactSuccessResponse
  | ContactValidationErrorResponse
  | ContactServerErrorResponse;
```

## Resend Email Payload

The API route constructs this payload from the validated request. This is the shape passed to `resend.emails.send()`.

```typescript
// Actual code in route.ts — values interpolated from validated request
await resend.emails.send({
  from: "Portfolio Contact <contact@christianborrello.dev>",
  to: "christian@christianborrello.dev",
  subject: `Portfolio contact from ${name || "Anonymous"}`,
  text: [
    `Name: ${name || "Not provided"}`,
    `Email: ${email}`,
    "",
    `Message:`,
    message || "No message provided",
  ].join("\n"),
  replyTo: email,
});
```

Notes:
- `from` requires a verified domain in Resend. Use `onboarding@resend.dev` for development/testing, the verified `christianborrello.dev` domain for production. See technology-stack.md for domain verification steps.
- `to` is hardcoded — this is the recipient (Christian's email).
- `replyTo` is set to the visitor's email so Christian can reply directly from his inbox.
- Plain text body (no HTML template needed for v1). The email is a notification, not a marketing piece.
- `subject` includes the sender's name for easy inbox scanning. Falls back to "Anonymous" if name is empty.
- Empty optional fields show explicit fallback text ("Not provided" / "No message provided") for clarity in the received email.

## Type File Organization

All new types go in the existing `src/shared/types/contact.ts`:

```typescript
// Existing
export type FormStatus = "idle" | "submitting" | "success" | "error";

// New -- API contract types
export type ContactSuccessResponse = { readonly success: true };

export type ContactFieldError = {
  readonly field: string;
  readonly message: string;
};

export type ContactValidationErrorResponse = {
  readonly success: false;
  readonly error: "validation_error";
  readonly details: readonly ContactFieldError[];
};

export type ContactServerErrorResponse = {
  readonly success: false;
  readonly error: "send_failed";
};

export type ContactResponse =
  | ContactSuccessResponse
  | ContactValidationErrorResponse
  | ContactServerErrorResponse;
```

The Zod schema is NOT exported from the types file. It lives in the API route file (`src/app/api/contact/route.ts`) because it is a server-side concern. The types above are the shared contract between client and server.
