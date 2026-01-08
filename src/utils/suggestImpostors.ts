export function suggestImpostors(totalPlayers: number): number {
  return Math.max(1, Math.floor(totalPlayers / 4));
}
