import * as vscode from "vscode";

export class MemFS implements vscode.FileSystemProvider {
  private harpoonFile: Uint8Array;

  private emitter = new vscode.EventEmitter<vscode.FileChangeEvent[]>()

  public onDidChangeFile: vscode.Event<vscode.FileChangeEvent[]> = this.emitter.event;

  constructor() {
    this.harpoonFile = new Uint8Array();
    this.onDidChangeFile = this.emitter.event;
  }

	// --- manage file metadata

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

	// --- manage file contents

	readFile(uri: vscode.Uri): Uint8Array {
    vscode.window.showInformationMessage(uri.toString());
    return this.harpoonFile;
  }

	writeFile(uri: vscode.Uri, content: Uint8Array, options: { create: boolean, overwrite: boolean }): void {
    vscode.window.showInformationMessage("tried to write");
    this.harpoonFile = content;
    this.emitter.fire([{ type: vscode.FileChangeType.Changed, uri }]);
  }

	// --- manage files/folders

	rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean }): void { }

	delete(uri: vscode.Uri): void { }

	createDirectory(uri: vscode.Uri): void { }

  watch(uri: vscode.Uri, options: { readonly recursive: boolean; readonly excludes: readonly string[]; }): vscode.Disposable {
    // Not implemented yet
    return new vscode.Disposable(() => {});
  }

}
