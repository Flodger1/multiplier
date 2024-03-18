import { useEffect, useState } from "react";
import io from "socket.io-client";
import styles from "./GameView.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale,
} from "chart.js";

import "chartjs-adapter-moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  TimeScale
);

const socket = io("http://localhost:8001");

export default function GameView() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Multiplier",
        data: [],
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 3,
        pointRadius: [],
        pointBackgroundColor: "yellow",
        pointBorderColor: "orange",
        pointBorderWidth: 2,
        pointHoverRadius: 7,
        tension: 0.4,
      },
    ],
  });
  const [currentMultiplier, setCurrentMultiplier] = useState("0.00");

  useEffect(() => {
    socket.on("game_started", () => {
      setChartData({
        ...chartData,
        labels: [],
        datasets: [{ ...chartData.datasets[0], data: [] }],
      });
    });

    socket.on("multiplier_update", (data) => {
      setCurrentMultiplier(data.multiplier); // Обновляем текущее значение множителя
      setChartData((prevChartData) => {
        const newLabels = [...prevChartData.labels, new Date()];
        const newData = [...prevChartData.datasets[0].data, data.multiplier];
        return {
          ...prevChartData,
          labels: newLabels,
          datasets: [{ ...prevChartData.datasets[0], data: newData }],
        };
      });
    });

    socket.on("game_ended", (data) => {
      console.log("Game ended with multiplier:", data.multiplier);
    });

    return () => {
      socket.off("game_started");
      socket.off("multiplier_update");
      socket.off("game_ended");
    };
  }, []);

  return (
    <div className={styles.right_column}>
      <div
        style={{
          top: "-300%",
          left: "50%",
          color: "orange",
          fontSize: "4em",
          zIndex: 10,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {currentMultiplier}x
      </div>
    </div>
  );
}
