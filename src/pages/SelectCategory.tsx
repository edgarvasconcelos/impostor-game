import { Screen } from "../components/Screen";
import { useGame } from "../context/GameContext";
import { WORDS } from "../utils/words";
import { getGeneralWords } from "../utils/getGeneralWords";

const GENERAL = {
  key: "Geral",
  label: "Geral",
  color: "#f02b2bff"
};

export default function SelectCategory() {
  const { setGame } = useGame();

  function selectGeneral() {
    const words = getGeneralWords();
    const item =
      words[Math.floor(Math.random() * words.length)];

    setGame(g => ({
      ...g,
      secretWord: item.word,
      hint: item.hint,
      category: "Geral",
      categoryColor: GENERAL.color,
      phase: "pass_phone"
    }));
  }

  function selectCategory(key: string) {
    const category = WORDS[key];
    const item =
      category.words[
      Math.floor(Math.random() * category.words.length)
      ];

    setGame(g => ({
      ...g,
      secretWord: item.word,
      hint: item.hint,
      category: category.label,
      categoryColor: category.color,
      phase: "pass_phone"
    }));
  }

  return (
    <Screen
      header={
        <h2 className="text-2xl font-bold text-center">
          Escolha a categoria
        </h2>
      }
      footer={
        <>
          <button
            className="btnGhost mt-3"
            onClick={() =>
              setGame(g => ({ ...g, phase: "setup_game" }))
            }
          >
            Voltar
          </button>
        </>
      }
    >
      <div className="grid grid-cols-2 gap-4">

        {/* 🔥 GERAL */}
        <button
          onClick={selectGeneral}
          className="rounded-2xl py-6 text-white font-bold text-lg w-100"
          style={{ backgroundColor: GENERAL.color }}
        >
          Geral
        </button>

        {/* DEMAIS CATEGORIAS */}
        {Object.entries(WORDS).map(([key, cat]) => (
          <button
            key={key}
            onClick={() => selectCategory(key)}
            className="rounded-2xl py-6 text-white font-bold text-lg"
            style={{ backgroundColor: cat.color }}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </Screen>
  );
}
