import { useGame } from "../context/GameContext";

export default function PreTimer() {
  const { game, setGame } = useGame();

  const starter =
    game.players?.[game.starterIndex] ??
    game.players?.[0];

  if (!starter) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Preparando jogo…
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center text-white px-6 text-center"
      style={{ backgroundColor: starter.color }}
    >
      <h1 className="text-4xl font-bold mb-2">
        Quem começa a falar
      </h1>
      <h2 className="text-3xl mb-6">
        {starter.name}
      </h2>
      <img
        src={starter.avatar}
        alt={starter.name}
        className="w-32 h-32 rounded-full border-4 border-white mb-6"
      />

      <button
        className="w-3/4 px-10 py-4 rounded-full
                   bg-black/40 backdrop-blur-sm
                   text-lg font-semibold
                   active:scale-95 transition"
        onClick={() =>
          setGame(g => ({
            ...g,
            phase: "start_timer",
            remainingTime: g.timerSeconds
          }))
        }
      >
        Iniciar jogo
      </button>
    </div>
  );
}
