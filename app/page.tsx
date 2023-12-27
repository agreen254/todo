"use client";

import dynamic from "next/dynamic";
import Body from "./components/Body";

// https://www.youtube.com/watch?v=Hx2UqlhPmnc&t=180s
const DynamicBody = dynamic(() => import("./components/Body"), { ssr: false });

export default function Home() {
  return (
    <>
      <main className="h-[calc(100vh-100px)]">
        <DynamicBody />
      </main>
      <footer className="min-h-[100px] mb-[100px] lg:mb-auto overflow-y-auto">
        {/* <QuoteFooter /> */}
        <div></div>
      </footer>
    </>
  );
}
