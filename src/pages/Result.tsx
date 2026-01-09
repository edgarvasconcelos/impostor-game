import { Screen } from "../components/Screen";
import { useGame } from "../context/GameContext";
import { resetRound } from "../utils/resetRound";

export default function Result() {
  const { game, setGame } = useGame();

  const impostors = game.players.filter(p => p.isImpostor);

  const selectedPlayers = game.players.filter(p =>
    game.votes.includes(p.id)
  );

  const hits = selectedPlayers.filter(p => p.isImpostor).length;

  const total = game.impostorCount;

  let title = "";
  let subtitle = "";
  let emoji = "";

  if (hits === 0) {
    title = "Passaram longe";
    subtitle = "Nenhum impostor foi identificado.";
    emoji = "😅";
  } else if (hits < total) {
    title = "Quase lá…";
    subtitle = `Vocês descobriram ${hits} de ${total}.`;
    emoji = "🤔";
  } else {
    title = "Impecável!";
    subtitle = "Todos os impostores foram descobertos.";
    emoji = "🎉";
  }

  return (
    <Screen
      header={
        <h2 className="text-2xl font-bold text-center">
          Resultado da rodada
        </h2>
      }
      footer={
        <>
          <button
            className="btnGhost w-full -mb-2"
            onClick={() =>
              setGame(g => ({ ...g, phase: "home" }))
            }
          >
            Voltar ao início
          </button>
          <button
            className="btnPrimary w-full"
            onClick={() =>
              setGame(g => resetRound(g))
            }
          >
            Nova rodada
          </button>
        </>
      }
    >
      <div className="space-y-8">

        <div
          className="w-full max-w-sm mx-auto
             rounded-3xl p-6
             bg-white/10 backdrop-blur-sm
             text-center"
        >
          {/* Emoji + título */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl">
              {emoji}
            </span>
            <h1 className="text-2xl font-extrabold tracking-wide">
              {title}
            </h1>
          </div>

          {/* Subtítulo */}
          <p className="text-slate-300 font-medium mb-5">
            {subtitle}
          </p>

          {/* Palavra revelada */}
          <div className="rounded-xl bg-black/30 py-3">
            <span className="block text-xs uppercase tracking-widest text-slate-400 mb-1">
              A palavra era
            </span>
            <span className="text-xl font-bold tracking-wider text-white">
              {game.secretWord}
            </span>
          </div>
        </div>


        {/* IMPOSTORES REAIS */}
        <div>
          <h3 className="text-lg font-bold text-center mb-4">
            Impostores
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {impostors.map(p => (
              <div
                key={p.id}
                className="rounded-2xl py-4 text-white text-center"
                style={{ backgroundColor: p.color }}
              >
                <img
                  src={p.avatar}
                  className="w-20 h-20 mx-auto rounded-full border-4 border-white mb-2"
                />
                <div className="font-bold">
                  {p.name}
                </div>
                <div className="text-sm opacity-80 font-bold">
                  Impostor
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SELECIONADOS NA VOTAÇÃO */}
        <div>
          <h3 className="text-lg font-bold text-center mb-4">
            Suspeitos escolhidos
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {selectedPlayers.map(p => {
              const correct = p.isImpostor;

              return (
                <div
                  key={p.id}
                  className={`
                    rounded-2xl py-4 text-center text-white
                    ${correct
                      ? "ring-4 ring-green-400"
                      : "ring-4 ring-red-400"}
                  `}
                  style={{ backgroundColor: p.color }}
                >
                  <img
                    src={p.avatar}
                    className="w-20 h-20 mx-auto rounded-full border-4 border-white mb-2"
                  />
                  <div className="font-bold">
                    {p.name}
                  </div>
                  <div className="text-sm opacity-80 font-bold">
                    {correct ? "Acerto" : "Inocente"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Screen>
  );
}
