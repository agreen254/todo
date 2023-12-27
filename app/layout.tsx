import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import NextThemeProvider from "./providers/NextThemeProvider";
import "./globals.css";

const notoSans = Noto_Sans({ subsets: ["latin"] });

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
      <body className={notoSans.className}>
        <NextThemeProvider
          defaultTheme="dark"
          attribute="class"
          disableTransitionOnChange
        >
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
