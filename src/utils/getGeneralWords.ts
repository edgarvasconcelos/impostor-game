import { WORDS, WordItem } from "./words";

export function getGeneralWords(): WordItem[] {
  return Object.values(WORDS).flatMap(cat => cat.words);
}
