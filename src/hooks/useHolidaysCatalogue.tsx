import { Modal, notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useEffect, useState } from 'react';
import ApiHR from '../api/ApiHR';
import { useHandleError } from './useHandleError';
import { useModal } from './useModal';
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
export const useHolidaysCatalogue = () => {
  // table variables
  const [holidayRows, setHolidayRows] = useState<DataType[]>([]);
  const [isLoadingTable, setIsLoadingTable] = useState(false); // show load table

  // notifications variables
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

  // modal variables
  const [modal, modalContextHolder] = Modal.useModal();

  const getCatalogueHolydays = async () => {
    try {
      setIsLoadingTable(true);
      const { data } = await ApiHR(`/holidays/catalogue`);
      setIsLoadingTable(false);
      setHolidayRows(data);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };

  const createCatalogueHoliday = async (values: any) => {
    try {
      const { data } = await ApiHR.post(`/holidays/catalogue`, values);
      setHolidayRows([...holidayRows, data]);
    } catch (error: any) {
      setServerError(error);
    }
  };

  const toggleActivateCatalogueHoliday = async (id: string) => {
    try {
      const { data } = await ApiHR.delete(`/holidays/catalogue/${id}`);
      setHolidayRows(
        holidayRows.map((row: DataType) => (row._id === data._id ? data : row)),
      );
      openNotification('top', 'Holiday Catalogue Updated');
    } catch (error: any) {
      setServerError(error);
    }
  };

  const editCatalogueHoliday = async (id: string, values: any) => {
    try {
      const { data } = await ApiHR.patch(`/holidays/catalogue/${id}`, values);
      setHolidayRows(
        holidayRows.map((row: DataType) => (row._id === data._id ? data : row)),
      );
      openNotification('top', 'Holiday Catalogue Updated');
    } catch (error: any) {
      setServerError(error);
    }
  };

  useEffect(() => {
    getCatalogueHolydays();
  }, []);

  return {
    getCatalogueHolydays,
    holidayRows,
    isLoadingTable,
    contextHolder,
    createCatalogueHoliday,
    toggleActivateCatalogueHoliday,
    editCatalogueHoliday,
    modal,
    modalContextHolder,
  };
};
