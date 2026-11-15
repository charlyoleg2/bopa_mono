// makeZip.ts

import type { tRecipe, tKeyVal } from './recipeZod.ts';
import { tReplaceMode, genReplaceKV } from './recipeZod.ts';
import { ZipFS } from '@zip.js/zip.js';

interface tFile {
	fName: string;
	fNameCnt: number;
	fBlob: Blob;
}

function genTopDirName(iRecipe: tRecipe, iParamVal: tKeyVal): [string, number] {
	let rTopDirName = iRecipe.topDir.name;
	const replaceKV = genReplaceKV(iRecipe, iParamVal, tReplaceMode.eLeTopDir);
	console.log(replaceKV);
	let rCnt = 0;
	for (const kk in replaceKV) {
		const vv = replaceKV[kk];
		const kkRegex = new RegExp(kk, 'g');
		rCnt = rTopDirName.matchAll(kkRegex).reduce((cc) => cc + 1, 0);
		rTopDirName = rTopDirName.replaceAll(kkRegex, vv);
	}
	return [rTopDirName, rCnt];
}

async function makeZip(iRecipe: tRecipe, iParamVal: tKeyVal): Promise<tFile> {
	const [fName, fNameCnt] = genTopDirName(iRecipe, iParamVal);
	const zipFs = new ZipFS();
	zipFs.addText('hello.txt', 'Hello world!');
	zipFs.addText('folder/hello.txt', 'Hello world from a directory!');
	const zipFileBlob = await zipFs.exportBlob();
	const rFile: tFile = {
		fName: fName,
		fNameCnt: fNameCnt,
		fBlob: zipFileBlob
	};
	return rFile;
}

export type { tFile };
export { makeZip };
