<script lang="ts">
	let m = { x: 0, y: 0 };

	const handleMouseMove = (event) => {
		m.x = event.clientX;
		m.y = event.clientY;
	};
</script>

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>

<div on:mousemove={handleMouseMove}>The mouse position is {m.x}, {m.y}</div>
