import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { NotificationPlacement } from 'antd/es/notification/interface';
import ApiHR from '../api/ApiHR';
import { ProjectResponsiblesHttp } from '../api/interfaces';
import { useHandleError } from './useHandleError';
import { ModalDelete } from '../components/modals/ModalDelete';

export const useProjectResponsibles = () => {
  const [projectResponsible, setProjectResponsible] = useState(
    {} as ProjectResponsiblesHttp,
  );
  const [projectResponsibleRows, setProjectResponsibleRows] = useState(
    [] as ProjectResponsiblesHttp[],
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
    getProjectResponsible();
  }, []);

  const getProjectResponsible = async () => {
    try {
      setIsLoadingTable(true);
      const projectResponsibleUserHttp = await ApiHR.get(
        '/project-responsables',
      );
      setProjectResponsibleRows(projectResponsibleUserHttp.data);
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };

  const createProjectResponsible = async (values: any) => {
    try {
      setIsLoading(true);
      const projectResponsibleUserHttp = await ApiHR.post(
        '/project-responsables',
        values,
      );
      setProjectResponsibleRows([
        ...projectResponsibleRows,
        projectResponsibleUserHttp.data,
      ]);
      setIsLoading(false);
      openNotification('top', 'Person added');
    } catch (error: any) {
      setIsLoading(false);
      setServerError(error);
    }
  };

  const deleteProjectResponsible = async () => {
    try {
      setIsLoading(true);
      await ApiHR.delete(`/project-responsables/${projectResponsible._id}`);
      setProjectResponsibleRows([
        ...projectResponsibleRows.filter(
          (el) => el._id !== projectResponsible._id,
        ),
      ]);
      setIsLoading(false);
      setModalDelete(false);
      openNotification('top', 'person removed');
    } catch (error: any) {
      setIsLoading(false);
      setServerError(error);
    }
  };

  const setParams = (values: ProjectResponsiblesHttp) => {
    setProjectResponsible(values);
    setModalDelete(true);
  };

  return {
    projectResponsibleRows,
    projectResponsible,
    isLoadingTable,
    ModalDelete,
    contextHolder,
    setServerError,
    isLoading,
    setParams,
    modalDelete,
    setModalDelete,
    deleteProjectResponsible,
    createProjectResponsible,
  };
};
