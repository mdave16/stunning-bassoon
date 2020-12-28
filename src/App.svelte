<script lang="ts">
	let numbers = [1];
	let addNumber = () => {
		numbers[numbers.length] = numbers.length + 1;
	};

	$: sum = numbers.reduce((t, n) => t + n, 0);
</script>

<p>{numbers.join(' + ')} = {sum}</p>
<button on:click={addNumber}> Add a number </button>
