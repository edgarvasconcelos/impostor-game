import { useEffect } from "react";
import { useGame } from "../context/GameContext";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function playBeep() {
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.value = 880;

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + 0.8
  );

  osc.stop(ctx.currentTime + 0.8);
}

export default function StartTimer() {
  const { game, setGame } = useGame();

  const danger = game.remainingTime <= 10;

  useEffect(() => {
    if (game.remainingTime <= 0) return;

    const interval = setInterval(() => {
      setGame(g => {
        if (g.remainingTime <= 1) {
          clearInterval(interval);
          playBeep();
          return {
            ...g,
            remainingTime: 0,
            phase: "voting"
          };
        }
        return {
          ...g,
          remainingTime: g.remainingTime - 1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [game.remainingTime, setGame]);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center
                 text-white font-bold transition-colors duration-500"
      style={{
        backgroundColor: danger ? "#dc2626" : "#020617"
      }}
    >
      <span className="text-8xl tracking-widest">
        {formatTime(game.remainingTime)}
      </span>
    </div>
  );
}
