import { Button, notification, Table, Tabs } from 'antd';
import {
  HeaderEmployeeInfo,
  Loader,
  ModalOpenRequest,
  Stepper,
} from '../../components';
import { SectionEmployeeInfo } from '../../components/section-employee-info/SectionEmployeeInfo';
import { useModal } from '../../hooks';
import './EmployeeInfo.css';
import { columnsContigencyEmployeeInfo } from './table-designs/contingency-employeeinfo';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import {
  ContingenciesTmHttp,
  ContingencyHttp,
} from '../../api/interfaces/contingency.interfaces';
import ApiHR from '../../api/ApiHR';
import { useHandleError } from '../../hooks/useHandleError';
import { NotificationPlacement } from 'antd/es/notification/interface';
import Link from 'antd/es/typography/Link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ModalEdit } from '../../components/modals/ModalEdit';
import { ModalDelete } from '../../components/modals/ModalDelete';
import { ModalInfo } from '../../components/modals/ModalInfo';
import * as dayjs from 'dayjs';
import { formatDateApi, formatTableDate } from '../../helpers';

export interface SubmitValues {
  date: dayjs.Dayjs;
  half_day?: boolean;
  comments?: string;
}

export const EmployeeInfo = () => {
  const { ModalWrapper, openModal, closeModal } = useModal();
  //context info
  const { user } = useContext(AuthContext);

  //table variables
  const [total, setTotal] = useState(0);
  const [isLoadingTable, setIsLoadingTable] = useState(false); // show load table
  const [contingencyRows, setContingencyRows] = useState<ContingencyHttp[]>([]);

  //modal variables
  const [isLoadingRequest, setIsLoadingRequest] = useState(false); // show reject or aprove loader
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [modalOpenRequest, setModalOpenRequest] = useState(false);
  const [folio, setFolio] = useState<string>(''); // created folio

  //data to set folio and id to aprove or reject
  const [contingency, setContingency] = useState<ContingencyHttp>({
    _id: '',
    folio: '',
    id_employee: 0,
    name_employee: '',
    date: '',
    half_day: false,
    status: '',
    comments: '',
    observations: '',
    id_tm: 0,
    createdAt: '',
    updatedAt: '',
    __v: 0,
  });

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
    getContingenciesByPage();
  }, []);

  const createContingency = async (data: SubmitValues) => {
    try {
      const submitValues = {
        half_day: data.half_day,
        comments: data.comments,
        date: formatDateApi(data.date),
      };
      console.log(submitValues);
      setIsLoadingRequest(true);
      const res = await ApiHR.post('/contingencies', submitValues);
      setIsLoadingRequest(false);
      getContingenciesByPage(1);
      setFolio(res.data.folio);
      if (res.data.folio) {
        return true;
      }
    } catch (error: any) {
      setIsLoadingRequest(false);
      setServerError(error);
      return false;
    }
  };

  const getContingenciesByPage = async (page?: number) => {
    try {
      setIsLoadingTable(true);
      const { data } = await ApiHR<ContingenciesTmHttp>(
        `/contingencies?page=${page ?? 1}`,
      );
      setContingencyRows(data.docs);
      setTotal(data.totalDocs);
      setIsLoadingTable(false);
    } catch (error: any) {
      setIsLoadingTable(false);
      setServerError(error);
    }
  };

  const updateContingency = async (values: any) => {
    try {
      setIsLoadingRequest(true);
      await ApiHR.patch(`contingencies/${contingency._id}`, values);
      setIsLoadingRequest(false); //show the loader
      getContingenciesByPage(); // refresh the table
      setModalEdit(false);
      openNotification('top', 'Contingency updated');
    } catch (error: any) {
      setIsLoadingRequest(false);
      setServerError(error);
    }
  };

  const deleteContingency = async () => {
    try {
      setIsLoadingRequest(true);
      await ApiHR.delete(`contingencies/${contingency._id}`);
      setIsLoadingRequest(false); //show the loader
      getContingenciesByPage(); // refresh the table
      setModalDelete(false);
      openNotification('top', 'Contingency deleted');
    } catch (error: any) {
      setIsLoadingRequest(false);
      setServerError(error);
    }
  };

  const setParams = async ({
    record,
    openModal,
  }: {
    record: ContingencyHttp;
    openModal: (param: boolean) => void;
  }) => {
    console.log(record);
    setContingency(record);
    openModal(true);
  };

  return (
    <>
      <Loader show={isLoadingRequest} />
      {contextHolder}
      <HeaderEmployeeInfo
        name={user.name}
        job="Software Specialist"
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
        onClick={() => {
          setModalOpenRequest(true);
        }}
      />
      <Tabs
        defaultActiveKey="2"
        tabPosition={'top'}
        style={{ height: 220, marginTop: '20px' }}
        items={[
          {
            label: `Contingency`,
            key: '1',
            children: (
              <Table
                loading={isLoadingTable}
                columns={[
                  {
                    title: 'Folio',
                    dataIndex: 'folio',
                    key: '1',
                    render: (_, record) => (
                      <Link
                        onClick={() =>
                          setParams({ record, openModal: setModalInfo })
                        }
                      >
                        {record.folio}
                      </Link>
                    ),
                  },
                  ...columnsContigencyEmployeeInfo,
                  {
                    title: 'Actions',
                    dataIndex: 'actions',
                    render: (_, record) =>
                      record.status === 'pending' ||
                      record.status === 'rejected' ? (
                        <>
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<EditOutlined />}
                            style={{ background: 'green', margin: '2px' }}
                            onClick={() =>
                              setParams({
                                record,
                                openModal: setModalEdit,
                              })
                            }
                          />
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            style={{ background: 'red', margin: '2px' }}
                            onClick={() =>
                              setParams({
                                record,
                                openModal: setModalDelete,
                              })
                            }
                          />
                        </>
                      ) : (
                        <></>
                      ),
                    align: 'center',
                  },
                ]}
                rowKey={'_id'}
                dataSource={contingencyRows}
                pagination={{
                  pageSize: 5,
                  total,
                  onChange(page) {
                    getContingenciesByPage(page);
                  },
                  hideOnSinglePage: true,
                }}
              />
            ),
          },
        ]}
      />

      {/*--------------------------------------- Modals ---------------------------------*/}
      <ModalOpenRequest
        isModalOpen={modalOpenRequest}
        closeModal={() => setModalOpenRequest(false)}
        width={700}
        createContingency={createContingency}
        folio={folio}
      />

      <ModalEdit
        update={updateContingency}
        record={contingency}
        isModalOpen={modalEdit}
        closeModal={() => setModalEdit(false)}
      />

      <ModalDelete
        deleteContingecy={deleteContingency}
        folio={contingency.folio}
        isModalOpen={modalDelete}
        closeModal={() => setModalDelete(false)}
      />

      <ModalInfo
        employee
        record={contingency}
        isModalOpen={modalInfo}
        closeModal={() => setModalInfo(false)}
      />
    </>
  );
};
