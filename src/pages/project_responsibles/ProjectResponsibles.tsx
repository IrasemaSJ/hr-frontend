import { Table } from 'antd';
import { Loader } from '../../components';
import { ProjectResponsibleColums } from './table-design/ProjectResponsibleColumns';
import { ProjectResponsiblesForm } from './ProjectResponsiblesForm';
import { useProjectResponsibles } from '../../hooks';

export const ProjectResponsibles = () => {
  const {
    projectResponsible,
    projectResponsibleRows,
    isLoadingTable,
    ModalDelete,
    contextHolder,
    isLoading,
    setParams,
    modalDelete,
    setModalDelete,
    deleteProjectResponsible,
    createProjectResponsible,
  } = useProjectResponsibles();

  return (
    <>
      {contextHolder}
      <Loader show={isLoading} />
      <h1>Preauthorization</h1>
      <ProjectResponsiblesForm
        handleSubmit={(values) => createProjectResponsible(values)}
      />
      <Table
        loading={isLoadingTable}
        columns={ProjectResponsibleColums({ setParams })}
        dataSource={projectResponsibleRows}
        rowKey="_id"
        style={{ marginTop: '20px' }}
        pagination={{ hideOnSinglePage: true }}
      />
      {/*--------------------- modal section ----------------*/}
      <ModalDelete
        message={
          <>
            Are you sure to delete <b>{projectResponsible.name_responsible}</b>
          </>
        }
        deleteFunction={deleteProjectResponsible}
        isModalOpen={modalDelete}
        closeModal={() => setModalDelete(false)}
        action="Delete"
        headerName="Project User"
      />
    </>
  );
};
