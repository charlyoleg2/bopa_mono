// bopa-lib index.ts

function abc(aStr: string): string {
	const rStr = `abc ${aStr}`;
	return rStr;
}

export { abc };
export * from './recipeZod.ts';
export * from './makeZip.ts';
