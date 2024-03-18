import { useContext, useEffect } from "react";
import GameMenu from "./GameMenu/GameMenu";
import Welcome from "./Welcome/Welcome";
import styles from './PlayingSide.module.css'

import { Context } from "../../context/Context";

import { jwtDecode } from "jwt-decode";

export default function PlayingSide() {
  const { userName, setUserName } = useContext(Context);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
    }
  },[userName])

  return <div className={styles.container}>{userName.length ? <GameMenu /> : <Welcome />}</div>;
}
