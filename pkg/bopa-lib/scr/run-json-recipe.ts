// run-recipes.ts

import { readRecipe, makeZip } from '../src/index.ts';
import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
//import process from 'node:process';

//const jsonSchema = JSON.stringify(z.toJSONSchema(zRecipe), null, 2);
//await fs.writeFile('recipeJsonSchema.json', jsonSchema);

const dirOut = 'tmp';

async function runOne(iPath: string) {
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
		console.log(`Write file ${fZipName}`);
	} else {
		console.error(res.msg);
	}
}

//const fPath = './recipe/parameBlabla_mono.json';
const jsonFiles = await glob('recipe/**/*.json');
//console.log(jsonFiles);

await fs.mkdir(dirOut, { recursive: true });
for (const iPath of jsonFiles) {
	await runOne(iPath);
}
