<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const sayHi = () => {
		dispatch('message', { text: 'hello!' });
	};
</script>

<button on:click={sayHi}> Click to say hello </button>
