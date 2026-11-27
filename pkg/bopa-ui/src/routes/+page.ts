import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	let rJson = { backend: 'static' };
	try {
		const resp = await fetch('/backend');
		if (resp.ok) {
			rJson = await resp.json();
		}
	} catch (err) {
		console.log('ERR018: fetch /backend failed!');
		console.log(err);
	}
	console.log(rJson);
	return rJson;
};
