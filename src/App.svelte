<script lang="ts">
	const handleClick = () => {
		console.log('clicked');
	};
</script>

<button on:click|once={handleClick}> Click me </button>
