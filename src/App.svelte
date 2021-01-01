<script lang="ts">
	let subscribed = false;
</script>

<label>
	<input type="checkbox" bind:checked={subscribed} />
	Yes! steal my data
</label>

<p>
	{#if subscribed}
		Thank you. We will sell your personal data.
	{:else}
		You must opt in to continue. If you are not paying, you are the product.
	{/if}
</p>

<button disabled={!subscribed}> Subsrcribe </button>
