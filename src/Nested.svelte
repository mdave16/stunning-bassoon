<script lang="ts">
	export let answer = 'a mystery';
	export let name = 'answer';
</script>

<p>The {name} is {answer}</p>
<p>
	Was I passed in extra props?
	{Object.keys($$props).length > 2 ? 'Yes' : 'No'}
</p>
