"use client";

import { useEffect, useState } from "react";
import { getRandomQuote } from "@/utils/randQuote";
import { Quote } from "@/utils/types";

const Footer = () => {
  const [quote, setQuote] = useState<Quote>();

  // useEffect stops client/server mismatch by only running the code clientside
  useEffect(() => {
    setQuote(getRandomQuote);
  }, []);

  if (!quote) return;

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg text-center mx-4">{quote.q.trim()}</p>
      <p className="text-lg">- {quote.a.trim()}</p>
      <p className="text-sm">
        <a
          href="https://zenquotes.io"
          target="_blank"
          className="underline text-sky-600 visited:text-purple-500"
        >
          zenquotes.io
        </a>
      </p>
    </div>
  );
};

export default Footer;
