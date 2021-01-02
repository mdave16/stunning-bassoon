<script lang="ts">
	type Point = {
		x: number;
		y: number;
	};
	let points = [] as Point[];
	const addPoint = (e) => {
		points[points.length] = { x: e.x, y: e.y } as Point;
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
		color: black;
	}
</style>

<div class="grid">
	<svg on:click={addPoint}>
		{#each points as p (p)}
			<circle cx={p.x} cy={p.y} r={2} />
		{/each}
	</svg>

	<div />
</div>
