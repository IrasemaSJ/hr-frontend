import { Table } from 'antd';
import { PreauthorizationForm } from './PreauthorizationForm';
import { Loader } from '../../components';
import { PreauthorizationColums } from './table-design/PreauthorizationColumns';
import usePreauthorization from '../../hooks/usePreauthorization';
import { PreauthorizationAction } from './PreauthorizationAction';

export const Preauthorization = () => {
  const {
    preauthorizationRows,
    preauthorization,
    isLoadingTable,
    ModalDelete,
    contextHolder,
    isLoading,
    setParams,
    modalDelete,
    setModalDelete,
    deletePreauthorization,
    createPreauthorization,
  } = usePreauthorization();

  return (
    <>
      {contextHolder}
      <Loader show={isLoading} />
      <h1>Preauthorization</h1>
      <PreauthorizationForm
        handleSubmit={(values) => createPreauthorization(values)}
      />
      <Table
        loading={isLoadingTable}
        columns={PreauthorizationColums({ setParams })}
        dataSource={preauthorizationRows}
        rowKey="_id"
        style={{ marginTop: '20px' }}
        pagination={{ hideOnSinglePage: true }}
      />
      {/*--------------------- modal section ----------------*/}
      <ModalDelete
        message={
          <>
            Are you sure to delete <b>{preauthorization.name}</b>
          </>
        }
        deleteFunction={deletePreauthorization}
        isModalOpen={modalDelete}
        closeModal={() => setModalDelete(false)}
        action="Delete"
        headerName="Project User"
      />
      <PreauthorizationAction />
    </>
  );
};
