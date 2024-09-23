import { wordsCount, sentencesCount, charactersCount } from './reading-ease';
import { describe, expect, test, it } from 'vitest';

describe('Text Analysis Functions', () => {
	describe('wordsCount', () => {
		it('should return 0 for empty string', () => {
			expect(wordsCount('')).toBe(0);
		});
		it('should return 1 for single word', () => {
			expect(wordsCount('one')).toBe(1);
		});
		it('should count abbreviations as one word', () => {
			expect(wordsCount('Mr.')).toBe(1);
			expect(wordsCount('N.A.S.A.')).toBe(1);
		});
		it('should count hyphenated words as one word', () => {
			expect(wordsCount('well-being')).toBe(1);
		});
		it('should count words separated by spaces', () => {
			expect(wordsCount('one two')).toBe(2);
		});
		it('should handle multiple spaces between words', () => {
			expect(wordsCount('one    two')).toBe(2);
		});
		it('should handle punctuation correctly', () => {
			expect(wordsCount('one, two!')).toBe(2);
		});
		it('should count numbers as words', () => {
			expect(wordsCount('123 456')).toBe(2);
		});
		it('should handle special characters', () => {
			expect(wordsCount('one@ !two')).toBe(2);
		});
		it('should return 0 for string with only spaces', () => {
			expect(wordsCount('     ')).toBe(0);
		});
		it('should handle mixed case words', () => {
			expect(wordsCount('One TWO')).toBe(2);
		});
		it('should handle non-ASCII characters', () => {
			expect(wordsCount('café')).toBe(1);
		});
	});
	describe('sentencesCount', () => {
		it('should return 0 for empty string', () => {
			expect(sentencesCount('')).toBe(0);
		});
		it('should return 1 for single sentence', () => {
			expect(sentencesCount('some words.')).toBe(1);
		});
		it('should return 1 for single sentence with no period', () => {
			expect(sentencesCount('some words')).toBe(1);
		});
		it('should return 1 for single sentence with multiple spaces', () => {
			expect(sentencesCount('some   words.')).toBe(1);
		});
		it('should return 1 for single sentence with multiple periods', () => {
			expect(sentencesCount('cliff hanger..')).toBe(1);
			expect(sentencesCount('cliff hanger...')).toBe(1);
		});
		it('should return 2 for two sentences', () => {
			expect(sentencesCount('some words. more words.')).toBe(2);
			expect(sentencesCount('some words. more words')).toBe(2);
		});
		it('should respect abbreviations', () => {
			expect(sentencesCount('Hello Mr. Smith.')).toBe(1);
			expect(sentencesCount('N.A.S.A. decided to shoot a L.A.S.E.R. into the moon.')).toBe(1);
		});
		it('should handle sentences ending with exclamation marks', () => {
			expect(sentencesCount('very excite!')).toBe(1);
		});
		it('should handle sentences ending with question marks', () => {
			expect(sentencesCount('very question?')).toBe(1);
		});
		it('should handle sentences with quotes', () => {
			expect(sentencesCount('"2b o not 2b" - Billy')).toBe(1);
		});
		it('should handle sentences with parentheses', () => {
			expect(sentencesCount('one (two).')).toBe(1);
		});
		it('should handle sentences with ellipses', () => {
			expect(sentencesCount('Wait... what?')).toBe(2);
		});
		it('should handle sentences with nested punctuation', () => {
			expect(sentencesCount('Hello (world)!')).toBe(1);
		});
	});
	describe('charactersCount', () => {
		it('should return 0 for empty string', () => {
			expect(charactersCount('')).toBe(0);
		});
		it('should count characters in a single word', () => {
			expect(charactersCount('single')).toBe(6);
		});
		it('should count characters in a sentence', () => {
			expect(charactersCount('full sentence.')).toBe(12);
		});
		it('should ignore spaces', () => {
			expect(charactersCount('full    sentence')).toBe(12);
		});
		it('should ignore punctuation', () => {
			expect(charactersCount('full @sentence')).toBe(12);
		});
		it('should ignore emojis characters', () => {
			expect(charactersCount('hey 🌍')).toBe(3);
		});
		it('should handle Unicode characters correctly', () => {
			expect(charactersCount('café')).toBe(4);
		});
		it('should handle number correctly', () => {
			expect(charactersCount('0123')).toBe(4);
		});
	});
});
