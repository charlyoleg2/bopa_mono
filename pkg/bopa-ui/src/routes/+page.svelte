<script lang="ts">
	import { BopaUI } from '#lib/index.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let backendNode: boolean = $derived(data.backend === 'NodeJS');
</script>

<BopaUI {backendNode} />
