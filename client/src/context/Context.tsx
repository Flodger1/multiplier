import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export const Context = createContext({});

type UserContextType = {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<UserContextType>({
  userName: "",
  setUserName: () => {},
});

export const AppContext = ({ children }) => {
  const [userName, setUserName] = useState("");

  const handleSubmit = async (name) => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storageChange"));

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      console.log("Login seccessful:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const contextValue = {
    userName,
    setUserName,
    handleSubmit,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
