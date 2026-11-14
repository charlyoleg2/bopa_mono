// check-json-recipe.ts

import { readRecipe } from '../src/index.ts';
import { glob } from 'glob';
import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

//const jsonSchema = JSON.stringify(z.toJSONSchema(zRecipe), null, 2);
//await fs.writeFile('recipeJsonSchema.json', jsonSchema);

async function checkOne(idx: number, iPath: string) {
	const fName = path.basename(iPath);
	const fText = await fs.readFile(iPath, 'utf8');
	const res = readRecipe(fName, fText);
	if (res.ok) {
		console.log(`${idx}- ` + res.msg);
	} else {
		console.error(`${idx}- ` + res.msg);
	}
}

async function checkAll() {
	const jsonFiles = await glob('recipe/**/*.json');
	//console.log(jsonFiles);
	for (const [idx, iPath] of jsonFiles.entries()) {
		await checkOne(idx + 1, iPath);
	}
}

console.log('check-json-recipe.ts says Hello!');
if (process.argv.length > 3) {
	console.error(`ERR036: unexpected number of arguments: ${process.argv.length}`);
} else if (process.argv.length === 3) {
	//const fPath = './recipe/parameBlabla_mono.json';
	const fPath = process.argv[2];
	await checkOne(1, fPath);
} else {
	await checkAll();
}
console.log('check-json-recipe.ts says Bye!');
