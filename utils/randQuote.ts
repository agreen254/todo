import { randArrayEle } from "./randArrayEle";
import { quotes } from "./quotes";
import { Quote } from "./types";

export function getRandomQuote(): Quote {
  return randArrayEle(quotes);
}
