import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { useHandleError } from './useHandleError';
import { ContingenciesTmHttp, ContingencyHttp } from '../api/interfaces';
import ApiHR from '../api/ApiHR';

export interface SetParams {
  record: ContingencyHttp;
  openModal: (param: boolean) => void;
}

const initContingency = {
  _id: '',
  folio: '',
  date: '',
  half_day: false,
  comments: '',
};

export const useRequestPage = () => {
  //load data when component redenrize
  useEffect(() => {
    getContingenciesByPage();
  }, []);

  //table variables
  const [total, setTotal] = useState(0);
  const [isLoadingTable, setIsLoadingTable] = useState(false); // show load table
  const [contingencyRows, setContingencyRows] = useState<ContingencyHttp[]>([]);

  //modal variables
  const [isLoadingRequest, setIsLoadingRequest] = useState(false); // show reject or aprove loader
  const [modalReject, setModalReject] = useState(false);
  const [modalAprove, setModalAprove] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  //data to set folio and id to aprove or reject
  const [contingency, setContingency] = useState(
    initContingency as ContingencyHttp,
  );

  //notifications
  //success messages
  const [api, contextHolder] = notification.useNotification();
  //server errors
  const { setServerError } = useHandleError(api);

  //function to show message from back-end
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

  const getContingenciesByPage = async (page?: number) => {
    try {
      setIsLoadingTable(true);
      const { data } = await ApiHR<ContingenciesTmHttp>(
        `/contingencies-tm/requests?page=${page ?? 1}`,
      );
      setContingencyRows(data.docs);
      setTotal(data.totalDocs);
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };

  const updateContingencyStatus = async (data?: { observations: string }) => {
    try {
      const query = data
        ? { status: 'rejected', ...data }
        : { status: 'approved' };
      setIsLoadingRequest(true);
      await ApiHR.patch(
        `/contingencies-tm/requests/update-status/${contingency._id}`,
        query,
      );
      setIsLoadingRequest(false); //show the loader
      getContingenciesByPage(); // refresh the table
      // close modal and show notification
      if (data) {
        setModalReject(false);
        openNotification('top', 'Contingency rejected');
      } else {
        setModalAprove(false);
        openNotification('top', 'Contingency approved');
      }
    } catch (error: any) {
      setIsLoadingRequest(false);
      setServerError(error);
    }
  };

  const setParams = async ({ record, openModal }: SetParams) => {
    setContingency(record);
    openModal(true);
  };

  return {
    contingency,
    total,
    isLoadingTable,
    contingencyRows,
    isLoadingRequest,
    modalReject,
    modalAprove,
    modalInfo,
    setModalInfo,
    setModalReject,
    setModalAprove,
    getContingenciesByPage,
    updateContingencyStatus,
    setParams,
    contextHolder,
  };
};
