import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Твой результат",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
  },
};

export default function ResultLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
