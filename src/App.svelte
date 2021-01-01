<script lang="ts">
	let value = 'Some words are <em>italic</em> and some are <b>bold</b>';
</script>

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>

<textarea bind:value />
{@html value}
