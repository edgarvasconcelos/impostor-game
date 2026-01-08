export function resetRound(game: any) {
  return {
    ...game,
    phase: "setup_game",
    votes: [],
    secretWord: "",
    hint: "",
    remainingTime: 0,
    currentPlayerIndex: 0,
    starterIndex: 0,
    players: game.players.map((p: any) => ({
      ...p,
      isImpostor: false
    }))
  };
}
