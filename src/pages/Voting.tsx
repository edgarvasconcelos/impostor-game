import { Screen } from "../components/Screen";
import { useGame } from "../context/GameContext";

export default function Voting() {
  const { game, setGame } = useGame();

  function toggle(id: string) {
    setGame(g => {
      let votes = g.votes;

      if (votes.includes(id)) {
        // remove seleção apenas se o próprio card for clicado
        votes = votes.filter(v => v !== id);
      } else {
        // impede selecionar além do limite
        if (votes.length >= g.impostorCount) return g;
        votes = [...votes, id];
      }

      return { ...g, votes };
    });
  }

  const isValid = game.votes.length === game.impostorCount;

  return (
    <Screen
      header={
        <h2 className="text-xl font-bold text-center">
          Escolha {game.impostorCount} suspeito(s)
        </h2>
      }
      footer={
        <button
          className={`
            w-full rounded-xl py-3 font-bold transition
            ${isValid
              ? "btnPrimary"
              : "btnDefault bg-gray-700 text-gray-500 cursor-not-allowed"}
          `}
          disabled={!isValid}
          onClick={() =>
            setGame(g => ({ ...g, phase: "result" }))
          }
        >
          Confirmar votação
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-4">
        {game.players.map(p => {
          const selected = game.votes.includes(p.id);

          // desabilita apenas os NÃO selecionados quando o limite for atingido
          const disabled =
            !selected && game.votes.length >= game.impostorCount;

          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              disabled={disabled}
              className={`
                rounded-2xl m-1 p-4 text-white transition-all duration-200
                ${selected
                  ? "scale-105 ring-4 ring-white shadow-xl"
                  : "opacity-40 cursor-not-allowed hover:scale-100"}
                ${disabled
                  ? "opacity-40 cursor-not-allowed hover:scale-100"
                  : ""}
              `}
              style={{ backgroundColor: p.color }}
            >
              <img
                src={p.avatar}
                className={`
                  w-20 h-20 mx-auto rounded-full mb-2 transition
                  ${selected
                    ? "border-4 border-white"
                    : "border-2 border-white/50"}
                `}
              />
              <span className="font-bold block text-center">
                {p.name}
              </span>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
