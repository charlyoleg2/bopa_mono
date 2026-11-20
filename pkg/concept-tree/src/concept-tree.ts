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
	prefixx = 0;
	numbering = true;
	sorting = true;

	constructor(iName: string) {
		if (!['', '.'].includes(iName)) {
			this.name = iName;
		}
	}

	getPrefix(): string[] {
		const rPrefixStr = cBDchar[this.prefixx];
		return rPrefixStr;
	}

	// 0: SquareLine, 1: ASCII; 2: space
	setPrefix(iId: number) {
		const id = Math.max(0, Math.min(iId, cBDchar.length - 1));
		this.prefixx = id;
	}

	setNumbering(iNumbering: boolean) {
		this.numbering = iNumbering;
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

	addSubTree(iTree: ConceptTree): ConceptTree {
		let pTree = this.findElem(iTree.name);
		if (pTree === null) {
			this.sub.push(iTree);
			pTree = iTree;
		} else {
			console.log(`WARN058: the element ${iTree.name} already exist! Nothing added!`);
		}
		return pTree;
	}

	addElem(iName: string): ConceptTree {
		let pTree = this.findElem(iName);
		if (pTree === null) {
			const nTree = new ConceptTree(iName);
			this.sub.push(nTree);
			pTree = nTree;
		} else {
			console.log(`WARN063: the element ${iName} already exist! Nothing added!`);
		}
		return pTree;
	}

	addPath(iPath: string) {
		//console.log(`dbg244 iPath: ${iPath}`);
		const lElem = iPath.split('/');
		// eslint-disable-next-line
		let pTree: ConceptTree = this;
		for (const elem of lElem) {
			if (!['', '.'].includes(elem)) {
				const p2Tree = pTree.findElem(elem);
				if (p2Tree === null) {
					//console.log(`dbg333 add elem ${elem}  to pTree.name ${pTree.name}`);
					pTree = pTree.addElem(elem);
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
			const pref = iLast ? this.getPrefix()[1] : this.getPrefix()[0];
			const numb = this.numbering ? `${(idx + 1).toString().padStart(3)}.` : '';
			rList.push(`${iPad}${pref}${numb} ${this.name}`);
		}
		const lName = this.listElem();
		if (this.sorting) {
			lName.sort();
		}
		for (const [idx2, elem] of lName.entries()) {
			const eTree = this.findElem(elem);
			if (eTree !== null) {
				eTree.setPrefix(this.prefixx);
				eTree.setNumbering(this.numbering);
				eTree.setSorting(this.sorting);
				const last = idx2 === this.sub.length - 1 ? true : false;
				let lePad = iPad;
				if (!iRoot) {
					if (iLast) {
						lePad += ' '.repeat(this.numbering ? 8 : 4);
					} else {
						lePad += this.getPrefix()[2] + ' '.repeat(this.numbering ? 7 : 3);
					}
				}
				rList.push(...eTree._genTxtDiag(false, last, lePad, idx2));
			} else {
				console.log('ERR127: this should never happen!');
			}
		}
		return rList;
	}

	drawTree(): string {
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
