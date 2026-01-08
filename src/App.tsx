import { useGame } from "./context/GameContext";

import Home from "./pages/Home";
import SetupPlayers from "./pages/SetupPlayers";
import SetupGame from "./pages/SetupGame";
import SelectCategory from "./pages/SelectCategory";
import PassPhone from "./pages/PassPhone";
import Reveal from "./pages/Reveal";
import PreTimer from "./pages/PreTimer";
import Voting from "./pages/Voting";
import Result from "./pages/Result";
import StartTimer from "./pages/StartTimer";

export default function App() {
  const { game } = useGame();

  switch (game.phase) {
    case "home":
      return <Home />;

    case "setup_players":
      return <SetupPlayers />;

    case "setup_game":
      return <SetupGame />;

    case "select_category":
      return <SelectCategory />;

    case "pass_phone":
      return <PassPhone />;

    case "reveal":
      return <Reveal />;

    case "pre_timer":
      return <PreTimer />;

    case "start_timer":
      return <StartTimer />;

    case "voting":
      return <Voting />;

    case "result":
      return <Result />;

    default:
      return <Home />;
  }
}
