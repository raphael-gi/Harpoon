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

	stat(uri: vscode.Uri): vscode.FileStat {
    return {
      type: vscode.FileType.File,
      ctime: Date.now(),
      mtime: Date.now(),
      size: this.harpoonFile.length
    }
  }

	readDirectory(uri: vscode.Uri): [string, vscode.FileType][] {
    return [];
  }

	readFile(uri: vscode.Uri): Uint8Array {
    return this.harpoonFile;
  }

	writeFile(uri: vscode.Uri, content: Uint8Array, options: { create: boolean, overwrite: boolean }): void {
    this.harpoonFile = content;
    this.emitter.fire([{ type: vscode.FileChangeType.Changed, uri }]);
    const state = this.context.workspaceState;
    const rows = content.toString().split("\n");

    state.keys().forEach((key) => state.update(key, undefined));

    for (let i = 0; i < rows.length; i++) {
      state.update(`${i}`, rows[i]);
    }

    /*
    for (let i = rows.length; i < state.keys().length; i++) {
      state.update(`${i}`, undefined);
    }
    */

    if (!options.create) {
      vscode.commands.executeCommand('workbench.action.revertAndCloseActiveEditor');
    }
  }

	rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean }): void { }

	delete(uri: vscode.Uri): void { }

	createDirectory(uri: vscode.Uri): void { }

  watch(uri: vscode.Uri, options: { readonly recursive: boolean; readonly excludes: readonly string[]; }): vscode.Disposable {
    // Not implemented yet
    return new vscode.Disposable(() => {});
  }

}
