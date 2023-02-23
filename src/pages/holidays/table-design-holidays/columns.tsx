import { Tooltip, Checkbox, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { BtnTable } from '../../../components';

interface DataType {
  country: string;
  createdAt: string;
  id_tm: number;
  isActive: boolean;
  name: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
interface Props {
  toggleActivate: (id: string) => Promise<void>;
  edit?: (data: DataType) => void;
}
export const generateColumns = ({ toggleActivate, edit }: Props) => {
  const [name, actions]: ColumnsType<DataType> = [
    {
      title: 'Public holiday',
      dataIndex: 'name',
      render: (name: string, record) => (
        <Typography.Text disabled={!record.isActive} delete={!record.isActive}>
          {name.toUpperCase()}
        </Typography.Text>
      ),
      key: 'name',
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      align: 'center',
      render: (id: string, record) => {
        return (
          <>
            <Checkbox
              checked={record.isActive}
              onClick={() => {
                toggleActivate(id);
              }}
            />
            {/* </Tooltip> */}
            <BtnTable
              action="edit"
              onClick={() => {
                edit && edit(record);
              }}
            />
          </>
        );
      },
    },
  ];
  return { name, actions };
};
