import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';

const basePath = process.env.BASE_PATH;
const dev = process.argv.includes('dev') || basePath === undefined;

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			prerender: {
				handleHttpError: ({ path, referrer, message }) => {
					// ignore deliberate link to shiny 404 page
					if (path === '/backend' && referrer === '/') {
						return;
					}
					// otherwise fail the build
					throw new Error(message);
				}
			},
			adapter: adapter(),
			paths: {
				base: dev ? '' : `/${basePath}`
			}
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
});
