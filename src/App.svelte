<script lang="ts">
	const getRandomNumber = async () => {
		const res = await fetch('http://numbersapi.com/random');
		const text = await res.text();

		if (res.ok) {
			return text;
		} else {
			throw new Error(text);
		}
	};

	let promise = getRandomNumber();
	const handleClick = () => {
		promise = getRandomNumber();
	};
</script>

<button on:click={handleClick}>generate a random number fact</button>
{#await promise}
	<p>...waiting</p>
{:then number}
	<p>The number is {number}</p>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
