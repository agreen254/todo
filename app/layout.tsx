import type { Metadata } from "next";
import { Noto_Sans as FontSans } from "next/font/google";
import NextThemeProvider from "../providers/NextThemeProvider";
import TodoProvider from "../providers/TodoProvider";
import "./globals.css";
import { cn } from "@/utils/utils";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Todos",
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
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
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
