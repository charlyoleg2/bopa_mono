// run-json-recipes.ts

import { readRecipe, makeZip } from '../src/index.ts';
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
		const zFile = await makeZip(res.recipe);
		const fZipName = `${dirOut}/${zFile.fName}.zip`;
		// write binary file
		const fArrayBuffer = await zFile.fBlob.arrayBuffer();
		const fBuffer = Buffer.from(fArrayBuffer);
		await fs.writeFile(fZipName, fBuffer);
		console.log(`${idx}- Write file ${fZipName}`);
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
await fs.rm(dirOut, { recursive: true });
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
