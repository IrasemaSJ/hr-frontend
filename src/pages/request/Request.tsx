import { CheckOutlined } from '@ant-design/icons';
import { Badge, Button, Table, Tabs, theme } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'antd/es/typography/Link';
import { useModal } from '../../hooks';

/*--------------------------Table information------------------------- */
interface DataType {
  key: string;
  folio: string;
  initial_date: string;
  days_requested: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Folio',
    dataIndex: 'folio',
    key: '1',
    render: (folio) => <Link onClick={() => console.log(folio)}>{folio}</Link>,
    align: 'center',
  },
  {
    title: 'Initial date',
    dataIndex: 'initial_date',
    key: '3',
    align: 'center',
  },
  {
    title: 'Days requested',
    dataIndex: 'days_requested',
    key: '4',
    align: 'center',
  },
  {
    title: 'Actions',
    dataIndex: ['key', 'status'],
    render: () => (
      <>
        <Button
          type="primary"
          shape="circle"
          icon={<CheckOutlined />}
          style={{ background: 'green', margin: '2px' }}
        />
        <Button
          type="primary"
          shape="circle"
          icon={'X'}
          style={{ background: 'red', margin: '2px' }}
        />
      </>
    ),

    align: 'center',
  },
];

const data: DataType[] = [
  {
    key: '1',
    folio: 'VAC-2023117-01',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '2',
    folio: 'VAC-2023117-02',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '3',
    folio: 'VAC-2023117-03',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '4',
    folio: 'VAC-2023117-04',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '5',
    folio: 'VAC-2023117-05',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
];
/*--------------------------Table information------------------------- */

export const Request = () => {
  return (
    <>
      <h1>Pending Request</h1>
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ height: 220, marginTop: '20px' }}
        items={[
          {
            label: (
              <Badge status="processing" count={data.length}>
                <div style={{ padding: '5px' }}>Vacations</div>
              </Badge>
            ),
            key: '1',
            children: <Table columns={columns} dataSource={data} />,
          },
          {
            label: (
              <Badge status="warning" count={0}>
                <div style={{ padding: '5px' }}>Contingency</div>
              </Badge>
            ),
            key: '2',
            children: '',
          },
          {
            label: (
              <Badge status="warning" count={0}>
                <div style={{ padding: '5px' }}>Time by Time</div>
              </Badge>
            ),
            key: '3',
            children: `Content of tab`,
          },
        ]}
      />
    </>
  );
};
