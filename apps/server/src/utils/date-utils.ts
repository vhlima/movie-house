export function getStartAndEndOfYear(year: number): [Date, Date] {
  return [
    new Date(`${year}-01-01T00:00:00.000Z`),
    new Date(`${year}-12-31T23:59:59.999Z`),
  ];
}

export function getStartAndEndOfDecade(decade: number): [Date, Date] {
  return [
    new Date(`${decade}-01-01T00:00:00.000Z`),
    new Date(`${decade + 9}-12-31T23:59:59.999Z`),
  ];
}
