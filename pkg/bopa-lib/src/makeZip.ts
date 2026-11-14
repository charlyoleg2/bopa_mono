// makeZip.ts

import type { tRecipe } from './recipeZod.ts';
import { ZipFS } from '@zip.js/zip.js';

interface tFile {
	fName: string;
	fBlob: Blob;
}

async function makeZip(iRecipe: tRecipe): Promise<tFile> {
	const fName = iRecipe.topDir.name;
	const zipFs = new ZipFS();
	zipFs.addText('hello.txt', 'Hello world!');
	zipFs.addText('folder/hello.txt', 'Hello world from a directory!');
	const zipFileBlob = await zipFs.exportBlob();
	const rFile: tFile = {
		fName: fName,
		fBlob: zipFileBlob
	};
	return rFile;
}

export type { tFile };
export { makeZip };
