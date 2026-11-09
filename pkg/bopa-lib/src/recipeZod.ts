// recipeZod.ts

import * as z from 'zod';

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

export { zRecipe };
