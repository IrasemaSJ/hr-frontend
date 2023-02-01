import * as dayjs from 'dayjs';

export const formatTableDate = (date: string | dayjs.Dayjs) => {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  return date.format('ddd, DD MMM YYYY');
};
