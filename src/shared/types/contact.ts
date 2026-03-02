export type FormStatus = "idle" | "submitting" | "success" | "error";

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
