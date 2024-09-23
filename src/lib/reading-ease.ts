const gradeToReadingEase = (grade: number): number => {
	const easy = 100;
	const hard = 0;
	const normalizedGrade = (grade - 1) / 19;
	const ease = easy - normalizedGrade * (easy - hard);
	return Math.min(easy, Math.max(hard, ease));
};

const roundToNdp = (num: number, dp: number): number => {
	const factor = Math.pow(10, dp);
	return Math.round((num + Number.EPSILON) * factor) / factor;
};

export const gradeToRoundedReadingEase = (grade: number): number => {
	return roundToNdp(gradeToReadingEase(grade), 2);
};

export const wordsCount = (text: string) => {
	const trimmed = text.trim();
	if (trimmed === '') return 0;
	const cleanedText = trimmed.replace(/\s+/g, ' ');
	return cleanedText.split(' ').length;
};
export const sentencesCount = (text: string) => {
	const trimmed = text.trim();
	if (trimmed === '') return 0;

	const titleRegex = /\b(Mr|Mrs|Ms|Dr|Prof)\.|(\b\w\.)+/g;
	const cleanedText = trimmed.replace(titleRegex, (match, p1) => {
		return p1 ? p1 : match.replace(/\./g, '');
	});

	const sentenceRegex = /\S.*?(?:[.!?](?=\s|$)|$)/g;
	const sentences = cleanedText.match(sentenceRegex);
	return sentences ? sentences.length : 0;
};
export const charactersCount = (text: string) => {
	return text.match(/\p{L}|[0-9]/gu)?.length || 0;
};

export const ariReadingEase = (text: string): number => {
	const words = wordsCount(text);
	const characters = charactersCount(text);
	const sentences = sentencesCount(text);
	if (words === 0 || sentences === 0) return gradeToRoundedReadingEase(1);

	const ari = 4.71 * (characters / words) + 0.5 * (words / sentences) - 21.43;

	return gradeToRoundedReadingEase(ari);
};
