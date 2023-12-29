import { randArrayEle } from "./randArrayEle";
import { quotes } from "./quotes";
import { Quote } from "./todoTypes";

export function getRandomQuote(): Quote {
  return randArrayEle(quotes);
}
