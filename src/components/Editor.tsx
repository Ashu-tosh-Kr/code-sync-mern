import React, { useEffect, useRef } from "react";
import Codemirror, { Editor as EditorType, EditorChange } from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import { ACTIONS } from "../Actions";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

const Editor = ({
  socketRef,
  roomId,
}: {
  socketRef: React.MutableRefObject<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>;
  roomId: string;
}) => {
  const editorRef = useRef<CodeMirror.Editor>();
  useEffect(() => {
    (async () => {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor") as HTMLTextAreaElement,
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseBrackets: true,
          autoCloseTags: true,
          lineNumbers: true,
        }
      );
      editorRef.current.on(
        "change",
        (editor: EditorType, change: EditorChange) => {
          console.log(editor.getValue());
          const { origin } = change;
          const code = editor.getValue();
          if (origin !== "setValue") {
            socketRef.current?.emit(ACTIONS.CODE_CHANGE, { roomId, code });
          }
        }
      );
    })();
  }, []);
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGE, ({ code }) => {
        if (code !== null) {
          editorRef.current?.setValue(code);
        }
      });
    }
    return () => {
      if (socketRef.current) socketRef.current.off(ACTIONS.CODE_CHANGE);
    };
  }, [socketRef.current]);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
