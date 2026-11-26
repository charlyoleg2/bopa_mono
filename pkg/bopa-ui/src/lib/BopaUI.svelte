<script lang="ts">
	import ChooseRecipe from './ChooseRecipe.svelte';
	import GenBoiler from './GenBoiler.svelte';

	interface Props {
		backendNode: boolean;
	}
	let { backendNode }: Props = $props();
</script>

<div>
	<h1><b>Bopa</b> quickly writes your boilerplate files</h1>
	<ChooseRecipe />
	Recipe: None
	<GenBoiler {backendNode} />
</div>

<style>
	h1 {
		font-weight: 400;
	}
	h1 > b {
		font-weight: 900;
	}
	div {
		background-color: lightgrey;
	}
</style>
