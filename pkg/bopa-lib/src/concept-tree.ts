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
		//console.log(`dbg244 iPath: ${iPath}`);
		const lElem = iPath.split('/');
		// eslint-disable-next-line
		let pTree: ConceptTree = this;
		for (const elem of lElem) {
			//console.log(`dbg288: elem ${elem}  pTree.name: ${pTree.name}`);
			//console.log(pTree.sub.map((e) => e.name));
			const p2Tree = pTree.find(elem);
			if (p2Tree === null) {
				//console.log(`dbg333 add elem ${elem}  p2Tree ${p2Tree} bool ${p2Tree === null}`);
				//console.log(`dbg333 add elem ${elem}  to pTree.name ${pTree.name}`);
				const nTree = new ConceptTree(elem);
				//console.log(pTree.sub.map((e) => e.name));
				pTree.sub.push(nTree);
				//console.log(pTree.sub.map((e) => e.name));
				pTree = nTree;
				//console.log(`dbg388 after add elem ${elem}  pTree.name ${pTree.name}`);
			} else {
				pTree = p2Tree;
			}
		}
	}

	genTxtDiag(iShift: number, idx: number): string {
		let rTxt = '';
		//console.log(`dbg490: name: ${this.name}`);
		//console.log(this.sub.map((e) => e.name));
		rTxt += `${' '.repeat(iShift)}+--${(idx + 1).toString().padStart(3)}. ${this.name}\n`;
		for (const [idx2, elem] of this.sub.entries()) {
			//console.log(`dbg460: ${idx2} elem.name ${elem.name}`);
			rTxt += elem.genTxtDiag(iShift + 4, idx2);
		}
		return rTxt;
	}

	txtDiag(): string {
		const rTxt = this.genTxtDiag(0, 0);
		return rTxt;
	}
}

function conceptTree(iName: string): ConceptTree {
	const rTree = new ConceptTree(iName);
	return rTree;
}

export { conceptTree };
