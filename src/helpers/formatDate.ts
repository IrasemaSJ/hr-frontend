import * as dayjs from 'dayjs';

export const format = {
  table: 'ddd, DD MMM YYYY',
  input: 'DD MMM YYYY',
  post: 'YYYY-MM-DD',
};

// date format to show in tables
export const formatTableDate = (date: string | dayjs.Dayjs) => {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  return date.toString().substring(0, 16);
};

// date format to set in api requests
export const formatDateApi = (date: string | dayjs.Dayjs) => {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  return date.format(format.post);
};

// date format to set in input dates

export const formatDateInput = (date: string) => {
  // console.log(date.substring(0, 10));
  const onlyDate = date.substring(0, 10);
  return dayjs(onlyDate);
};
