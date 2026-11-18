// concept-tree.ts

const cBDchar = [
	['├──', '└──', '│'],
	['+--', '+--', '|'],
	['   ', '   ', ' ']
];

class ConceptTree {
	name = '';
	sub: ConceptTree[] = [];
	// diagram style
	prefix = cBDchar[0];
	index = true;
	sorting = true;

	constructor(iName: string) {
		if (!['', '.'].includes(iName)) {
			this.name = iName;
		}
	}

	setPrefix(iId: number) {
		const id = Math.max(0, Math.min(iId, cBDchar.length - 1));
		this.prefix = cBDchar[id];
	}

	setIndex(iIndex: boolean) {
		this.index = iIndex;
	}

	setSorting(iSorting: boolean) {
		this.sorting = iSorting;
	}

	listElem(): string[] {
		const rList: string[] = this.sub.map((e) => e.name);
		return rList;
	}

	findElem(iName: string): ConceptTree | null {
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
			if (!['', '.'].includes(elem)) {
				const p2Tree = pTree.findElem(elem);
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
	}

	_genTxtDiag(iRoot: boolean, iLast: boolean, iPad: string, idx: number): string[] {
		const rList = [];
		//console.log(`dbg490: name: ${this.name}`);
		//console.log(this.sub.map((e) => e.name));
		if (iRoot) {
			if (this.name !== '') {
				rList.push(`${iPad}${this.name}`);
			}
		} else {
			const pref = iLast ? this.prefix[1] : this.prefix[0];
			rList.push(`${iPad}${pref}${(idx + 1).toString().padStart(3)}. ${this.name}`);
		}
		for (const [idx2, elem] of this.sub.entries()) {
			const last = idx2 === this.sub.length - 1 ? true : false;
			let lePad = iPad;
			if (!iRoot) {
				if (iLast) {
					lePad += ' '.repeat(8);
				} else {
					lePad += this.prefix[2] + ' '.repeat(7);
				}
			}
			rList.push(...elem._genTxtDiag(false, last, lePad, idx2));
		}
		return rList;
	}

	txtDiagram(): string {
		const rTxt = this._genTxtDiag(true, true, '    ', 0).join('\n');
		return rTxt;
	}

	_genPathList(iRoot: boolean, iPad: string): string[] {
		const rList = [];
		//console.log(`dbg490: name: ${this.name}`);
		//console.log(this.sub.map((e) => e.name));
		let lePad = iPad;
		if (iRoot) {
			if (this.name !== '') {
				lePad = `${iPad}${this.name}`;
				rList.push(lePad);
			}
		} else {
			lePad = `${iPad}/${this.name}`;
			rList.push(lePad);
		}
		for (const elem of this.sub) {
			rList.push(...elem._genPathList(false, lePad));
		}
		return rList;
	}

	listTree(): string[] {
		const rList = this._genPathList(true, '    ');
		return rList;
	}
}

function conceptTree(iName: string): ConceptTree {
	const rTree = new ConceptTree(iName);
	return rTree;
}

export { conceptTree };
