concept-tree
============


Presentation
------------

The package *concept-tree* helps to make a virtual tree structure and output it in different ways.

Alternative solutions:

- https://github.com/D-Sketon/fast-archy
- https://mermaid.ai/open-source/syntax/treeView.html


Links
-----

- [sources](https://github.com/charlyoleg2/bopa_mono/tree/main/pkg/concept-tree)
- [pkg](https://www.npmjs.com/package/concept-tree)


Getting started
---------------

```bash
npm i concept-tree@latest
vim blabla.ts
```

blabla.ts:
```JavaScript
import { conceptTree } from '../src/index.ts';

// create a tree
const myTree = conceptTree('aaa');
myTree.addPath('xxx/zzz');
myTree.addPath('xxx/yyy');
myTree.addSubTree(otherTree);
myTree.addElem('Abc');

// get a sub-tree
const subTree = myTree.find('xxx')

// configure the output
myTree.setPrefix(0); // 0, 1, 2
myTree.setRootPrefix(true);
myTree.setNumbering(true);
myTree.setSorting(true);

// outputs
const lElem = myTree.listElem(); // string[]
const txt = myTree.drawTree();   // string
const lPath = myTree.listTree(); // string[]
```

Combining with Mermaid.js
-------------------------

```mermaid
treeView-beta
├── src/
│   ├── App.tsx  ## main component
│   └── index.ts ## entry point
├── .env ## environment variables
├── Dockerfile
└── package.json
```


Development
-----------

```bash
git clone https://github.com/charlyoleg2/bopa_mono
cd bopa_mono
npm -w concept-tree install
npm -w concept-tree run ci
```
