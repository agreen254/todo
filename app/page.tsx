"use client";

import Body from "./components/Body";
import QuoteFooter from "./components/QuoteFooter";

export default function Home() {
  return (
    <>
      <main className="h-[calc(100vh-100px)]">
        <Body />
      </main>
      <footer className="min-h-[100px] mb-[100px] lg:mb-auto overflow-y-auto">
        <QuoteFooter />
      </footer>
    </>
  );
}
