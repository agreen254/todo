import { Quote } from "./types";
import { quotes } from "./quotes";
import randArrayEle from "./randEle";

export default function randQuote(): Quote {
  return randArrayEle(quotes);
}