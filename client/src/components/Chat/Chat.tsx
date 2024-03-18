import { useContext, useEffect, useState } from "react";
import styles from './Chat.module.css';

import chat from "../../assets/Chat.svg"

import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { Context } from "../../context/Context";

import io, { Socket } from "socket.io-client";
import { jwtDecode } from "jwt-decode";

export default function Chat() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<string[]>([]);

  const { userName, setUserName } = useContext(Context);

    useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      const decoded = jwtDecode(token);
      setUserName(decoded.name);
    }
  },[userName])

  const send = (value: string) => {
    socket?.emit("message", value);
  };
  useEffect(() => {
    const newSocket = io("http://localhost:8001");
    setSocket(newSocket);
  }, [setSocket]);
  

  const messageListener = (message: string) => {
    setMessages([...messages, message]);
  };
  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);
  return (
    <div>
    <div className={styles.chatContainer}>
            <div style={{ display: "flex", alignItems: "center" }}>
        <img src={chat} alt="chat" />
        <div style={{ marginLeft: "7px", fontSize: "20px" }}>Chat</div>{" "}
      </div>
      <Messages messages={messages} />
      {userName && <MessageInput send={send} />}
    </div>
        </div>
  );
}
