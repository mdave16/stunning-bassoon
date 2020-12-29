<script lang="ts">
	import Thing from './Thing.svelte';

	let things = [
		{ id: 1, color: 'darkblue' },
		{ id: 2, color: 'indigo' },
		{ id: 3, color: 'deeppink' },
		{ id: 4, color: 'salmon' },
		{ id: 5, color: 'gold' },
	];

	const handleClick = () => {
		console.log(things);
		things = things.slice(1);
		console.log(things);
	};
</script>

<button on:click={handleClick}>Remove first thing </button>
{#each things as thing (thing.id)}
	<Thing current={thing.color} />
{/each}
