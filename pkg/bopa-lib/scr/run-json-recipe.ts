// run-json-recipes.ts

import { readRecipe, genParamVal, preBoiler, zipBoiler } from '../src/index.ts';
import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

//const jsonSchema = JSON.stringify(z.toJSONSchema(zRecipe), null, 2);
//await fs.writeFile('recipeJsonSchema.json', jsonSchema);

const dirOut = 'tmp';

async function runOne(idx: number, iPath: string) {
	const fName = path.basename(iPath);
	//const bName = path.basename(iPath, '.json');
	const fText = await fs.readFile(iPath, 'utf8');
	const res = readRecipe(fName, fText);
	if (res.ok) {
		//console.log(res.msg);
		const boilerPre = preBoiler(res.recipe, genParamVal(res.recipe));
		const fZipName = `${dirOut}/${boilerPre.topDir}.zip`;
		// log
		console.log(`\n\n${idx}- Write file ${fZipName}`);
		console.log(`  topDir: ${boilerPre.topDir} [replace-cnt: ${boilerPre.topDirCnt}]`);
		console.log(`  directory-tree:  [replace-cnt: ${boilerPre.pathCnt}]`);
		console.log(boilerPre.dirTree);
		console.log(`  directory-list:  [replace-cnt: ${boilerPre.pathCnt}]`);
		console.log(boilerPre.dirList.join('\n'));
		console.log(`  lastMessages:  [replace-cnt: ${boilerPre.lastMsgCnt}]`);
		for (const iLine of boilerPre.lastMsg) {
			console.log(`    ${iLine}`);
		}
		// zip
		const boilerZip = await zipBoiler(boilerPre, true);
		// write binary file
		const fArrayBuffer = await boilerZip.zipBlob.arrayBuffer();
		const fBuffer = Buffer.from(fArrayBuffer);
		await fs.writeFile(fZipName, fBuffer);
		// log2
		console.log('  file-list:');
		for (const [idx2, iRF] of boilerZip.fileList.entries()) {
			const txt = `${idx2 + 1}/${boilerZip.fileList.length} : ${iRF.dest}
    orig: ${iRF.orig}
    size: ${iRF.size}   replaceCnt: ${iRF.replaceCnt}`;
			console.log(txt);
		}
	} else {
		console.error(res.msg);
	}
}

async function runAll() {
	const jsonFiles = await glob('recipe/**/*.json');
	//console.log(jsonFiles);
	for (const [idx, iPath] of jsonFiles.entries()) {
		await runOne(idx + 1, iPath);
	}
}

console.log('run-json-recipe.ts says Hello!');
await fs.rm(dirOut, { recursive: true, force: true });
await fs.mkdir(dirOut, { recursive: true });
if (process.argv.length > 3) {
	console.error(`ERR044: unexpected number of arguments: ${process.argv.length}`);
} else if (process.argv.length === 3) {
	//const fPath = './recipe/parameBlabla_mono.json';
	const fPath = process.argv[2];
	await runOne(1, fPath);
} else {
	await runAll();
}
console.log('run-json-recipe.ts says Bye!');
