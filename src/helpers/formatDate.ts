import * as dayjs from 'dayjs';

export const format = {
  table: 'ddd, DD MMM YYYY',
  input: 'DD MMM YYYY',
  post: 'YYYY-MM-DD',
};

export const formatTableDate = (date: string | dayjs.Dayjs) => {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  return date.format(format.table);
};
