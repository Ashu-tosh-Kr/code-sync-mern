import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ACTIONS } from "../Actions";
import Client from "../components/Client";
import Editor from "../components/Editor";
import { initSocket } from "../lib/socket";
interface stateType {
  username: string;
}
const EditorPage = () => {
  /**hooks */
  const socketRef = useRef<Awaited<ReturnType<typeof initSocket>> | null>(null);
  const codeRef = useRef<string | null>(null);
  const location = useLocation();
  const { roomId } = useParams();
  const routerNavigate = useNavigate();
  //states
  const [clients, setClients] = useState([{ socketId: "", username: "" }]);

  //handlers
  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId ?? "");
      toast.success("Room ID has been copied to your clipboard");
    } catch (err) {
      toast.error("Could not copy the Room ID");
      console.error(err);
    }
  };

  const leaveRoom = () => {
    routerNavigate("/");
  };

  //useEffect
  useEffect(() => {
    function handleErrors(e: unknown) {
      console.log("socket error", e);
      toast.error("Socket connection failed, try again later.");
      routerNavigate("/");
    }
    (async () => {
      //init
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      //emitting
      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: (location.state as stateType)?.username,
      });

      //listeing
      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          toast.success(`${username} joined the room`);
          setClients(clients);
          socketRef.current?.emit(ACTIONS.SYNC_CODE, {
            socketId,
            code: codeRef.current,
          });
        }
      );
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ username, socketId }) => {
        toast.success(`${username} left the room`);
        setClients((clients) =>
          clients.filter((client) => client.socketId !== socketId)
        );
      });
    })();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  //jsx
  if (!location.state) {
    return <Navigate to="/" />;
  }
  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logo">
            <img className="logoImage" src="/code-sync.png" alt="logo" />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomId}>
          Copy ROOM ID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId as string}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
