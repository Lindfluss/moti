import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Какой ты моти? — Узнай свой характер",
  description:
    "Ответь на 15 вопросов и узнай, какой из 12 моти отражает твой характер.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
