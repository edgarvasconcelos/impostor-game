import { createContext, useContext } from "react";
import { usePersistentGame } from "../hooks/usePersistentGame";
import { initialGameState } from "./initialGameState";

export type GameState = typeof initialGameState;

/**
 * Tipos do jogo
 */
export type GamePhase =
  | "home"
  | "setup_players"
  | "setup_game"
  | "pre_timer"
  | "pass_phone"
  | "reveal"
  | "voting"
  | "result";


/**
 * Tipagem do Context
 */
interface GameContextValue {
  game: GameState;
  setGame: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameContext = createContext<GameContextValue | null>(null);

/**
 * Provider
 */
export function GameProvider({ children }: { children: React.ReactNode }) {
  const [game, setGame] = usePersistentGame<GameState>(
    "impostor-game",
    initialGameState
  );

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  );
}

/**
 * Hook de acesso ao jogo
 */
export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error("useGame must be used inside GameProvider");
  }
  return ctx;
}
