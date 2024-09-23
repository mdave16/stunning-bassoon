export const gradeToReadingEase = (grade: number): number => {
	return Math.min(100, Math.max(0, 100 - ((grade - 1) / 19) * 100));
};

export const roundToNdp = (num: number, dp: number): number => {
	const factor = Math.pow(10, dp);
	return Math.round((num + Number.EPSILON) * factor) / factor;
};

export const wordsCount = (text: string) => {
	if (text.trim() === '') return 0;
	text = text.replaceAll(/\s+/g, ' ');
	return text.split(' ').length;
};
export const sentencesCount = (text: string) => {
	if (text.trim() === '') return 0;

	const regex = /\b(Mr|Mrs|Ms|Dr|Prof)\.|(\b\w\.)+/g;

	// Replace matched patterns
	const cleanedText = text.replace(regex, (match, p1) => {
		if (p1) {
			// If it's a title, remove the dot
			return p1;
		} else {
			// If it's a sequence of single characters separated by dots, remove all dots
			return match.replace(/\./g, '');
		}
	});
	const sentenceRegex = /\S.*?(?:[.!?](?=\s|$)|$)/g;
	const sentences = cleanedText.match(sentenceRegex);
	return sentences ? sentences.length : 1;
};
export const charactersCount = (text: string) => {
	return (text.match(/[a-zA-Z0-9]/g) || []).length;
};

export const ariReadingEase = (text: string): number => {
	const words = wordsCount(text);
	const characters = charactersCount(text);
	const sentences = sentencesCount(text);
	let ari = 0;
	if (words != 0 && sentences != 0) {
		ari = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;
	}
	const readingEaseBounded = gradeToReadingEase(ari);
	return roundToNdp(readingEaseBounded, 2);
};
