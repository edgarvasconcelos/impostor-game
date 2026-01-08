import { useState } from "react";
import { useGame } from "../context/GameContext";

export default function Reveal() {
  const { game, setGame } = useGame();
  const player = game.players[game.currentPlayerIndex];
  const [show, setShow] = useState(false);
  console.log(game)
  console.log(game.currentPlayerIndex);
  console.log(player);
  const last =
    game.currentPlayerIndex === game.players.length - 1;

  function next() {
    if (last) {
      setGame((g: any) => ({
        ...g,
        phase: "pre_timer"
      }));
    } else {
      setGame((g: any) => ({
        ...g,
        currentPlayerIndex: g.currentPlayerIndex + 1,
        phase: "pass_phone"
      }));
    }
  }

  return (
    <div
      className="h-screen w-screen flex flex-col items-center justify-center text-white px-6"
      style={{ backgroundColor: player.color }}
    >
      {/* Avatar */}
      <h1 className="text-4xl font-bold mb-6">
        {player.name}
      </h1>
      <img
        src={player.avatar}
        className="w-32 h-32 rounded-full border-4 border-white mb-6"
      />

      {/* Conteúdo secreto */}
      <div
        className={`w-full h-1/5 max-w-sm rounded-2xl px-6 py-8
                    bg-black/40 backdrop-blur-md
                    transition-all duration-300
                    flex flex-col text-center items-center justify-center
                    ${show ? "blur-0" : "blur-xl"}`}
      >
        {show ? (
          player.isImpostor ? (
            <>
              <h1 className="text-4xl font-bold mb-4">
                IMPOSTOR
              </h1>

              {game.impostorHasHint && (
                <p className="text-lg opacity-90">
                  Dica: <strong>{game.hint}</strong>
                </p>
              )}
            </>
          ) : (
            <h1 className="text-4xl font-bold">
              {game.secretWord}
            </h1>
          )
        ) : (
          <h1 className="text-3xl font-semibold tracking-wide opacity-80">

          </h1>
        )}
      </div>


      {/* Botão revelar */}
      <button
        className="w-3/4 mt-8 px-8 py-4 rounded-full
                   bg-black/40 text-white
                   backdrop-blur-sm
                   active:scale-95 transition"
        onPointerDown={() => setShow(true)}
        onPointerUp={() => setShow(false)}
        onPointerLeave={() => setShow(false)}
      >
        Segure para revelar
      </button>

      {/* Botão próximo */}
      <button
        className="w-3/4 mt-6 px-8 py-4 rounded-full
                   border-2 border-white/70
                   text-white
                   active:scale-95 transition"
        onClick={next}
      >
        Próximo
      </button>
    </div>
  );
}
