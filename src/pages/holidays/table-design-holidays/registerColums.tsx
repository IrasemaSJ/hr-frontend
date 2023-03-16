import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CatalogueHolidays } from '../../../api/interfaces/holidays/catalogue-holidays.interface';
import { InputDatePicker } from '../../../components/inputs';
import { DateObject } from '../../../helpers/formatDate';

export const generateRegisterColumns = (
  setCurrentHolidays: (dateString: string, id_holiday: string) => void,
  year?: number,
) => {
  const registerColumns: ColumnsType<CatalogueHolidays> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string) => (
        <Typography.Text>{name.toUpperCase()}</Typography.Text>
      ),
    },
    {
      title: 'Date',
      render: (_, record) => {
        return (
          <InputDatePicker
            onChange={(_: DateObject | null, dateString: string) =>
              setCurrentHolidays(dateString, record._id)
            }
            disableWeekends
            showNow
            enabledYear={year}
          />
        );
      },
    },
  ];
  return registerColumns;
};
