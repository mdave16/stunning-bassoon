<script lang="ts">
	let inputText = '';
	const gradeToReadingEase = (grade: number): number => {
		return Math.min(100, Math.max(0, 100 - ((grade - 1) / 19) * 100));
	};
	const roundToNdp = (num: number, dp: number): number => {
		const factor = Math.pow(10, dp);
		return Math.round((num + Number.EPSILON) * factor) / factor;
	};
	const ariReadingEase = (text: string): number => {
		const words = text.split(' ').length;
		const characters = text.length;
		const sentences = text.split(/[.!?]/).length;
		const ari = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
		const readingEaseBounded = gradeToReadingEase(ari);
		return roundToNdp(readingEaseBounded, 2);
	};
</script>

<style>
	.grid {
		display: grid;
		gap: 10px;
		padding: 20px;
	}

	h1 {
		font-size: 24px;
		margin-bottom: 10px;
	}

	textarea {
		height: 200px;
		padding: 10px;
		font-size: 16px;
		margin: 10px 0;
		border: 1px solid #ccc;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	p {
		font-size: 16px;
		margin: 5px 0;
	}
</style>

<div class="grid">
	<h1>Text Analysis</h1>
	<p>Reading Ease from 0 (hard) to 100 (easy)</p>
	<p>Automated Readability Index Reading Ease: {ariReadingEase(inputText)}</p>
	<!-- <p>Gunning Fog Reading Ease: {ariReadingEase(inputText)}</p>
	<p>Coleman-Liau Index Reading Ease: {ariReadingEase(inputText)}</p>
	<p>Läsbarhetsindex Reading Ease: {ariReadingEase(inputText)}</p>
	<p>Flesch-Kincaid Reading Ease: {ariReadingEase(inputText)}</p> -->

	<textarea bind:value={inputText} placeholder="Text" />
</div>
