import { DatePicker, DatePickerProps } from 'antd';
import { format } from '../../helpers';
import { disabledDate } from '../../helpers/formatDate';
// import * as dayjs from 'dayjs';

// se hizo para facilitar los atributos obtenidos por el componente padre
// extiende de DatePickerProps y agrega nuevos params
type Props = DatePickerProps & {
  disabledDates?: Array<string>;
  disableWeekends?: boolean;
  enabledYear?: number;
};

export const InputDatePicker: React.FC<Props> = ({
  disabledDates = [],
  disableWeekends = false,
  enabledYear = undefined,
  ...args
}: Props) => {
  // Crea una fecha con el primer día del año especificado
  // const defaultDate = enabledYear
  //   ? dayjs().year(enabledYear).startOf('year')
  //   : undefined;
  // enabledYear && console.log('enabledYear', enabledYear);
  return (
    <DatePicker
      style={{ width: '100%' }}
      format={format.input}
      disabledDate={(current) =>
        disabledDate(current, {
          disabledDates,
          disableWeekends,
          enabledYear,
        })
      }
      // defaultValue={defaultDate}
      {...args}
    />
  );
};
