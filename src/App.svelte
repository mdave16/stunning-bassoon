<script lang="ts">
	import Inner from './Inner.svelte';

	const handleClick = () => {
		console.log('clicked');
	};
</script>

<Inner on:click={handleClick} />
