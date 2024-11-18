export function parseDate(date) {
  const parsedDate = new Date(date);
  return `${parsedDate.getUTCDate()}.${parsedDate.getUTCMonth() + 1}.${parsedDate.getUTCFullYear()}`;
}