// makeBoiler.ts

import type { tRecipe, tKeyVal } from './recipeZod.ts';
import { tReplaceMode, genReplaceKV } from './recipeZod.ts';
import { conceptTree } from 'concept-tree';
import { ZipFS } from '@zip.js/zip.js';

interface tRemoteFile {
	orig: string;
	dest: string;
	size: number;
	replaceCnt: number;
}

interface tPreBoiler {
	topDir: string;
	topDirCnt: number;
	dirTree: string;
	dirList: string[];
	pathCnt: number;
	fileList: tRemoteFile[];
	lastMsg: string[];
	lastMsgCnt: number;
}

interface tZipBoiler {
	fileList: tRemoteFile[];
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

function genPath(iRecipe: tRecipe, iParamVal: tKeyVal): [tRemoteFile[], string[], number] {
	const rFiles: tRemoteFile[] = [];
	const rDirs: string[] = [];
	const replaceKV = genReplaceKV(iRecipe, iParamVal, tReplaceMode.eFilePath);
	//console.log(replaceKV);
	let rCnt = 0;
	// iRecipe.files.path
	for (const iUrl of iRecipe.files) {
		for (const iPath of iUrl.path) {
			let dest = iPath;
			for (const kk in replaceKV) {
				const vv = replaceKV[kk];
				const kkRegex = new RegExp(kk, 'g');
				//console.log(`dbg039: ${dest}`);
				rCnt += dest.matchAll(kkRegex).reduce((cc) => cc + 1, 0);
				dest = dest.replaceAll(kkRegex, vv);
				//console.log(`dbg029: kk ${kk}, rCnt ${rCnt}`);
			}
			const rRF: tRemoteFile = {
				orig: `${iUrl.url.replace(/\/$/, '')}/${iPath}`,
				dest: dest,
				size: 0,
				replaceCnt: 0
			};
			rFiles.push(rRF);
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

function genDirTree(iTopDir: string, iFiles: tRemoteFile[], iDirs: string[]): [string, string[]] {
	const dirTree = conceptTree(iTopDir);
	for (const iLine of iFiles) {
		if (/\//.test(iLine.dest)) {
			//dirTree.addPath(path.Dirname(iLine.dest));
			const dirPath = iLine.dest.replace(/\/[^/]*$/, '');
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

function preBoiler(iRecipe: tRecipe, iParamVal: tKeyVal): tPreBoiler {
	const [topDir, topDirCnt] = genTopDirName(iRecipe, iParamVal);
	const [lFile, lDir, pathCnt] = genPath(iRecipe, iParamVal);
	const topDir2 = iRecipe.topDir.createTopDir ? topDir : '';
	const [dirTree, dirList] = genDirTree(topDir2, lFile, lDir);
	const [lastMsg, lastMsgCnt] = genLastMsg(iRecipe, iParamVal);
	const rBoilerPlate: tPreBoiler = {
		topDir: topDir,
		topDirCnt: topDirCnt,
		dirTree: dirTree,
		dirList: dirList,
		pathCnt: pathCnt,
		fileList: lFile,
		lastMsg: lastMsg,
		lastMsgCnt: lastMsgCnt
	};
	return rBoilerPlate;
}

async function msleep(iMs: number) {
	return new Promise((resolve) => setTimeout(resolve, iMs));
}

async function ffetch(iUrl: string): Promise<[string, number, number]> {
	console.log(`dbg152: ffetch ${iUrl}`);
	const rTxt = 'aaa\nbbb\n';
	const rSize = rTxt.length;
	const rCnt = 5;
	await msleep(1);
	return [rTxt, rSize, rCnt];
}

async function zipBoiler(
	iDirList: string[],
	iFileList: tRemoteFile[],
	verbose: boolean
): Promise<tZipBoiler> {
	const rFileList: tRemoteFile[] = [];
	const zipFs = new ZipFS();
	//zipFs.addText('hello.txt', 'Hello world!');
	//zipFs.addText('folder/hello.txt', 'Hello world from a directory!');
	for (const [idx, iDir] of iDirList.entries()) {
		if (verbose) {
			console.log(`[${idx + 1}/${iDirList.length}] add directory ${iDir}`);
		}
		zipFs.addDirectory(iDir);
	}
	for (const [idx, iRF] of iFileList.entries()) {
		if (verbose) {
			console.log(`[${idx + 1}/${iFileList.length}] add file ${iRF.dest}`);
		}
		const [ftxt, fsize, fcnt] = await ffetch(iRF.orig);
		zipFs.addText(iRF.dest, ftxt);
		const rRF: tRemoteFile = {
			orig: iRF.orig,
			dest: iRF.dest,
			size: fsize,
			replaceCnt: fcnt
		};
		rFileList.push(rRF);
	}
	const zipFileBlob = await zipFs.exportBlob();
	const rZipBoiler: tZipBoiler = {
		fileList: rFileList,
		zipBlob: zipFileBlob
	};
	return rZipBoiler;
}

export type { tPreBoiler, tZipBoiler };
export { preBoiler, zipBoiler };
