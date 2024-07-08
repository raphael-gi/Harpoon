import * as vscode from "vscode";

export default (context: vscode.ExtensionContext) => {
  const state = context.workspaceState;

  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showInformationMessage("No file open");
    return;
  }

  const filepath = editor.document.fileName;

  const alreadyAdded = !!state.keys().find((key: string) => state.get(key)! === filepath);
  if (alreadyAdded) {
    vscode.window.showInformationMessage("File already added");
    return;
  }

  const index = state.keys().length;
  state.update(`${index}`, filepath);
}

