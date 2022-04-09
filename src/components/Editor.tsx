import React, { useEffect } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";

const Editor = () => {
  useEffect(() => {
    (async () => {
      Codemirror.fromTextArea(
        document.getElementById("realtimeEditor") as HTMLTextAreaElement,
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseBrackets: true,
          autoCloseTags: true,
          lineNumbers: true,
        }
      );
    })();
  }, []);

  return <textarea id="realtimeEditor"></textarea>;
};

export default Editor;
