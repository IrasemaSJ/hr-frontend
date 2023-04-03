import { Table, Tabs } from 'antd';
import { HeaderEmployeeInfo, Loader, ModalOpenRequest } from '../../components';
import { SectionEmployeeInfo } from '../../components/section-employee-info/SectionEmployeeInfo';
import { useContingency } from '../../hooks';
import './EmployeeInfo.css';
import { columnsContigencyEmployeeInfo } from './table-designs-employeeinfo/contingency-employeeinfo';
import { useContext, useEffect, useState } from 'react';
import { ModalEdit, ModalDelete, ModalInfo } from '../../components/modals';
import { useLocation } from 'react-router-dom';
import { firstColumn, lastColumn } from './table-designs-employeeinfo';
import { AuthContext } from '../../contexts/AuthContext';

export const EmployeeInfo = () => {
  //context info
  const { user } = useContext(AuthContext);

  //get the path and the employee id
  const { pathname } = useLocation();
  const [employee_id, setEmployee_id] = useState(pathname.split('/')[2] || '');
  useEffect(() => {
    if (pathname.split('/').length === 3) {
      setEmployee_id(pathname.split('/')[2]);
    } else {
      setEmployee_id('');
    }
  }, [pathname]);

  const {
    folio,
    total, //total of rows
    contingency, //contingency information selected
    contingencyRows, // data of contingency
    isLoadingTable, //loader for table (get information)
    isLoadingRequest, // loader for another request (create,update,delete)
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
    setParams, //set the contingency info
    contextHolder, //information from server (feedback)
    disabledDates, //days that are going to be disables because they are aleady taken
    contingenciesCount, // amount of contingecies days taken
    action, // indicate if delete or cancel
    setAction,
  } = useContingency(employee_id);

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
        contingency={contingenciesCount}
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
                  ...firstColumn({ setParams, setModalInfo }),
                  ...columnsContigencyEmployeeInfo,
                  ...lastColumn({
                    setParams,
                    setModalEdit,
                    setModalDelete,
                    employee_id,
                    setAction,
                  }),
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
        disabledDates={disabledDates}
        contingenciesCount={contingenciesCount}
      />

      <ModalEdit
        contingenciesCount={contingenciesCount}
        disabledDates={disabledDates}
        update={updateContingency}
        record={contingency}
        isModalOpen={modalEdit}
        closeModal={() => setModalEdit(false)}
      />

      <ModalDelete
        deleteFunction={deleteContingency}
        message={
          <>
            Are you sure to delete <b>{contingency.folio}</b>
          </>
        }
        isModalOpen={modalDelete}
        closeModal={() => setModalDelete(false)}
        action={action} // to indicate if is cancel or delete
        headerName={'Contingency'}
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
