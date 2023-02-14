import { DatePicker } from 'antd';
import { format } from '../../helpers';
import { disabledDate } from '../../helpers/formatDate';

interface Props {
  disabledDates?: Array<string>;
  disableWeekends?: boolean;
  args?: any; // se hizo para facilitar los atributos obtenidos por el componente padre
}

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
