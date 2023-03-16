import Table, { ColumnsType } from 'antd/es/table';
import { MyButton } from '../../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../navigation/Navigation';
import { useEffect, useState } from 'react';
import { notification, Select, SelectProps } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { CurrentHolidays } from '../../api/interfaces';
import { useHandleError } from '../../hooks';
import ApiHR from '../../api/ApiHR';
import { formatTableDate } from '../../helpers/formatDate';

const columns: ColumnsType<CurrentHolidays> = [
  {
    title: '#',
    render: (_, record, index) => index + 1,
  },
  {
    title: 'name',
    dataIndex: 'holidays',
    render: (holidays) => holidays[0]?.name.toUpperCase(),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: (date) => formatTableDate(date),
  },
];

export const Holidays = () => {
  const today = new Date();
  const navigate: (url: Routes[keyof Routes]) => void = useNavigate();
  const [year, setYear] = useState<number>(today.getFullYear());
  const location = useLocation();
  const [holidaysRow, setHolidaysRow] = useState([] as CurrentHolidays[]);
  const [isLoadingTable, setIsLoadingTable] = useState(false);

  // get message
  const message = location?.state?.message;

  //notifications
  const [api, contextHolder] = notification.useNotification();
  const { setServerError } = useHandleError(api);
  const openNotification = (
    placement: NotificationPlacement,
    messages: string | string[],
  ) => {
    api.success({
      message: 'Successful Operation',
      description: messages,
      placement,
    });
  };

  useEffect(() => {
    if (message) {
      openNotification('top', message);
    }
  }, []);

  useEffect(() => {
    getCurrentHolidays();
  }, [year]);

  const handleChange = (year: number) => {
    setYear(year);
  };

  const getYears = (): SelectProps['options'] => {
    const initDate = 2023;
    const years = [];
    for (let index = initDate; index <= today.getFullYear() + 1; index++) {
      years.push({ value: index, label: index });
    }
    return years;
  };

  const options = getYears();

  const getCurrentHolidays = async () => {
    try {
      setIsLoadingTable(true);
      const holidaysHttp = await ApiHR.get(`/holidays/current/${year}`);
      setHolidaysRow(holidaysHttp.data);
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };
  return (
    <>
      {contextHolder}
      <h1>Official Holidays</h1>
      <div
        style={{
          display: 'flex',
          gap: 10,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <Select
          style={{ width: '10rem' }}
          size="middle"
          placeholder="Please select"
          defaultValue={year}
          options={options}
          onChange={handleChange}
        />
        <MyButton
          action="link"
          onClick={() => navigate(`/holidays/register/${year}`)}
        >
          Register
        </MyButton>
        <MyButton action="link" onClick={() => navigate('/holidays/catalogue')}>
          Catalogue
        </MyButton>
      </div>
      <Table
        loading={isLoadingTable}
        columns={columns}
        rowKey="_id"
        dataSource={holidaysRow}
        style={{ marginTop: '20px' }}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};
