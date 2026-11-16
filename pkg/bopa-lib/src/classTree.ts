// classTree.ts

class Tree {
	name = '';
	sub: Tree[] = [];

	constructor(iName: string) {
		if (!['', '.'].includes(iName)) {
			this.name = iName;
		}
	}

	find(iName: string): Tree | null {
		let rTree = null;
		for (const elem of this.sub) {
			if (elem.name === iName) {
				rTree = elem;
			}
		}
		return rTree;
	}

	add(iPath: string) {
		const lElem = iPath.split('/');
		// eslint-disable-next-line
		let pTree: Tree = this;
		for (const elem of lElem) {
			const p2Tree = pTree.find(elem);
			if (p2Tree === null) {
				const nTree = new Tree(elem);
				this.sub.push(nTree);
				pTree = nTree;
			} else {
				pTree = p2Tree;
			}
		}
	}

	txtDiag() {
		let rTxt = '';
		for (const elem of this.sub) {
			rTxt += `  + ${elem.name}\n`;
		}
		return rTxt;
	}
}

function makeTree(iName: string): Tree {
	const rTree = new Tree(iName);
	return rTree;
}

export { makeTree };
