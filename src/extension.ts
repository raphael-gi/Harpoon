import * as vscode from 'vscode';
import MemFS from './MemFS';
import show from "./show";
import add from './add';
import yoink from './yoink';

export function activate(context: vscode.ExtensionContext) {
  const memfs = new MemFS(context);

  vscode.workspace.registerFileSystemProvider('harpoonfiles', memfs);

  const harpoonYoink = vscode.commands.registerCommand('harpoon.yoink', (id: number) => yoink(context, id))
  const harpoonAdd = vscode.commands.registerCommand('harpoon.add', () => add(context));
  const harpoonShow = vscode.commands.registerCommand('harpoon.show', () => show(context));

  context.subscriptions.push(harpoonAdd);
  context.subscriptions.push(harpoonShow);
  context.subscriptions.push(harpoonYoink);
}

