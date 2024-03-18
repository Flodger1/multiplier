import { useCallback, useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";

import { UserContext } from "../../App";

import Coin from "../../assets/Coin.png";
import Crowwn from "../../assets/Crowwn.svg";
import Clock from "../../assets/Clock.svg";

import styles from "./Header.module.css";

import axios from "axios";

import io from "socket.io-client";
const socket = io("http://localhost:8001");

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function Header() {
  const { setUserName } = useContext(UserContext);
  const [decodedName, setDecodedName] = useState("");
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const { id } = decoded;
      const player = axios
        .get(`http://localhost:3000/players/${id}`)
        .then((main) => main)
        .then((res) => setPoints(res.data.points));
    }
  }, [decodedName]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(formatTime(new Date()));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  const handleStorageChange = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name);
        setDecodedName(decoded.name);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [setUserName, setDecodedName]);

  useEffect(() => {
    window.addEventListener("storageChange", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
    };
  }, [handleStorageChange]);

  useEffect(() => {
    const updateBalance = (data) => {
      if (data && typeof data.points === "number") {
        setPoints(data.points);
      }
    };

    socket.on("balance_updated", updateBalance);

    return () => {
      socket.off("balance_updated", updateBalance);
    };
  }, []);

  return (
    <div className={styles.header_container}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={Coin} alt="Coin" />
        <div style={{ marginLeft: "4px" }}>{points}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={Crowwn} alt="Crown" />
        <div style={{ marginLeft: "7px" }}>{decodedName}</div>{" "}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={Clock} alt="Clock" />
        <div style={{ marginLeft: "7px" }}>{currentTime}</div>{" "}
      </div>
    </div>
  );
}
