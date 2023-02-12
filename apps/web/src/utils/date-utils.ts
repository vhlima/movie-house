import { format, formatDistance } from 'date-fns';

export function formatDateDistance(dateISO: string) {
  return formatDistance(new Date(dateISO), Date.now(), {
    addSuffix: true,
  });
}

export const formatDate = (dateISO: string) =>
  format(new Date(dateISO), 'MMM dd, yyyy');
