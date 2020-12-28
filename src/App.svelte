<script>
	import Nested from './Nested.svelte';
	const info = {
		answer: 'working',
		name: 'spread operator',
	};
</script>

<Nested answer={423} />
<Nested {...info} />
<Nested {...info} anotherThing="secret extra info" />
