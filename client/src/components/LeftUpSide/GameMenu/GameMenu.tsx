import axios from "axios";
import { useEffect, useState } from "react";

import io from "socket.io-client";
const socket = io("http://localhost:8001");
import { jwtDecode } from "jwt-decode";

import styles from "./GameMenu.module.css";
import upArrow from "../../../assets/upArrow.svg";
import downArrow from "../../../assets/downArrow.svg";
import trophy from "../../../assets/Trophy.svg";

export default function GameMenu() {
  const [gamePoints, setGamePoints] = useState(100);
  const [multiplier, setMultiplier] = useState(2.0);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [decoded, setDecoded] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const [currentRoundResults, setCurrentRoundResults] = useState([]);

  const upPointsHandler = () => {
    setGamePoints((points) => points + 25);
  };

  const downPointsHandler = () => {
    setGamePoints((points) => (points > 25 ? points - 25 : 0));
  };

  const upMultiplierHandler = () => {
    setMultiplier((prevMultiplier) => parseFloat(prevMultiplier) + 0.25);
  };

  const downMultiplierPointsHandler = () => {
    setMultiplier((prevMultiplier) => {
      const newMultiplier = parseFloat(prevMultiplier) - 0.25;
      return newMultiplier > 0.25 ? newMultiplier : 0;
    });
  };

  const changeMultiplierHandler = (e) => {
    const newValue = e.replace(",", ".");

    // Разрешаем только числа и точку
    if (newValue === "" || /^(\d+\.?\d*|\.\d+)$/.test(newValue)) {
      setMultiplier(newValue);
    }
  };

  const changePointsHandler = (e) => {
    const newValue = e;
    const numericValue = newValue === "" ? 0 : parseInt(newValue, 10);
    if (!isNaN(numericValue)) {
      setGamePoints(numericValue);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setDecoded(decodedToken);
      const { id } = decodedToken;
      axios
        .get(`http://localhost:3000/players/${id}`)
        .then((response) => {
          setPlayerPoints(response.data.points);
        })
        .catch((error) => {
          console.error("Error fetching player data:", error);
        });
    }
  }, []);

  const startGameHandler = (id) => {
    setGameStarted(true);
    const betAmount = gamePoints;
    const betMultiplier = multiplier;
    const playerId = id;
    axios
      .post(`http://localhost:3000/game/bet`, {
        playerId,
        betAmount,
        betMultiplier,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error updating points:", error);
      });

    socket.emit("start_game");
  };

  useEffect(() => {
    socket.on("game_ended", (data) => {
      fetchNewPlayerBalance();
      setGameStarted(false);
    });
    console.log("game_ended listener added");

    return () => {
      socket.off("game_ended");
    };
  }, []);

  const fetchNewPlayerBalance = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const { id } = decodedToken;
        console.log("ID", id);
        const response = await axios.get(`http://localhost:3000/players/${id}`);
        const newBalance = response.data.points;
        setPlayerPoints(newBalance);
      }
    } catch (error) {
      console.error("Error fetching new player balance:", error);
    }
  };

  useEffect(() => {
    socket.on("current_round_results", (results) => {
      setCurrentRoundResults(results);
    });

    return () => {
      socket.off("current_round_results");
    };
  }, []);

  return (
    <div className={styles.gameMenu}>
      <div>
        <button className={styles.button} onClick={downPointsHandler}>
          <img src={downArrow} alt="Up Arrow" />
        </button>
        <input
          className={styles.input}
          type="text"
          value={gamePoints}
          onChange={(event) => {
            changePointsHandler(event.target.value);
          }}
        ></input>
        <button className={styles.button} onClick={upPointsHandler}>
          <img src={upArrow} alt="Up Arrow" />
        </button>
      </div>
      <div>
        <button className={styles.button} onClick={downMultiplierPointsHandler}>
          <img src={downArrow} alt="Up Arrow" />
        </button>
        <input
          className={styles.input}
          type="text"
          value={multiplier}
          onChange={(event) => {
            changeMultiplierHandler(event.target.value);
          }}
        />
        <button className={styles.button} onClick={upMultiplierHandler}>
          <img src={upArrow} alt="Up Arrow" />
        </button>
      </div>
      <div>
        <button
          className={`${styles.button} ${
            gameStarted ? styles.buttonDisabled : ""
          }`}
          onClick={() => startGameHandler(decoded.id)}
          disabled={gameStarted}
        >
          {gameStarted ? "Started" : "Start"}
        </button>
      </div>
      <div className="current-round">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={trophy} alt="trophy" />
          <h2 style={{ marginLeft: "7px" }}>Current Round</h2>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Point</th>
              <th>Multiplier</th>
            </tr>
          </thead>
          <tbody className={styles.currentRound}>
            {currentRoundResults
              .sort((a, b) => b.winAmount - a.winAmount)
              .map((result, index) => (
                <tr key={index}>
                  <td>{result.name}</td>
                  <td>{result.winAmount}</td>
                  <td>{result.betMultiplier}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
