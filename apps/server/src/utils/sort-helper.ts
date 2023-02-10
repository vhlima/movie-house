export function splitSortFilter(filter: string): string[] {
  return filter.split('+');
}

export function firstLettersUppercase(text: string): string {
  return text
    .trim()
    .split(' ')
    .map(word => word[0].toUpperCase() + word.substring(1, word.length))
    .join(' ');
}
