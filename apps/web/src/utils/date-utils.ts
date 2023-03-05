import { format, formatDistance, parseISO as parseIsoDateFns } from 'date-fns';

export function formatDateDistance(dateISO: string): string {
  return formatDistance(new Date(dateISO), Date.now(), {
    addSuffix: true,
  });
}

export function formatDateDistanceFromMillis(millis: number): string {
  return formatDateDistance(new Date(millis).toISOString());
}

export const formatDate = (dateISO: string): string =>
  format(new Date(dateISO), 'MMM dd, yyyy');

export function formatDateFromMillis(millis: number): string {
  return formatDate(new Date(millis).toISOString());
}

export function parseISO(dateString: string): Date {
  return parseIsoDateFns(dateString);
}
