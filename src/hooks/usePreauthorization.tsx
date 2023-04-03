import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import ApiHR from '../api/ApiHR';
import { PreauthorizationHttp } from '../api/interfaces/preauthorizations/preauthorization.interface';
import { useHandleError } from './useHandleError';
import { ModalDelete } from '../components/modals/ModalDelete';

const usePreauthorization = () => {
  const [preauthorization, setPreauthorization] = useState(
    {} as PreauthorizationHttp,
  );
  const [preauthorizationRows, setPreauthorizationRows] = useState(
    [] as PreauthorizationHttp[],
  );
  const [isLoadingTable, setIsLoadingTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

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

  //notifications
  const [api, contextHolder] = notification.useNotification();
  const { setServerError } = useHandleError(api);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoadingTable(true);
      const preauthorizationUserHttp = await ApiHR.get('/preauthorizations');
      setPreauthorizationRows(preauthorizationUserHttp.data);
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };

  const createPreauthorization = async (values: any) => {
    try {
      setIsLoading(true);
      const preauthorizationUserHttp = await ApiHR.post(
        '/preauthorizations',
        values,
      );
      setPreauthorizationRows([
        ...preauthorizationRows,
        preauthorizationUserHttp.data,
      ]);
      setIsLoading(false);
      openNotification('top', 'user created');
    } catch (error: any) {
      setIsLoading(false);
      setServerError(error);
    }
  };

  const deletePreauthorization = async () => {
    try {
      console.log('hola');
      setIsLoading(true);
      const preauthorizationUserHttp = await ApiHR.delete(
        `/preauthorizations/${preauthorization._id}`,
      );
      setPreauthorizationRows([
        ...preauthorizationRows.filter((el) => el._id !== preauthorization._id),
      ]);
      setIsLoading(false);
      setModalDelete(false);
      openNotification('top', 'user deleted');
    } catch (error: any) {
      setIsLoading(false);
      setServerError(error);
    }
  };

  const setParams = (values: PreauthorizationHttp) => {
    setPreauthorization(values);
    setModalDelete(true);
  };

  return {
    preauthorizationRows,
    preauthorization,
    isLoadingTable,
    ModalDelete,
    contextHolder,
    setServerError,
    isLoading,
    setParams,
    modalDelete,
    setModalDelete,
    deletePreauthorization,
    createPreauthorization,

  };
};

export default usePreauthorization;
