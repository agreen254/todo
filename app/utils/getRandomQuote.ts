import { randArrayEle } from "./randArrayEle";
import { quotes } from "./quotes";
import { Quote } from "../types";

const getRandomQuote = (): Quote => {
  return randArrayEle(quotes);
};

export default getRandomQuote;
