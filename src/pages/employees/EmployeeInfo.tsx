import { Button, Table, Tabs } from 'antd';
import {
  BtnTable,
  HeaderEmployeeInfo,
  Loader,
  ModalOpenRequest,
} from '../../components';
import { SectionEmployeeInfo } from '../../components/section-employee-info/SectionEmployeeInfo';
import { useContingency } from '../../hooks';
import './EmployeeInfo.css';
import { columnsContigencyEmployeeInfo } from './table-designs/contingency-employeeinfo';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Link from 'antd/es/typography/Link';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { ModalEdit } from '../../components/modals/ModalEdit';
import { ModalDelete } from '../../components/modals/ModalDelete';
import { ModalInfo } from '../../components/modals/ModalInfo';

export const EmployeeInfo = () => {
  //context info
  const { user } = useContext(AuthContext);

  const {
    folio,
    total,
    contingency,
    contingencyRows,
    isLoadingTable,
    isLoadingRequest,
    modalEdit,
    modalDelete,
    modalInfo,
    modalOpenRequest,
    setModalInfo,
    setModalEdit,
    setModalDelete,
    setModalOpenRequest,
    getContingenciesByPage,
    createContingency,
    updateContingency,
    deleteContingency,
    setParams,
    contextHolder,
  } = useContingency();

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
                          <BtnTable
                            action="edit"
                            onClick={() =>
                              setParams({
                                record,
                                openModal: setModalEdit,
                              })
                            }
                          />
                          <BtnTable
                            action="cancel"
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
