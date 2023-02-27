import { DatePicker, DatePickerProps } from 'antd';
import { format } from '../../helpers';
import { disabledDate } from '../../helpers/formatDate';

// se hizo para facilitar los atributos obtenidos por el componente padre
// extiende de DatePickerProps y agrega nuevos params
type Props = DatePickerProps & {
  disabledDates?: Array<string>;
  disableWeekends?: boolean;
};

export const InputDatePicker: React.FC<Props> = ({
  disabledDates = [],
  disableWeekends = false,
  ...args
}: Props) => {
  return (
    <DatePicker
      style={{ width: '100%' }}
      format={format.input}
      disabledDate={(current) =>
        disabledDate(current, { disabledDates, disableWeekends })
      }
      {...args}
    />
  );
};
