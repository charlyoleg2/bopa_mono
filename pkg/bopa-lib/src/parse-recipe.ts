// parse-recipe.ts

import * as z from 'zod';
import fs from 'node:fs/promises';
//import process from 'node:process';

const zRecipe = z.strictObject({
	params: z.array(
		z.strictObject({
			name: z.string(),
			default: z.string(),
			description: z.string(),
			renameFilePath: z.string(),
			renameFContent: z.string(),
			renameLastMsgs: z.string(),
			renameLeTopDir: z.string()
		})
	),
	topDir: z.strictObject({
		name: z.string(),
		createTopDir: z.boolean(),
		checkParentDir: z.boolean()
	}),
	files: z.array(
		z.strictObject({
			url: z.url(),
			path: z.array(z.string())
		})
	),
	mkdir: z.array(z.string()),
	lastMessages: z.array(z.string())
});

//const jsonSchema = JSON.stringify(z.toJSONSchema(zRecipe), null, 2);
//await fs.writeFile('recipeJsonSchema.json', jsonSchema);

const fPath = './recipe/parameBlabla_mono.json';
const jsonString = await fs.readFile(fPath, 'utf8');

try {
	//console.log(jsonString);
	const jsonData = JSON.parse(jsonString);
	//console.log(jsonData);
	zRecipe.parse(jsonData);
	console.log(`file ${fPath} parse successfully!`);
} catch (err) {
	console.log(err);
	//process.exit(1);
}
