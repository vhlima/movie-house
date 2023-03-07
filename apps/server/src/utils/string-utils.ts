export function checkStringForValidPositiveNumber(valid: string) {
  const validPositiveNumberRegex = /^\d+(\.\d{1,2})?$/;

  return validPositiveNumberRegex.test(valid);
}

export function convertStringToRegularPattern(value: string) {
  return value
    .split('-')
    .map(word => word[0].toUpperCase() + word.substring(1, word.length))
    .join(' ');
}
