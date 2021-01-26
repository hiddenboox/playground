import * as React from "react";
import MonacoEditor from "react-monaco-editor";

const Editor = (): JSX.Element => {
  return (
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      theme="vs-dark"
    />
  );
};

export default Editor;
