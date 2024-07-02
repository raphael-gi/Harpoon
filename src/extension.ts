import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
  console.log("heeeelo");

  const disposable = vscode.commands.registerCommand('extension.harpoon', () => {
    vscode.window.showInformationMessage(`Your version is ${vscode.version}`);
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      vscode.window.showInformationMessage(`File: ${editor.document.fileName}`);
    } else {
      vscode.window.showInformationMessage("No file open");
    }
  })

  context.subscriptions.push(disposable);
}
