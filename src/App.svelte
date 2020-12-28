<script lang="ts">
	let cats = [
		{ id: 'J---aiyznGQ', name: 'Keyboard Cat' },
		{ id: 'z_AbfPXTKms', name: 'Maru' },
		{ id: 'OUtn3pvWmpg', name: 'Henri The Existential Cat' },
	];
</script>

<h1>Famous Cats of Youtube</h1>
{#each cats as { id, name }, i}
	<li>
		<a target="_blank" href="https://youtube.com/watch?v={id}">
			{i + 1}:
			{name}
		</a>
	</li>
{/each}
<ul />
