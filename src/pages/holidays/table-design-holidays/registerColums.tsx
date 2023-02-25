import { Typography, DatePicker } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CatalogueHolidays } from '../../../api/interfaces/holidays/catalogue-holidays.interface';

export const generateRegisterColumns = (
  setCurrentHolidays: (dateString: string, id_holiday: string) => void,
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
      render: (_, record) => (
        <DatePicker
          onChange={(date, dateString) =>
            setCurrentHolidays(dateString, record._id)
          }
        />
      ),
    },
  ];
  return registerColumns;
};
