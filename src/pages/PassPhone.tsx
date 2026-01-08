import { useGame } from "../context/GameContext";

export default function PassPhone() {
  const { game, setGame } = useGame();

  const index =
    game.players.length === 0
      ? null
      : game.currentPlayerIndex < game.players.length
        ? game.currentPlayerIndex
        : 0;

  const player =
    index !== null ? game.players[index] : null;

  if (!player) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-white">
        Preparando jogo…
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center text-white px-6 text-center"
      style={{ backgroundColor: player.color }}
    >
      {/* Avatar */}
      <img
        src={player.avatar}
        alt={player.name}
        className="w-32 h-32 rounded-full border-4 border-white mb-6"
      />

      {/* Texto */}
      <h2 className="text-2xl mb-2">
        Passe o celular para
      </h2>

      <h1 className="text-4xl font-bold mb-10">
        {player.name}
      </h1>

      {/* Botão */}
      <button
        className="w-3/4 px-10 py-4 rounded-full
                   bg-black/40
                   text-white
                   backdrop-blur-sm
                   text-lg font-semibold
                   active:scale-95 transition"
        onClick={() =>
          setGame(g => ({
            ...g,
            revealIndex: g.currentPlayerIndex,
            phase: "reveal"
          }))
        }
      >
        Ver palavra
      </button>
    </div>
  );
}
