import { Plugin } from 'obsidian';
declare module "obsidian" {
	interface WorkspaceLeaf {
		width: number;
	}
}
export default class RevealActiveFilePlugin extends Plugin {
	private isOpened() {
		let isOpen = false;
		this.app.workspace.iterateAllLeaves((leaf) => {
			if (leaf.getViewState().type == "file-explorer" && leaf.width > 0) {
				isOpen = true;
			}
		});
		return isOpen;

	}
	private reveal() {
		(this.app as any).commands.executeCommandById('file-explorer:reveal-active-file');
	}

	onload() {
		this.app.workspace.on('file-open', () => {
			if (this.isOpened()) this.reveal();
		})
	}
}
