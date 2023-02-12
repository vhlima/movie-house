import { format, formatDistance } from 'date-fns';

export function formatDateDistance(dateISO: string): string {
  return formatDistance(new Date(dateISO), Date.now(), {
    addSuffix: true,
  });
}

export const formatDate = (dateISO: string): string =>
  format(new Date(dateISO), 'MMM dd, yyyy');

export function parseISO(dateString: string): Date {
  return parseISO(dateString);
}
