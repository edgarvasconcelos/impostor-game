import { useEffect, useState, useRef } from "react";
import { Screen } from "../components/Screen";
import { useGame } from "../context/GameContext";
import { PLAYER_COLORS } from "../utils/colors";
import { PlayerCard } from "../components/PlayerCard";
import { SetupPlayer } from "../components/SetupPlayer" 
import type { Gender } from "../types/player";

function randomColor() {
  return PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
}

function randomAvatar(gender: Gender) {
  const seed = Math.random().toString(36).slice(2, 10);
  const style = gender === "male" ? "adventurer" : "avataaars";
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
}

export default function SetupPlayers() {
  const { game, setGame } = useGame();

  // 🔒 estado local SOMENTE como buffer
  const [players, setPlayers] = useState<SetupPlayer[]>([]);

  const endRef = useRef<HTMLDivElement>(null);

  const [editMode, setEditMode] = useState(false);

  // 🔥 sincroniza SEMPRE com o estado global
  useEffect(() => {
    if (game.players && game.players.length > 0) {
      setPlayers(
        game.players.map(p => ({
          name: p.name,
          gender: p.gender,
          avatar: p.avatar,
          color: p.color
        }))
      );
    } else {
      // primeira vez
      setPlayers([
        {
          name: "",
          gender: "male",
          avatar: randomAvatar("male"),
          color: randomColor()
        }
      ]);
    }
  }, [game.players]);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end"
    });
  }, [players.length]);

  function addPlayer() {
    setPlayers(p => [
      ...p,
      {
        name: "",
        gender: "female",
        avatar: randomAvatar("female"),
        color: randomColor()
      }
    ]);

    setEditMode(false);
  }

  function updatePlayer<K extends keyof SetupPlayer>(
    index: number,
    field: K,
    value: SetupPlayer[K]
  ) {
    setPlayers(players => {
      const copy = [...players];

      const updated: SetupPlayer = {
        ...copy[index],
        [field]: value,
      };

      // 👇 narrowing explícito
      if (field === "gender") {
        updated.avatar = randomAvatar(value as SetupPlayer["gender"]);
      }

      copy[index] = updated;
      return copy;
    });
  }


  function next() {
    setGame(g => ({
      ...g,
      players: players.map((p, i) => ({
        id: String(i),
        name: p.name || `Jogador ${i + 1}`,
        gender: p.gender,
        avatar: p.avatar,
        color: p.color,
        isImpostor: false
      })),
      phase: "setup_game"
    }));
  }

  return (
    <Screen
      onBack={() =>
        setGame(g => ({ ...g, phase: "home" }))
      }
      header={
        <h2 className="text-2xl font-bold text-center">
          Jogadores
        </h2>
      }
      footer={
        <>
          {/* Linha de ações secundárias */}
          <div className="flex gap-3 mt-3 -mb-3">
            <button
              className={`btn py-3 flex-1 rounded-xl font-semibold text-white
                ${
                  editMode
                    ? "bg-red-600"
                    : "bg-red-500"
                }`}
              onClick={() => setEditMode(e => !e)}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl leading-none">−</span>
                {editMode ? "Concluir remoção" : "Remover"}
              </span>
            </button>

            <button
              className="btn flex-1 py-3 rounded-xl font-semibold text-white
                        bg-green-500"
              onClick={addPlayer}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-2xl leading-none">+</span>
                <span>Adicionar</span>
              </span>
            </button>
          </div>

          {/* CTA principal */}
          <button
            className={`btnPrimary  ${
              players.length < 3
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={players.length < 3}
            onClick={next}
          >
            Continuar
          </button>

        </>


      }
    >
    <div className="space-y-4">
      {players.length < 3 && (
        <p className="text-sm text-slate-400 mt-2 text-center">
          Adicione pelo menos 3 jogadores para continuar
        </p>
      )}
      {players.map((p, i) => (
        <PlayerCard
          key={i}
          index={i}
          player={p}
          editMode={editMode}
          onChange={updatePlayer}
          onDelete={i =>
            setPlayers(players =>
              players.filter((_, idx) => idx !== i)
            )
          }
        />
      ))}

      {/* marcador para scroll automático */}
      <div ref={endRef} />
    </div>

    </Screen>
  );
}
