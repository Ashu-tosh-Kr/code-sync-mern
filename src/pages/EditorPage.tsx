import React, { useState } from "react";
import Client from "../components/Client";
import Editor from "../components/Editor";

const EditorPage = () => {
  /**hooks */
  //states
  const [clients, setClients] = useState([{ socketId: 1, username: "test" }]);

  //handlers
  const copyRoomId = () => {
    const el = document.createElement("textarea");
    el.value = "test";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const leaveRoom = () => {
    const el = document.createElement("textarea");
    el.value = "test";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  //jsx
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
        // socketRef={socketRef}
        // roomId={roomId}
        // onCodeChange={(code) => {
        //     codeRef.current = code;
        // }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
