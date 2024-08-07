import * as vscode from 'vscode';
import MemFS from './MemFS';
import show from "./show";
import add from './add';
import yoink from './yoink';

export function activate(context: vscode.ExtensionContext) {
  vscode.workspace.registerFileSystemProvider('harpoonfiles', new MemFS(context));

  const harpoonYoink = vscode.commands.registerCommand('harpoon.yoink', (id: number = 0) => yoink(context, id));
  const harpoonAdd = vscode.commands.registerCommand('harpoon.add', () => add(context));
  const harpoonShow = vscode.commands.registerCommand('harpoon.show', () => show(context));

  context.subscriptions.push(harpoonAdd);
  context.subscriptions.push(harpoonShow);
  context.subscriptions.push(harpoonYoink);
}

