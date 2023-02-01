import * as dayjs from 'dayjs';
import * as weekday from 'dayjs/plugin/weekday';
import * as localeData from 'dayjs/plugin/localeData';
import * as updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);
dayjs.extend(localeData);
dayjs.extend(weekday);
// dayjs.updateLocale('en', {
//   monthsShort: [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ],
// });
export const formatTableDate = (date: string | dayjs.Dayjs) => {
  if (typeof date === 'string') {
    date = dayjs(date);
  }
  return date.format('ddd, DD MMM YYYY');
};
