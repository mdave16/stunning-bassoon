<script lang="ts">
	import Inner from './Inner.svelte';

	const handleMessage = (e) => {
		console.log(e.detail.text);
	};
</script>

<Inner on:message|once={handleMessage} />
