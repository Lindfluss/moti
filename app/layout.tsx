import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://moti-type.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moti Type — Какой ты моти?",
    template: "%s | Moti Type",
  },
  description:
    "Пройди лёгкий тест из 15 вопросов и узнай, какой из 12 моти отражает твой характер. Найди своего моти в Moti Type!",
  applicationName: "Moti Type",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Moti Type",
    title: "Moti Type — Какой ты моти?",
    description:
      "15 вопросов, 12 характеров и один моти, который похож именно на тебя. Пройди тест и узнай свой результат!",
  },
  twitter: {
    card: "summary",
    title: "Moti Type — Какой ты моти?",
    description:
      "Пройди тест из 15 вопросов и узнай, какой из 12 моти отражает твой характер.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
