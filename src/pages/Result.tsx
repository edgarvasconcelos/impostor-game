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
            className="btnPrimary w-full"
            onClick={() =>
              setGame(g => resetRound(g))
            }
          >
            Nova rodada
          </button>

          <button
            className="btnGhost w-full mt-3"
            onClick={() =>
              setGame(g => ({ ...g, phase: "home" }))
            }
          >
            Voltar ao início
          </button>
        </>
      }
    >
      <div className="space-y-8">

        {/* EMOÇÃO */}
        <div className="text-center">
          <div className="text-6xl mb-3">
            {emoji}
          </div>

          <h1 className="text-3xl font-bold mb-2">
            {title}
          </h1>

          <p className="text-slate-300 mb-8 font-bold">
            {subtitle}
          </p>
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
