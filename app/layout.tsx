import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import NextThemeProvider from "../providers/NextThemeProvider";
import TodoProvider from "../providers/TodoProvider";
import "./globals.css";
import { cn } from "@/utils/cn";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Aaron's implementation of the todo app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
      >
        <NextThemeProvider
          defaultTheme="light"
          attribute="class"
          disableTransitionOnChange
        >
          <TodoProvider>{children}</TodoProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
