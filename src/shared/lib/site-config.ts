import { OWNER } from "./owner-config";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? OWNER.domain;
