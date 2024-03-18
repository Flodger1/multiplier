import { useContext, useState } from "react";

import { Context } from "../../../context/Context";

import styles from "./Welocme.module.css";

export default function Welcome() {
  const [inputName, setInputName] = useState("");
  const { handleSubmit, setUserName } = useContext(Context);

  const handleInputChange = (e) => {
    setInputName(e.target.value);
  };

  const handleAccept = async () => {
    await handleSubmit(inputName);
    setUserName(inputName);
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Welcome</h3>
      <div className={styles.inputLabel}>Please insert your name</div>
      <input
        className={styles.inputField}
        value={inputName}
        onChange={handleInputChange}
        placeholder="Your Name"
      />
      <button className={styles.button} onClick={handleAccept}>
        Accept
      </button>
    </div>
  );
}
