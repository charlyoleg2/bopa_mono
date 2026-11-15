// makeBoiler.ts

import type { tRecipe, tKeyVal } from './recipeZod.ts';
import { tReplaceMode, genReplaceKV } from './recipeZod.ts';
import { ZipFS } from '@zip.js/zip.js';

interface tBoilerPlate {
	topDir: string;
	topDirCnt: number;
	lastMsg: string[];
	lastMsgCnt: number;
	zipBlob: Blob;
}

function genTopDirName(iRecipe: tRecipe, iParamVal: tKeyVal): [string, number] {
	let rTopDirName = iRecipe.topDir.name;
	const replaceKV = genReplaceKV(iRecipe, iParamVal, tReplaceMode.eLeTopDir);
	//console.log(replaceKV);
	let rCnt = 0;
	for (const kk in replaceKV) {
		const vv = replaceKV[kk];
		const kkRegex = new RegExp(kk, 'g');
		rCnt += rTopDirName.matchAll(kkRegex).reduce((cc) => cc + 1, 0);
		rTopDirName = rTopDirName.replaceAll(kkRegex, vv);
	}
	return [rTopDirName, rCnt];
}

function genLastMsg(iRecipe: tRecipe, iParamVal: tKeyVal): [string[], number] {
	const rLastMsg: string[] = [];
	const replaceKV = genReplaceKV(iRecipe, iParamVal, tReplaceMode.eLastMsgs);
	//console.log(replaceKV);
	let rCnt = 0;
	for (const iLine of iRecipe.lastMessages) {
		let line = iLine;
		for (const kk in replaceKV) {
			const vv = replaceKV[kk];
			const kkRegex = new RegExp(kk, 'g');
			//console.log(`dbg039: ${line}`);
			rCnt += line.matchAll(kkRegex).reduce((cc) => cc + 1, 0);
			line = line.replaceAll(kkRegex, vv);
			//console.log(`dbg029: kk ${kk}, rCnt ${rCnt}`);
		}
		rLastMsg.push(line);
	}
	return [rLastMsg, rCnt];
}

async function makeBoiler(iRecipe: tRecipe, iParamVal: tKeyVal): Promise<tBoilerPlate> {
	const [topDir, topDirCnt] = genTopDirName(iRecipe, iParamVal);
	const [lastMsg, lastMsgCnt] = genLastMsg(iRecipe, iParamVal);
	const zipFs = new ZipFS();
	zipFs.addText('hello.txt', 'Hello world!');
	zipFs.addText('folder/hello.txt', 'Hello world from a directory!');
	const zipFileBlob = await zipFs.exportBlob();
	const rBoilerPlate: tBoilerPlate = {
		topDir: topDir,
		topDirCnt: topDirCnt,
		lastMsg: lastMsg,
		lastMsgCnt: lastMsgCnt,
		zipBlob: zipFileBlob
	};
	return rBoilerPlate;
}

export type { tBoilerPlate };
export { makeBoiler };
