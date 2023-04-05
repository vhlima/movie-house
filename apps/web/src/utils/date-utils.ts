import { format, formatDistance, parseISO as parseIsoDateFns } from 'date-fns';

export function formatDateDistance(dateISO: string): string {
  return formatDistance(new Date(dateISO), Date.now(), {
    addSuffix: true,
  });
}

export function formatDateDistanceFromMillis(millis: number): string {
  return formatDateDistance(new Date(millis).toISOString());
}

export const formatDate = (dateISO: string, stringFormat?: string): string =>
  format(new Date(dateISO), !stringFormat ? 'MMM dd, yyyy' : stringFormat);

export function formatDateFromMillis(millis: number): string {
  return formatDate(new Date(millis).toISOString());
}

export function parseISO(dateString: string): Date {
  return parseIsoDateFns(dateString);
}

export function formatMintutesToHoursAndMinutes(totalMinutes: number) {
  const minutes = totalMinutes % 60;

  const hours = Math.floor(totalMinutes / 60);

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}
