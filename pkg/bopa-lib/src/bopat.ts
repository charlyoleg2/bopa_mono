// bopat.ts

interface tParams {
	name: string;
	default: string;
	description: string;
}

type tParamVal = Record<string, string>;

type tDefs = Record<string, string>;
interface tBopa {
	params: tParams[];
	defs: tDefs;
	files: string[];
	mkdir: string[];
	lastMessages: string[];
}

export type { tParams, tParamVal, tBopa };
