// run-concept-tree.ts

import { conceptTree } from '../src/index.ts';

const tree1 = conceptTree('aaa');
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
tree1.setPrefix(0); // 0, 1, 2
tree1.setRootPrefix(true);
tree1.setNumbering(false);
tree1.setSorting(true);

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
