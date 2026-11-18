// run-json-recipes.ts

import { readRecipe, makeBoiler, genParamVal } from '../src/index.ts';
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
		const boiler = await makeBoiler(res.recipe, genParamVal(res.recipe));
		const fZipName = `${dirOut}/${boiler.topDir}.zip`;
		// write binary file
		const fArrayBuffer = await boiler.zipBlob.arrayBuffer();
		const fBuffer = Buffer.from(fArrayBuffer);
		await fs.writeFile(fZipName, fBuffer);
		// log
		console.log(`${idx}- Write file ${fZipName}`);
		console.log(`  topDir: ${boiler.topDir} [replace-cnt: ${boiler.topDirCnt}]`);
		console.log(`  directory-tree:  [replace-cnt: ${boiler.pathCnt}]`);
		console.log(boiler.dirTree);
		console.log(`  directory-list:  [replace-cnt: ${boiler.pathCnt}]`);
		console.log(boiler.dirList.join('\n'));
		console.log(`  lastMessages:  [replace-cnt: ${boiler.lastMsgCnt}]`);
		for (const iLine of boiler.lastMsg) {
			console.log(`    ${iLine}`);
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
