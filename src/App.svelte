<script lang="ts">
	import Outer from './Outer.svelte';

	const handleMessage = (e) => {
		console.log(e.detail.text);
	};
</script>

<Outer on:message={handleMessage} />
