import "./App.css";
import { useState, useEffect } from "react";
import webSocket from "socket.io-client";
import axios from "axios";
import { baseURL } from "./constants/constants";
import Line from "./components/Line";

function App() {
  const [ws, setWs] = useState(null);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const initWebSocket = () => {
      //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
      ws.on("log", (message) => {
        setLines((current) => [
          {
            type: "log",
            content: message.content,
            id: message._id,
            createdAt: message.createdAt,
          },
          ...current,
        ]);
      });
      ws.on("object", (message) => {
        setLines((current) => [
          {
            type: "obj",
            content: JSON.stringify(message.content),
            id: message._id,
            createdAt: message.createdAt,
          },
          ...current,
        ]);
      });
    };
    if (ws) {
      //連線成功在 console 中打印訊息
      console.log("success connect!");
      //設定監聽
      initWebSocket();
    }
  }, [ws]);

  useEffect(() => {
    async function fetchData() {
      // You can await here

      let resLog = await axios.get(baseURL + "/logs");

      resLog = resLog.data.map((d) => ({
        type: "log",
        content: d.content,
        id: d._id,
        createdAt: d.createdAt,
      }));

      let resObj = await axios.get(baseURL + "/objects");

      resObj = resObj.data.map((d) => ({
        type: "obj",
        content: JSON.stringify(d.content),
        id: d._id,
        createdAt: d.createdAt,
      }));
      let newLines = [...resLog, ...resObj].sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setLines(newLines);
      setWs(webSocket(baseURL));
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="App-header">
        {lines.map((line) => {
          return <Line line={line} />;
        })}
      </div>
    </div>
  );
}

export default App;
