import "./App.css";
import LeftUpSide from "./components/LeftUpSide/PlayingSide";
import Ranking from "./components/Ranking/Ranking";
import GameView from "./components/GameView/GameView";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header.tsx/Header";
import { createContext } from "react";



type UserContextType = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
});

function App() {
  return (
    <div className="app-container">
      <div className="header">
        <Header />
      </div>
      <div className="main-content">
        <div className="left-column">
          <LeftUpSide />
          <Ranking />
        </div>
        <div className="game-view-container">
          <GameView />
        </div>
        <div className="right-column">
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
