<script lang="ts">
	let x = 7;
</script>

{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if x > 5}
	<p>{x} is greater than 5</p>
{:else}
	<p>{x} is less than or equal to 5</p>
{/if}
