import dayjs, { Dayjs } from 'dayjs';

export const format = {
  table: 'ddd, DD MMM YYYY',
  input: 'DD MMM YYYY',
  post: 'YYYY-MM-DD',
};

// date format to show in tables
export const formatTableDate = (date: string | Dayjs) => {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  return date.toString().substring(0, 16);
};

// date format to set in api requests
export const formatDateApi = (date: string | Dayjs) => {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  return date.format(format.post);
};

// date format to set in input dates
export const formatDateInput = (date: string) => {
  const onlyDate = date.substring(0, 10);
  return dayjs(onlyDate);
};

// transform date strings to dayjs format, to show in input date from ant.Design
export const toDateObject = (date: string) => {
  return dayjs(date);
};

// custom date type
export type DateObject = Dayjs;

// check if this string is a custum date type
export const isDateObject = (date: string) => dayjs.isDayjs(date);

interface DisableDateConfigProps {
  disableWeekends?: boolean;
  disabledDates?: string[];
}
/**
 * funcion que solo se deberia usar sobre el disabledDate de un DatePicker o de un RangePicker
 * @param date curren date: en un DatePicker es cada uno de los dias rendereados
 * @param config objeto con reglas predeterminadas para deshabilitar dias
 * @returns boolean, que determina si el dia esta disabled o enabled
 */
export const disabledDate = (
  date: Dayjs,
  { disableWeekends = false, disabledDates = [] }: DisableDateConfigProps,
) => {
  // Deshabilita los sábados y domingos
  if (disableWeekends && (date.day() === 0 || date.day() === 6)) {
    return true;
  }

  // Deshabilita las fechas específicas en el array "disabledDates"
  return disabledDates.some((disableDate) => {
    const cuttedDate = formatDateInput(disableDate);
    return cuttedDate.isSame(date, 'day');
  });
};
