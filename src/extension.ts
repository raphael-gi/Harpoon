import * as vscode from 'vscode';
import show from "./show";
import add from './add';
import { MemFS } from './MemFS';

export function activate(context: vscode.ExtensionContext) {
  const memfs = new MemFS();

  vscode.workspace.registerFileSystemProvider('harpoonfiles', memfs);

  const harpoonAdd = vscode.commands.registerCommand('harpoon.add', () => add(context));
  const harpoonShow = vscode.commands.registerCommand('harpoon.show', () => show(context));

  context.subscriptions.push(harpoonAdd);
  context.subscriptions.push(harpoonShow);
}

