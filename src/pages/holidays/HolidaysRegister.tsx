import { useEffect, useState } from 'react';
import { Loader } from '../../components';
import ApiHR from '../../api/ApiHR';
import {
  Button,
  DatePickerProps,
  Form,
  Modal,
  notification,
  Table,
} from 'antd';
import { useHandleError } from '../../hooks';
import { generateRegisterColumns } from './table-design-holidays/registerColums';
import { CatalogueHolidays } from '../../api/interfaces/';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../navigation/Navigation';

export interface ParamsHolidays {
  name: string;
  values: DatePickerProps['onChange'];
}

export const HolidaysRegister = () => {
  const navigate: (
    url: Routes[keyof Routes],
    state?: { state: { message: string } },
  ) => void = useNavigate();
  const [cataloguesRows, setCataloguesRows] = useState(
    [] as CatalogueHolidays[],
  );
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoadingRequest, setIsLoadingRequest] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  const year = pathname.split('/')[3];

  const [form, setForm] = useState({ holidays: [], year: +year } as {
    holidays: { id_holiday: string; date: string }[];
    year: number;
  });

  const setCurrentHolidays = (dateString: string, id_holiday: string) => {
    setForm({
      holidays: [
        ...form.holidays.filter((holiday) => holiday.id_holiday !== id_holiday),
        { id_holiday, date: dateString },
      ],
      year: +year,
    });
  };

  //notifications
  const [api, contextHolder] = notification.useNotification();
  const { setServerError } = useHandleError(api);

  useEffect(() => {
    getHolidays();
  }, []);

  const getHolidays = async () => {
    try {
      setIsLoadingTable(true);
      const cataloguesHttp = await ApiHR.get('/holidays/catalogue-active');
      setCataloguesRows(cataloguesHttp.data);
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };

  const addHolidaysByYear = async () => {
    try {
      setIsLoadingRequest(true);
      await ApiHR.post('/holidays/current', form);
      setIsLoadingRequest(false);
      navigate('/holidays', {
        state: { message: 'holidays saved successfuly' },
      });
    } catch (error: any) {
      setIsLoadingRequest(false);
      setServerError(error);
    }
  };

  return (
    <>
      {contextHolder}
      <Loader show={isLoadingRequest} />
      <h1>Register Holidays</h1>
      <Form onFinish={addHolidaysByYear} autoComplete="off">
        <div>
          <Table
            loading={isLoadingTable}
            columns={[...generateRegisterColumns(setCurrentHolidays)]}
            dataSource={cataloguesRows}
            rowKey="_id"
            style={{ marginTop: '20px' }}
            pagination={{ hideOnSinglePage: true }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: '15px',
          }}
        >
          <Button type="primary" onClick={() => setIsOpen(true)}>Save</Button>
        </div>
      </Form>

      <Modal
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
        }}
        title={`Are you sure to save holidays for year ${year} ?`}
        okText="Save"
        onOk={() => {
          addHolidaysByYear();
          setIsOpen(false);
        }}
        cancelButtonProps={{ style: { display: 'none' } }}
      ></Modal>
    </>
  );
};
