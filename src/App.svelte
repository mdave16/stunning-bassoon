<script lang="ts">
	let scoops = 1;
	let flavours = ['Mint choc chip'];

	const menu = ['Cookies and cream', 'Mint choc chip', 'Raspberry ripple'];
	const possibleScoops = [
		{ number: 1, description: 'One' },
		{ number: 2, description: 'Two' },
		{ number: 3, description: 'Three' },
	];
	const join = (flavours: string[]) => {
		if (flavours.length === 1) return flavours[0];
		return `${flavours.slice(0, -1).join(', ')} and ${
			flavours[flavours.length - 1]
		}`;
	};
</script>

<h2>size</h2>
{#each possibleScoops as scoop}
	<label>
		<input type="radio" bind:group={scoops} value={scoop.number} />
		{scoop.description}
		{scoop.number === 1 ? 'scoop' : 'scoops'}
	</label>
{/each}

<h2>flavours</h2>

{#each menu as flavour}
	<label>
		<input type="checkbox" bind:group={flavours} value={flavour} />
		{flavour}
	</label>
{/each}

{#if flavours.length === 0}
	<p>Please select at least one flavour</p>
{:else if flavours.length > scoops}
	<p>Can't order more flavours than scoops!</p>
{:else}
	<p>
		You ordered
		{scoops}
		{scoops === 1 ? 'scoop' : 'scoops'}
		of
		{join(flavours)}
	</p>
{/if}
