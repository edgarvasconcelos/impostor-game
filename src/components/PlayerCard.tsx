import { withOpacity } from "../utils/colorHelpers";
import type { Player } from "../types/player";

type PlayerCardProps = {
  index: number;
  player: Pick<Player, "name" | "gender" | "avatar" | "color">;
  editMode: boolean;
  onChange: <K extends keyof Pick<
    Player,
    "name" | "gender" | "avatar" | "color"
  >>(
    index: number,
    field: K,
    value: Player[K]
  ) => void;
  onDelete: (index: number) => void;
};
export function PlayerCard({
    index,
    player,
    editMode,
    onChange,
    onDelete
}: PlayerCardProps) {
    const { name, gender, avatar, color } = player;

    return (
        <div
            className="flex items-center gap-4 p-3 rounded-2xl transition"
            style={{ backgroundColor: withOpacity(color, 0.75) }}
        >
            {/* Avatar */}
            <img
                src={avatar}
                className="w-14 h-14 rounded-full border-4"
                style={{ borderColor: color }}
            />

            {/* Nome */}
            <input
                className="flex-1 bg-transparent border-b border-white/40
                   outline-none text-white placeholder-white/70"
                placeholder={`Jogador ${index + 1}`}
                value={name}
                onChange={e =>
                    onChange(index, "name", e.target.value)
                }
            />

            {/* Ações */}
            <div className="flex gap-2">
                {!editMode ? (
                    <>
                        <button
                            className={`btn p-2 rounded-full ${gender === "male"
                                    ? "bg-indigo-500"
                                    : "bg-slate-800"
                                }`}
                            onClick={() =>
                                onChange(index, "gender", "male")
                            }
                        >
                            ♂️
                        </button>

                        <button
                            className={`btn p-2 rounded-full ${gender === "female"
                                    ? "bg-pink-500"
                                    : "bg-slate-800"
                                }`}
                            onClick={() =>
                                onChange(index, "gender", "female")
                            }
                        >
                            ♀️
                        </button>
                    </>
                ) : (
                    <button
                        className="btn text-red-500 text-xl"
                        onClick={() => onDelete(index)}
                    >
                        🗑️
                    </button>
                )}
            </div>
        </div>
    );
}
