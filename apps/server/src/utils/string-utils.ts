export function checkStringForValidPositiveNumber(valid: string) {
  const validPositiveNumberRegex = /^\d+(\.\d{1,2})?$/;

  return validPositiveNumberRegex.test(valid);
}
