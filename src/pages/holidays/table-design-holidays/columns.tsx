import { Checkbox, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { CatalogueHolidays } from '../../../api/interfaces/holidays/catalogue-holidays.interface';
import { BtnTable } from '../../../components';

interface Props {
  toggleActivate: (id: string) => Promise<void>;
  edit?: (data: CatalogueHolidays) => void;
}
export const generateColumns = ({ toggleActivate, edit }: Props) => {
  const holidaysColumns: ColumnsType<CatalogueHolidays> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (name: string, record) => (
        <Typography.Text disabled={!record.isActive} delete={!record.isActive}>
          {name.toUpperCase()}
        </Typography.Text>
      ),
    },
    {
      title: 'Edit',
      render: (_, record) => (
        <BtnTable
          action="edit"
          onClick={() => {
            edit && edit(record);
          }}
        />
      ),
    },
    {
      title: 'Active',
      dataIndex: '_id',
      render: (id: string, record) => (
        <Checkbox
          checked={record.isActive}
          onClick={() => {
            toggleActivate(id);
          }}
        />
      ),
    },
  ];
  return holidaysColumns;
};
