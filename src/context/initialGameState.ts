import type { Player } from "../types/player";

export const initialGameState = {
  phase: "home",

  players: [] as Player[],

  impostorCount: 1,
  impostorHasHint: true,

  secretWord: "",
  hint: "",

  votes:  [] as string[],

  timerSeconds: 180,
  remainingTime: 0,

  currentPlayerIndex: 0,
  starterIndex: 0
};
