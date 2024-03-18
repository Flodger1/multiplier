import { useEffect, useState } from 'react';
import styles from './Chat.module.css';

import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
export default function Messages({ messages }: { messages: string[] }) {
   const [decodedName, setDecodedName] = useState("");

    useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {

      const decoded = jwtDecode(token);
      const { id } = decoded
      
      axios
        .get(`http://localhost:3000/players/${id}`)
        .then((main) => main).then((res) => setDecodedName(res.data.name))
    }
  }, []);
  
  return (
    <div className={styles.messagesContainer}>
      <label>Bot1<div className={styles.message}>Hello</div></label>
      <label>Bot2<div className={styles.message}>I will win today!</div></label>
      <label>Bot3<div className={styles.message}>Good luck</div></label>
      {messages.map((message, index) => (
        <div>
        <label>{decodedName} <div className={styles.message} key={index}>{message}</div></label>
        </div>
      ))}
    </div>
  );
}
