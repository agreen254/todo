import { useEffect, useState } from "react";
import getRandomQuote from "../utils/getRandomQuote";
import { Quote } from "../types";

const QuoteFooter = () => {
  const [quote, setQuote] = useState<Quote>();
  useEffect(() => {
    setQuote(getRandomQuote);
  });

  return (
    quote && (
      <>
        <p>{quote.q}</p>
        <p>{quote.a}</p>
      </>
    )
  );
};

export default QuoteFooter;
