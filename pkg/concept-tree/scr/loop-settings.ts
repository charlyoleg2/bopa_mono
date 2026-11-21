// run-concept-tree.ts

import { conceptTree } from '../src/index.ts';

interface tConfig {
	rootName: string;
	prefixIdx: number;
	rootPrefix: boolean;
	numbering: boolean;
	sorting: boolean;
}

const conf: tConfig[] = [];

//for (const iRootName of ['', 'aaa']) {
//	for (let iPrefix = 0; iPrefix < 3; iPrefix++) {
//		for (const iRootPrefix of [true, false]) {
//			for (const iNumbering of [true, false]) {
//				for (const iSorting of [true, false]) {
//					const iConf: tConfig = {
//						rootName: iRootName,
//						prefixIdx: iPrefix,
//						rootPrefix: iRootPrefix,
//						numbering: iNumbering,
//						sorting: iSorting
//					};
//					conf.push(iConf);
//				}
//			}
//		}
//	}
//}
for (const iRootName of ['', 'aaa']) {
	for (let iPrefix = 0; iPrefix < 3; iPrefix++) {
		for (const iRootPrefix of [true, false]) {
			const iConf: tConfig = {
				rootName: iRootName,
				prefixIdx: iPrefix,
				rootPrefix: iRootPrefix,
				numbering: false,
				sorting: true
			};
			conf.push(iConf);
		}
	}
}

for (const [idx, iConf] of conf.entries()) {
	console.log('\n\n\n=============================================');
	console.log(`Test config : ${idx}`);
	console.log(`1- rootName    : ${iConf.rootName}`);
	console.log(`2- prefixIdx   : ${iConf.prefixIdx}`);
	console.log(`3- rootPrefix	 : ${iConf.rootPrefix}`);
	console.log(`4- numbering   : ${iConf.numbering}`);
	console.log(`5- sorting	 : ${iConf.sorting}`);

	const tree1 = conceptTree(iConf.rootName);
	//const tree1 = conceptTree('aaa');
	//const tree1 = conceptTree('');
	tree1.addPath('xxx/zzz');
	tree1.addPath('xxx/yyy');
	tree1.addPath('bbb/ccc/ddd');
	tree1.addPath('bbb/eee/ddd');
	tree1.addPath('fff/ggg');
	tree1.addPath('hhh');
	tree1.addElem('iii');
	const tree2 = conceptTree('kkk');
	tree2.addPath('bbb/ccc/ddd');
	tree1.addSubTree(tree2);

	// useless but valid
	tree1.addPath('bbb/ccc/ddd');

	console.log('check warnings due to invalid new element');
	tree1.addElem('kkk');
	tree1.addSubTree(tree2);

	// outputs
	tree1.setPrefix(iConf.prefixIdx); // 0, 1, 2
	tree1.setRootPrefix(iConf.rootPrefix);
	tree1.setNumbering(iConf.numbering);
	tree1.setSorting(iConf.sorting);

	console.log('tree1.listElem()');
	const lElem = tree1.listElem();
	for (const [idx, iElem] of lElem.entries()) {
		console.log(`${idx + 1} : ${iElem}`);
	}

	console.log('tree1.drawTree()');
	const txt = tree1.drawTree();
	console.log(txt);

	console.log('tree1.listTree()');
	const lPath = tree1.listTree();
	for (const [idx, iPath] of lPath.entries()) {
		console.log(`${idx + 1} : ${iPath}`);
	}
}
