import { format, formatDistance } from 'date-fns';

export function formatDateDistance(dateISO: string) {
  return formatDistance(new Date(dateISO), Date.now(), {
    addSuffix: true,
  });
}

export const formatDate = (dateISO: string) =>
  format(new Date(dateISO), 'MMM dd, yyyy');

export const formatNumberToLargeScale = (num: number): string => {
  const units = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

  let decimal = 0;

  for (let i = units.length - 1; i >= 0; i -= 1) {
    decimal = 1000 ** (i + 1);

    if (num <= -decimal || num >= decimal) {
      return +(num / decimal).toFixed(1) + units[i];
    }
  }

  return String(num);
};
