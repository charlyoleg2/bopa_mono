// check-recipes.ts

import { zRecipe } from '../src/index.ts';
import { glob } from 'glob';
import fs from 'node:fs/promises';
//import process from 'node:process';

//const jsonSchema = JSON.stringify(z.toJSONSchema(zRecipe), null, 2);
//await fs.writeFile('recipeJsonSchema.json', jsonSchema);

async function checkOne(iPath: string) {
	let logMsg = `check ${iPath} :`;
	const jsonString = await fs.readFile(iPath, 'utf8');
	try {
		//console.log(jsonString);
		const jsonData = JSON.parse(jsonString);
		//console.log(jsonData);
		logMsg += ' json ok :';
		zRecipe.parse(jsonData);
		logMsg += ' schema ok';
		console.log(logMsg);
	} catch (err) {
		console.log('ERR024: ' + logMsg);
		console.log(err);
		//process.exit(1);
	}
}

//const fPath = './recipe/parameBlabla_mono.json';
const jsonFiles = await glob('recipe/**/*.json');
//console.log(jsonFiles);

for (const iPath of jsonFiles) {
	await checkOne(iPath);
}
