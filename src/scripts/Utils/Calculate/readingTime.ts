export function getWordCount(text: string): number {
  return text.split(/\s+/).length;
}

export function getReadingTime(text: string): number {
  const words = getWordCount(text);
  const averageWordsPerMinute = 200;
  return Math.ceil(words / averageWordsPerMinute);
}
