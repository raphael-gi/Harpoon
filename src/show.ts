import * as vscode from "vscode";

export default async (context: vscode.ExtensionContext) => {
  const uri = vscode.Uri.parse('harpoonfiles:/harpoons');
  await vscode.workspace.fs.writeFile(uri, Buffer.from('Hello, world!', 'utf8'));

  const doc = await vscode.workspace.openTextDocument(uri);
  await vscode.window.showTextDocument(doc);
}

