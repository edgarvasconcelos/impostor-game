import { useState } from "react";
import { Screen } from "../components/Screen";
import { useGame } from "../context/GameContext";
import { suggestImpostors } from "../utils/suggestImpostors";

export default function SetupGame() {
  const { game, setGame } = useGame();

  const suggested = suggestImpostors(game.players.length);
  const [confirmReset, setConfirmReset] = useState(false);

  const [impostors, setImpostors] = useState(suggested);
  const [hint, setHint] = useState(game.impostorHasHint ?? false);
  const [time, setTime] = useState(game.timerSeconds || 180);

  function pickRandomIndexes(total: number, count: number) {
    const indexes = Array.from({ length: total }, (_, i) => i);

    for (let i = indexes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }

    return indexes.slice(0, count);
  }

  function next() {
    const impostorIndexes = pickRandomIndexes(
      game.players.length,
      impostors
    );

    const players = game.players.map((p, i) => ({
      ...p,
      isImpostor: impostorIndexes.includes(i)
    }));

    setGame(g => ({
      ...g,
      players,
      impostorCount: impostors,
      impostorHasHint: hint,
      timerSeconds: time,
      starterIndex: Math.floor(Math.random() * players.length),
      phase: "select_category"
    }));
  }

  return (
    <Screen
      onBack={() =>
        setGame(g => ({ ...g, phase: "setup_players" }))
      }
      header={
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Configuração da rodada
          </h2>
        </div>
      }
      footer={
        <div className="space-y-3">
          <button
            className="btnPrimary w-full"
            onClick={next}
          >
            Continuar
          </button>
        </div>
      }
    >
      <div className="space-y-6">

        {/* IMPOSTORES */}
        <div>
          <h3 className="font-semibold mb-3">
            Quantos impostores?
          </h3>

          <div className="grid grid-cols-4 gap-3">
            {[1, 2, 3, 4]
              .filter(n => n < game.players.length)
              .map(n => (
                <button
                  key={n}
                  onClick={() => setImpostors(n)}
                  className={`py-3 rounded-xl font-bold transition
                    ${impostors === n
                      ? "bg-indigo-500 text-white scale-105"
                      : "bg-slate-800 text-slate-300"
                    }`}
                >
                  {n}
                </button>
              ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm">
            <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400 font-semibold">
              ⭐ Sugerido
            </span>

            <span className="text-slate-300">
              {suggested} impostor{suggested > 1 ? "es" : ""}
            </span>
          </div>

        </div>

        {/* DICA */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">
              Impostor recebe dica
            </h3>
            <p className="text-xs text-slate-400">
              Ajuda o impostor a se camuflar
            </p>
          </div>

          <button
            onClick={() => setHint(h => !h)}
            className={`w-14 h-8 rounded-full relative transition
              ${hint ? "bg-green-500" : "bg-slate-700"}`}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition
                ${hint ? "translate-x-6" : ""}`}
            />
          </button>
        </div>

        {/* TEMPO */}
        <div>
          <h3 className="font-semibold mb-3">
            Tempo de jogo
          </h3>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "1 min", value: 60 },
              { label: "2 min", value: 120 },
              { label: "3 min", value: 180 },
              { label: "4 min", value: 240 },
              { label: "5 min", value: 300 },
              { label: "6 min", value: 360 },
            ].map(t => (
              <button
                key={t.value}
                onClick={() => setTime(t.value)}
                className={`py-4 rounded-xl font-semibold transition
                  ${time === t.value
                    ? "bg-indigo-500 text-white scale-105"
                    : "bg-slate-800 text-slate-300"
                  }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

      </div>
      {confirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-sm rounded-2xl bg-slate-900 p-6 text-center">

            <h2 className="text-xl font-bold mb-3">
              Iniciar novo jogo?
            </h2>

            <p className="text-slate-400 mb-6">
              O progresso da rodada atual será perdido.
            </p>

            <div className="flex gap-3">
              <button
                className="flex-1 py-3 rounded-xl bg-slate-700 text-white"
                onClick={() => setConfirmReset(false)}
              >
                Cancelar
              </button>

              <button
                className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold"
                onClick={() => {
                  setConfirmReset(true);
                  setGame(g => ({ ...g, phase: "home" }));
                }}
              >
                Confirmar
              </button>
            </div>

          </div>
        </div>
      )}

    </Screen>
  );
}
