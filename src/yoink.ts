import * as vscode from "vscode";

export default async (context: vscode.ExtensionContext, id: number) => {
  const path: string | undefined = context.workspaceState.get(id.toString());
  if (path === undefined) {
    return;
  }
  const uri = vscode.Uri.file(path);

  const file = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(file);
}

