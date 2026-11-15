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

const cRecipe0: tRecipe = {
	params: [],
	topDir: { name: 'recipeZero', createTopDir: false, checkParentDir: true },
	files: [],
	mkdir: [],
	lastMessages: []
};

interface tRecipeReadRes {
	ok: boolean;
	msg: string;
	recipe: tRecipe;
}

function readRecipe(fName: string, fText: string): tRecipeReadRes {
	let rOk = false;
	let rMsg = `check ${fName} :`;
	let rRecipe = cRecipe0;
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

type tKeyVal = Record<string, string>;

function genParamVal(iRecipe: tRecipe): tKeyVal {
	const rParamVal: tKeyVal = {};
	for (const iParam of iRecipe.params) {
		const pKey = iParam.name;
		const pVal = iParam.default;
		rParamVal[pKey] = pVal;
	}
	return rParamVal;
}

enum tReplaceMode {
	eFilePath,
	eFContent,
	eLastMsgs,
	eLeTopDir
}
type tReplaceKey = 'renameFilePath' | 'renameFContent' | 'renameLastMsgs' | 'renameLeTopDir';

function getReplaceKey(iMode: tReplaceMode): tReplaceKey {
	let rReplaceKey: tReplaceKey = 'renameFilePath';
	if (iMode === tReplaceMode.eFContent) {
		rReplaceKey = 'renameFContent';
	} else if (iMode === tReplaceMode.eLastMsgs) {
		rReplaceKey = 'renameLastMsgs';
	} else if (iMode === tReplaceMode.eLeTopDir) {
		rReplaceKey = 'renameLeTopDir';
	}
	return rReplaceKey;
}

function genReplaceKV(iRecipe: tRecipe, iParamVal: tKeyVal, iMode: tReplaceMode): tKeyVal {
	const rReplaceKV: tKeyVal = {};
	const replaceKey = getReplaceKey(iMode);
	for (const iParam of iRecipe.params) {
		const kk = iParam[replaceKey];
		const vv = iParamVal[iParam.name];
		if (!['', '.'].includes(kk) && !['', '.'].includes(vv)) {
			rReplaceKV[kk] = vv;
		}
	}
	return rReplaceKV;
}

export type { tRecipe, tRecipeReadRes, tKeyVal };
export { tReplaceMode, zRecipe, cRecipe0, readRecipe, genParamVal, genReplaceKV };
