import { useState } from "react";
import { useGame } from "../context/GameContext";
import { Screen } from "../components/Screen";

export default function Home() {
  const { setGame } = useGame();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Screen    >
      <div className="h-full flex flex-col items-center justify-center text-center py-12 gap-6">
        <h1 className="text-3xl font-bold text-center">
          Jogo do Impostor
        </h1>
        <p className="text-slate-300 gap-6">
          Reúna os jogadores, descubra o impostor e
          tente enganá-lo antes que seja tarde!
        </p>
        <button
          className="btnPrimary w-full"
          onClick={() =>
            setGame(g => ({ ...g, phase: "setup_players" }))
          }
        >
          Iniciar jogo
        </button>
      </div>

    </Screen>
  );
}
