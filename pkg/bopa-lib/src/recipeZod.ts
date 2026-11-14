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

type tRecipe = z.infer<typeof zRecipe>;

interface tRecipeReadRes {
	ok: boolean;
	msg: string;
	recipe: tRecipe;
}

function readRecipe(fName: string, fText: string): tRecipeReadRes {
	let rOk = false;
	let rMsg = `check ${fName} :`;
	let rRecipe: tRecipe = {
		params: [],
		topDir: { name: 'nothing', createTopDir: false, checkParentDir: true },
		files: [],
		mkdir: [],
		lastMessages: []
	};
	try {
		//console.log(fText);
		const jsonData = JSON.parse(fText);
		//console.log(jsonData);
		rMsg += ' json ok :';
		rRecipe = zRecipe.parse(jsonData);
		rMsg += ' schema ok';
		//console.log(rMsg);
		rOk = true;
	} catch (err) {
		const errT = err as Error;
		rMsg = 'ERR024: ' + rMsg + '\n' + errT.message;
		//console.log(rMsg);
		//console.log('ERR024: ' + logMsg);
		//console.log(err);
		//process.exit(1);
	}
	const rRes: tRecipeReadRes = {
		ok: rOk,
		msg: rMsg,
		recipe: rRecipe
	};
	return rRes;
}

export type { tRecipe, tRecipeReadRes };
export { zRecipe, readRecipe };
