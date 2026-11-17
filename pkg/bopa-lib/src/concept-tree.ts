// concept-tree.ts

class ConceptTree {
	name = '';
	sub: ConceptTree[] = [];

	constructor(iName: string) {
		if (!['', '.'].includes(iName)) {
			this.name = iName;
		}
	}

	find(iName: string): ConceptTree | null {
		let rTree = null;
		for (const obj of this.sub) {
			if (obj.name === iName) {
				rTree = obj;
			}
		}
		return rTree;
	}

	add(iPath: string) {
		console.log(`iPath: ${iPath}`);
		const lElem = iPath.split('/');
		// eslint-disable-next-line
		let pTree: ConceptTree = this;
		for (const elem of lElem) {
			console.log(`dbg288: elem ${elem}  pTree.name: ${pTree.name}`);
			console.log(pTree.sub.map((e) => e.name));
			const p2Tree = pTree.find(elem);
			if (p2Tree === null) {
				console.log(`add elem ${elem}  p2Tree ${p2Tree} bool ${p2Tree === null}`);
				const nTree = new ConceptTree(elem);
				pTree.sub.push(nTree);
				pTree = nTree;
			} else {
				pTree = p2Tree;
			}
		}
	}

	txtDiag(iShift = 0) {
		let rTxt = '';
		for (const elem of this.sub) {
			rTxt += `${' '.repeat(iShift)}+ ${elem.name}\n`;
			for (const elem2 of elem.sub) {
				rTxt += elem2.txtDiag(iShift + 2);
			}
		}
		return rTxt;
	}
}

function conceptTree(iName: string): ConceptTree {
	const rTree = new ConceptTree(iName);
	return rTree;
}

export { conceptTree };
