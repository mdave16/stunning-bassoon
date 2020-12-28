<script lang="ts">
	let count = 0;
	$: doubled = count * 2;
	$: times = count === 1 ? 'time' : 'times';
	$: if (count >= 10) {
		console.log(`the count is ${count}`);
		count = 9;
	}

	const handleClick = () => {
		count++;
	};
</script>

<button on:click={handleClick}> Clicked {count} {times} </button>
<p>{count} doubled is {doubled}</p>
