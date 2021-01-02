<script lang="ts">
	type Point = {
		x: number;
		y: number;
	};
	let points = [] as Point[];
	const addPoint = (e) => {
		if (e.target.tagName === 'svg') {
			points[points.length] = { x: e.clientX, y: e.clientY } as Point;
		}
	};

	const removePoint = (e) => {
		const p = {
			x: parseInt(e.target.attributes.cx.value),
			y: parseInt(e.target.attributes.cy.value),
		} as Point;
		points = points.filter((point) => point.x !== p.x && point.y !== p.y);
	};
</script>

<style>
	.grid {
		display: flex;
		height: 100rem;
	}

	.grid * {
		flex: 50%;
	}

	circle {
		margin: -8px;
		fill: orangered;
	}
</style>

<div class="grid">
	<svg on:click={addPoint}>
		{#each points as p (p)}
			<circle cx={p.x} cy={p.y} r={5} on:click|preventDefault={removePoint} />
		{/each}
		<polygon points={points.map((p) => `${p.x}, ${p.y}`).join(' ')} />
	</svg>

	<div />
</div>
