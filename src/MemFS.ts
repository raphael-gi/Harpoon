import * as vscode from "vscode";

export default class MemFS implements vscode.FileSystemProvider {
  private context: vscode.ExtensionContext;
  private harpoonFile: Uint8Array;
  private emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>()

  public onDidChangeFile: vscode.Event<vscode.FileChangeEvent[]> = this.emitter.event;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.harpoonFile = new Uint8Array();
    this.onDidChangeFile = this.emitter.event;
  }

	stat(_: vscode.Uri): vscode.FileStat {
    return { type: vscode.FileType.File, ctime: 0, mtime: 0, size: 0 };
  }

	readDirectory(_: vscode.Uri): [string, vscode.FileType][] {
    return [];
  }

	readFile(_: vscode.Uri): Uint8Array {
    return this.harpoonFile;
  }

  writeFile(uri: vscode.Uri, content: Uint8Array, options: { create: boolean, overwrite: boolean, atomic: boolean, unlock: boolean }): void {
    this.harpoonFile = content;
    this.emitter.fire([{ type: vscode.FileChangeType.Changed, uri }]);
    const state = this.context.workspaceState;
    const rows = content.toString().split("\n");

    for (let i = 0; i < rows.length; i++) {
      state.update(`${i}`, rows[i]);
    }

    const amountOfKeys = state.keys().length;
    for (let i = rows.length; i < amountOfKeys; i++) {
      state.update(`${i}`, undefined);
    }

    if (options.atomic === false && options.unlock === false) {
      vscode.commands.executeCommand('workbench.action.revertAndCloseActiveEditor');
    }
  }

	rename(_: vscode.Uri, __: vscode.Uri, ___: { overwrite: boolean }): void { }

	delete(_: vscode.Uri): void { }

	createDirectory(_: vscode.Uri): void { }

  watch(_: vscode.Uri, __: { readonly recursive: boolean; readonly excludes: readonly string[]; }): vscode.Disposable {
    return new vscode.Disposable(() => {});
  }
}
