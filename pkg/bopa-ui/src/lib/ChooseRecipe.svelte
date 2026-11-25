<script lang="ts">
	const aaa = 1;
</script>

<section>
	<article>
		<h3>Enter a ULR to a recipe</h3>
		<input type="url" />
		<button>Fetch</button>
	</article>
	<article>
		<h3>Select an embedded recipe</h3>
		<select name="pets" id="pet-select">
			<option value="">--Please choose an option--</option>
			<option value="dog">Dog</option>
			<option value="cat">Cat</option>
			<option value="hamster">Hamster</option>
			<option value="parrot">Parrot</option>
			<option value="spider">Spider</option>
			<option value="goldfish">Goldfish</option>
		</select>
		<button>Select</button>
	</article>
	<article>
		<h3>Select a recipe File {aaa}</h3>
		<label>
			Choose a recipe file:
			<input type="file" accept="application/json" />
		</label>
		<button>Load</button>
	</article>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-around;
		align-items: strech;
		gap: 2rem;
		margin: 0;
		border-radius: 1rem;
		padding: 1rem;
		background-color: green;
	}
	section > article {
		flex-basis: 30%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		background-color: lightblue;
	}
	section > article > button {
		display: block;
		margin: 1rem;
		border-radius: 1rem;
		padding: 1rem;
		background-color: yellow;
	}
</style>
