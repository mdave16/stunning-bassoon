<script lang="ts">
	let count = 0;
	$: doubled = count * 2;
	$: times = count === 1 ? 'time' : 'times';
	const handleClick = () => {
		count++;
	};
</script>

<button on:click={handleClick}> Clicked {count} {times} </button>
<p>{count} doubled is {doubled}</p>
