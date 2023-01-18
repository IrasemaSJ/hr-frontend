import { EyeOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { Link } from 'react-router-dom';

/*--------------------------Table information------------------------- */
interface DataType {
  key: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  admission_date: string;
  seniority: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: '#',
    dataIndex: 'key',
    align: 'center',
  },
  {
    title: 'First name',
    dataIndex: 'first_name',
    align: 'center',
  },
  {
    title: 'Last name',
    dataIndex: 'last_name',
    align: 'center',
  },
  {
    title: 'Admission_date',
    dataIndex: 'admission_date',
    align: 'center',
  },
  {
    title: 'Seniority',
    dataIndex: 'seniority',
    align: 'center',
  },
  {
    title: 'Actions',
    render: (_, record) => (
      <Link to={`./${record.key}`} style={{ fontSize: '20px' }}>
        <Button
          type="primary"
          shape="circle"
          icon={<EyeOutlined />}
          style={{ background: 'gray', margin: '2px' }}
        />
      </Link>
    ),

    align: 'center',
  },
];

const data: DataType[] = [
  {
    key: '1',
    employee_id: '1',
    first_name: 'Martin Salvador',
    last_name: 'Gaytan Lugo',
    admission_date: '08 feb 2022',
    seniority: '11 months',
  },
  {
    key: '2',
    employee_id: '2',
    first_name: 'Carlos Javier',
    last_name: 'Diaz Flores',
    admission_date: '08 feb 2022',
    seniority: '11 months',
  },
  {
    key: '3',
    employee_id: '3',
    first_name: 'Adrian',
    last_name: 'Garcia Saaib',
    admission_date: '08 feb 2022',
    seniority: '11 months',
  },
  {
    key: '4',
    employee_id: '4',
    first_name: 'Irasema Mayte',
    last_name: 'Serrano Jimenez',
    admission_date: '08 feb 2022',
    seniority: '11 months',
  },
  {
    key: '5',
    employee_id: '5',
    first_name: 'Hector Ivan',
    last_name: 'Yboa Espinoza',
    admission_date: '08 feb 2022',
    seniority: '11 months',
  },
];

/*--------------------------Table information------------------------- */

const onSearch = (value: string) => console.log(value);
const { Search } = Input;

export const Employees = () => {
  return (
    <>
      <h1>Improving employees</h1>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        size="large"
        style={{ marginBottom: '20px', marginTop: '20px' }}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
};
