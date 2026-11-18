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
			const p2Tree = pTree.find(elem);
			if (p2Tree === null) {
				//console.log(`dbg333 add elem ${elem}  to pTree.name ${pTree.name}`);
				const nTree = new ConceptTree(elem);
				pTree.sub.push(nTree);
				pTree = nTree;
			} else {
				pTree = p2Tree;
			}
		}
	}

	genTxtDiag(iRoot: boolean, iLast: boolean, iPad: string, idx: number): string {
		let rTxt = '';
		//console.log(`dbg490: name: ${this.name}`);
		//console.log(this.sub.map((e) => e.name));
		if (iRoot) {
			if (this.name !== '') {
				rTxt += `${iPad}${this.name}\n`;
			}
		} else {
			rTxt += `${iPad}+--${(idx + 1).toString().padStart(3)}. ${this.name}\n`;
		}
		for (const [idx2, elem] of this.sub.entries()) {
			const last = idx2 === this.sub.length - 1 ? true : false;
			let lePad = iPad;
			if (!iRoot) {
				if (iLast) {
					lePad += ' '.repeat(8);
				} else {
					lePad += '|' + ' '.repeat(7);
				}
			}
			rTxt += elem.genTxtDiag(false, last, lePad, idx2);
		}
		return rTxt;
	}

	txtDiag(): string {
		const rTxt = this.genTxtDiag(true, true, '    ', 0);
		return rTxt;
	}
}

function conceptTree(iName: string): ConceptTree {
	const rTree = new ConceptTree(iName);
	return rTree;
}

export { conceptTree };
