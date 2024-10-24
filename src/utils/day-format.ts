import dayjs from "dayjs";

export function formatDate(date: string | Date, format: string = 'DD/MM/YYYY'): string {
  if(!date) return '';
  return dayjs(date).format(format);
}