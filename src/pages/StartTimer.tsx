import { useEffect } from "react";
import { useGame } from "../context/GameContext";
import { Screen } from "../components/Screen";

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

  function finishTimer() {
    playBeep();
    setGame(g => ({
      ...g,
      remainingTime: 0,
      phase: "voting"
    }));
  }

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
    <Screen
      footer={
      <>
        <div className="flex">
          {/* BOTÃO PULAR */}
          <button
            className="btnPrimary px-10 py-4 rounded-xl bg-white/10
                      text-white font-semibold
                      active:scale-95 transition"
            onClick={finishTimer}
          >
            Pular para votação
          </button>
        </div>

      </>
      }
    >
      <div
        className="h-full w-full rounded-xl flex items-center justify-center
                  text-white font-bold transition-colors duration-500"
        style={{
          backgroundColor: danger ? "#dc2626" : "transparent"
        }}
      >
        <span className="text-8xl tracking-widest">
          {formatTime(game.remainingTime)}
        </span>
      </div>
    </Screen>
  );
}
