import axios from "axios";
import { useEffect, useState } from "react";

import styles from "./Ranking.module.css";

import io from "socket.io-client";
const socket = io("http://localhost:8001");

import ranking from "../../assets/Ranking.svg";

type Player = {
  id: number;
  name: string;
  points: number;
  score: number;
};

export default function Ranking() {
  const [rankingPlayers, setRankingPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/players");
        setRankingPlayers(response.data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    };

    fetchPlayers();

    const handleUpdateRanking = (updatedPlayers) => {
      console.log("Updated players received:", updatedPlayers);
      setRankingPlayers(updatedPlayers);
    };

    socket.on("update_ranking", handleUpdateRanking);

    return () => {
      socket.off("update_ranking", handleUpdateRanking);
    };
  }, []);

  return (
    <div className={styles.rankingContainer}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={ranking} alt="Ranking" />
        <div style={{ marginLeft: "7px" }}>RANKING</div>{" "}
      </div>
      {rankingPlayers &&
        rankingPlayers
          .sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <div className={styles.player} key={player.id}>
              <div className={styles.playerIndex}>{index + 1}</div>
              <div className={styles.playerName}>{player.name}</div>
              <div className={styles.playerScore}>{player.score}</div>
            </div>
          ))}
    </div>
  );
}
