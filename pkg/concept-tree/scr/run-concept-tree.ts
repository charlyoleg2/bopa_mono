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

console.log('check thrown errors');
try {
	tree1.addElem('');
} catch (err) {
	console.log('error-1');
	console.log(err);
}
try {
	tree1.addElem(' ');
} catch (err) {
	console.log('error-2');
	console.log(err);
}
try {
	tree1.addElem('a/');
} catch (err) {
	console.log('error-3');
	console.log(err);
}
try {
	const tree3 = conceptTree('');
	tree1.addSubTree(tree3);
} catch (err) {
	console.log('error-4');
	console.log(err);
}
try {
	const tree4 = conceptTree('a/b');
	tree4.listElem();
} catch (err) {
	console.log('error-5');
	console.log(err);
}

// outputs
console.log('outputs');
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
