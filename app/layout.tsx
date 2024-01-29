import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import NextThemeProvider from "../providers/NextThemeProvider";
import TodoProvider from "../providers/TodoProvider";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className={openSans.className} suppressHydrationWarning>
      <head />
      <body className="bg-background antialiased">
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
