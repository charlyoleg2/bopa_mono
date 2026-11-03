// feli-cli.ts

import type { tParams, tParamVal, tBopa } from '../src/bopat.ts';

// params
const params: tParams[] = [
	{
		name: 'package-name',
		default: 'UIS',
		description: 'name of the package'
	},
	{
		name: 'CLI-script',
		default: 'ref-uis',
		description: 'name of CLI-script'
	}
];

function genBopa(iParamVal: tParamVal): tBopa {
	// def
	const BASE1 = 'https://github.com/charlyoleg2/ref_feli_mono/blob/main/';
	// files
	const files: string[] = [
		'.editorconfig',
		'.gitignore',
		'.npmrc',
		'README.md',
		'package.json',
		'package-lock.json',
		'pkg/ref-uis/.gitignore',
		'pkg/ref-uis/.prettierignore',
		'pkg/ref-uis/README.md',
		'pkg/ref-uis/eslint.config.js',
		'pkg/ref-uis/package.json',
		'pkg/ref-uis/tsconfig.json',
		'pkg/ref-uis/src/ref-uis.ts',
		'pkg/ref-uis/src/ref-uis.test.ts',
		'pkg/myWebUI/.gitignore',
		'pkg/myWebUI/README.md',
		'pkg/myWebUI/package.json',
		'pkg/myWebUI/src/index.html',
		'pkg/myWebUI/src/favicon.png'
	];
	// mkdir
	const mkdir: string[] = [];
	// lastMessages
	const lastMessages: string[] = [
		'cd UIS',
		"git init && git add . && git commit -am 'initial commit of UIS'"
	];
	console.log(iParamVal); // todo

	const rBopa: tBopa = {
		params: params,
		defs: {
			BASE1: BASE1
		},
		files: files,
		mkdir: mkdir,
		lastMessages: lastMessages
	};

	return rBopa;
}

export { params, genBopa };
