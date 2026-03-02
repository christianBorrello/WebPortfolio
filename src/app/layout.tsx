import { Dynalight } from "next/font/google";
import { getLocale } from "next-intl/server";
import "./globals.css";

const dynalight = Dynalight({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dynalight",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={dynalight.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
