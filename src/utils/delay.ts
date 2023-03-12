import { SHORT_DELAY_IN_MS } from "../constants/delays";

export const delay = (ms: number = SHORT_DELAY_IN_MS) => {
  return new Promise((res) => setTimeout(res, ms));
};
