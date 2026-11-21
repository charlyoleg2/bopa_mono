// makeBoiler.ts

import type { tRecipe, tKeyVal } from './recipeZod.ts';
import { tReplaceMode, genReplaceKV } from './recipeZod.ts';
import { conceptTree } from 'concept-tree';
import { ZipFS } from '@zip.js/zip.js';

interface tBoilerPlate {
	topDir: string;
	topDirCnt: number;
	dirTree: string;
	dirList: string[];
	pathCnt: number;
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

function genPath(iRecipe: tRecipe, iParamVal: tKeyVal): [string[], string[], number] {
	const rFiles: string[] = [];
	const rDirs: string[] = [];
	const replaceKV = genReplaceKV(iRecipe, iParamVal, tReplaceMode.eFilePath);
	//console.log(replaceKV);
	let rCnt = 0;
	// iRecipe.files.path
	for (const iFile of iRecipe.files) {
		for (const iPath of iFile.path) {
			let line = iPath;
			for (const kk in replaceKV) {
				const vv = replaceKV[kk];
				const kkRegex = new RegExp(kk, 'g');
				//console.log(`dbg039: ${line}`);
				rCnt += line.matchAll(kkRegex).reduce((cc) => cc + 1, 0);
				line = line.replaceAll(kkRegex, vv);
				//console.log(`dbg029: kk ${kk}, rCnt ${rCnt}`);
			}
			rFiles.push(line);
		}
	}
	// iRecipe.mkdir
	for (const iPath of iRecipe.mkdir) {
		let line = iPath;
		for (const kk in replaceKV) {
			const vv = replaceKV[kk];
			const kkRegex = new RegExp(kk, 'g');
			//console.log(`dbg039: ${line}`);
			rCnt += line.matchAll(kkRegex).reduce((cc) => cc + 1, 0);
			line = line.replaceAll(kkRegex, vv);
			//console.log(`dbg029: kk ${kk}, rCnt ${rCnt}`);
		}
		rDirs.push(line);
	}
	return [rFiles, rDirs, rCnt];
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

function genDirTree(iTopDir: string, iFiles: string[], iDirs: string[]): [string, string[]] {
	const dirTree = conceptTree(iTopDir);
	for (const iLine of iFiles) {
		if (/\//.test(iLine)) {
			//dirTree.addPath(path.Dirname(iLine));
			const dirPath = iLine.replace(/\/[^/]*$/, '');
			dirTree.addPath(dirPath);
		}
	}
	for (const iLine of iDirs) {
		dirTree.addPath(iLine);
	}
	dirTree.setPrefix(0);
	dirTree.setNumbering(false);
	dirTree.setSorting(true);
	const rDirTree = dirTree.drawTree();
	const rDirList = dirTree.listTree();
	return [rDirTree, rDirList];
}

async function makeBoiler(iRecipe: tRecipe, iParamVal: tKeyVal): Promise<tBoilerPlate> {
	const [topDir, topDirCnt] = genTopDirName(iRecipe, iParamVal);
	const [lFile, lDir, pathCnt] = genPath(iRecipe, iParamVal);
	const [dirTree, dirList] = genDirTree(topDir, lFile, lDir);
	const [lastMsg, lastMsgCnt] = genLastMsg(iRecipe, iParamVal);
	const zipFs = new ZipFS();
	zipFs.addText('hello.txt', 'Hello world!');
	zipFs.addText('folder/hello.txt', 'Hello world from a directory!');
	const zipFileBlob = await zipFs.exportBlob();
	const rBoilerPlate: tBoilerPlate = {
		topDir: topDir,
		topDirCnt: topDirCnt,
		dirTree: dirTree,
		dirList: dirList,
		pathCnt: pathCnt,
		lastMsg: lastMsg,
		lastMsgCnt: lastMsgCnt,
		zipBlob: zipFileBlob
	};
	return rBoilerPlate;
}

export type { tBoilerPlate };
export { makeBoiler };
