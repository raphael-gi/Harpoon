import * as vscode from "vscode";

export default async (context: vscode.ExtensionContext) => {
  const uri = vscode.Uri.parse('harpoonfiles:/harpoon');
  const state = context.workspaceState;

  const rows: string = state.keys().map((key) => state.get(key)).join("\n");
  const content = Buffer.from(rows, 'utf8');

  await vscode.workspace.fs.writeFile(uri, content);

  const doc = await vscode.workspace.openTextDocument(uri);

  const fileIsOpen = !!vscode.window.activeTextEditor;
  const position = fileIsOpen ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active;
  await vscode.window.showTextDocument(doc, position);
}

