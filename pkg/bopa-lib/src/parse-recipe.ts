// parse-recipe.ts

import * as z from "zod";
import fs from 'node:fs/promises';

const zRecipe = z.object({
	params: z.array(z.object({
		name: z.string(),
		default: z.string(),
		description: z.string(),
		renameFilePath: z.string(),
		renameFContent: z.string(),
		renameLastMsgs: z.string(),
		renameLeTopDir: z.string()
	})),
	topDir: z.object({
		name: z.string(),
		createTopDir: z.boolean(),
		checkParentDir: z.boolean()
	}),
	files: z.array(z.object({
		url: z.url(),
		path: z.string()
	})),
	mkdir: z.array(z.string()),
	lastMessages: z.array(z.string())
});

const jsonSchema = JSON.stringify(z.toJSONSchema(zRecipe), null, 2);
await fs.writeFile('recipeJsonSchema.json', jsonSchema);

