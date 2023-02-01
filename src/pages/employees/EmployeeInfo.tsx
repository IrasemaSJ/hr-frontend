import { CheckOutlined } from '@ant-design/icons';
import { Button, Tabs, Tag } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import Link from 'antd/es/typography/Link';
import {
  HeaderEmployeeInfo,
  RejectActionButton,
  Stepper,
} from '../../components';
import { SectionEmployeeInfo } from '../../components/section-employee-info/SectionEmployeeInfo';
import { useModal } from '../../hooks';
import './EmployeeInfo.css';
import { TableContingency } from '../../components/table/TableContingency';
/**------------------   datos tabla ------------------------------*/
interface DataType {
  key: string;
  folio: string;
  status: string;
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
    title: 'Status',
    dataIndex: 'status',
    key: '2',
    render: (status) =>
      status === 'approved' ? (
        <Tag color="green"> {status} </Tag>
      ) : status === 'rejected' ? (
        <Tag color="red"> {status} </Tag>
      ) : status === 'pending' ? (
        <Tag color="yellow"> {status} </Tag>
      ) : (
        <Tag color="black"> {status} </Tag>
      ),
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
    render: (_, record) =>
      record.status === 'pending' ? (
        <>
          <Button
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            style={{ background: 'green', margin: '2px' }}
          />
          <RejectActionButton />
        </>
      ) : record.status === 'approved' ? (
        <Button
          type="primary"
          shape="circle"
          icon="🗑"
          style={{ background: 'orange', margin: '2px' }}
        />
      ) : (
        <></>
      ),
    align: 'center',
  },
];

const data: DataType[] = [
  {
    key: '1',
    folio: 'VAC-2023117-01',
    status: 'pending',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '2',
    folio: 'VAC-2023117-02',
    status: 'rejected',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '3',
    folio: 'VAC-2023117-03',
    status: 'approved',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '4',
    folio: 'VAC-2023117-04',
    status: 'cancelled',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
  {
    key: '5',
    folio: 'VAC-2023117-05',
    status: 'cancelled',
    initial_date: '25 jul 2022',
    days_requested: '2 days',
  },
];

/**------------------   datos tabla ------------------------------*/

export const EmployeeInfo = () => {
  const { ModalWrapper, openModal, closeModal } = useModal();

  return (
    <>
      <HeaderEmployeeInfo
        name="adrian garcia saaib"
        job="software especialist"
        seniority="2 years, 4 months"
        admission_date="08 feb 2022"
      />
      {/* TODO:check day avaliables responsive container */}
      <SectionEmployeeInfo
        vacation={7}
        contingency={3}
        incapacity={2}
        time_by_time={1}
        bereavement={0}
        marriage={0}
        pregnancy={0}
        no_paid={0}
        onClick={openModal}
      />
      {/* Modal that does vacation request! */}
      <ModalWrapper width={1000}>
        <Stepper closeModal={closeModal} />
      </ModalWrapper>
      <Tabs
        defaultActiveKey="1"
        tabPosition={'top'}
        style={{ height: 220, marginTop: '20px' }}
        items={[
          {
            label: `Vacations`,
            key: '1',
            children: <Table columns={columns} dataSource={data} />,
          },
          {
            label: `Contingency`,
            key: '2',
            children: <TableContingency />,
          },
          {
            label: `Time by Time`,
            key: '3',
            children: `Content of tab`,
          },
        ]}
      />
    </>
  );
};
