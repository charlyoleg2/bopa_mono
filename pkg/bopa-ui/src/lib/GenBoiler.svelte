<script lang="ts">
	interface Props {
		backendNode: boolean;
	}
	let { backendNode }: Props = $props();
</script>

<div>
	<button class="writy">Download Zip</button>
	<button class={{ writy: backendNode }}>Write Boiler</button>
</div>

<style>
	button {
		margin: 1rem;
		border-radius: 1rem;
		padding: 1rem;
		background-color: yellow;
	}
	button.writy {
		border-width: 0.5rem;
	}
</style>
