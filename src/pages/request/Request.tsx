import { Badge, Table, Tabs } from 'antd';
import {
  firstColumn,
  columnsContigencyRequestInfo,
  lastColumn,
} from './table-design';
import { ModalReject } from '../../components/modals/ModalReject';
import { Loader } from '../../components';
import { ModalAprove } from '../../components/modals/ModalAprove';
import { ModalInfo } from '../../components/modals/ModalInfo';
import { useRequestPage } from '../../hooks';

export const Request = () => {
  //get variables from customhook
  const {
    contingency, // info of rows
    total, // total of rows
    isLoadingTable, // loading of table
    contingencyRows, //array with all rows
    isLoadingRequest, // loading request (reject or approve)
    modalReject,
    modalAprove,
    modalInfo,
    setModalInfo,
    setModalAprove,
    setModalReject,
    updateContingencyStatus,
    setParams, // set contingency info and modal to open
    contextHolder, // show the info from the server
    setPage,
  } = useRequestPage();

  return (
    <>
      <h1>Pending Request</h1>
      {/* show loader outside table */}
      <Loader show={isLoadingRequest} />
      {contextHolder}
      <Tabs
        defaultActiveKey="2"
        tabPosition={'top'}
        style={{ height: 220, marginTop: '20px' }}
        items={[
          {
            label: (
              <Badge status="processing">
                <div style={{ padding: '5px' }}>Vacations</div>
              </Badge>
            ),
            key: '1',
            children: '',
            disabled: true,
          },
          {
            label: (
              <>
                {/* TODO: warning is still appearing */}
                <Badge status="warning" count={total}>
                  <div style={{ padding: '5px' }}>Contingency</div>
                </Badge>
              </>
            ),
            key: '2',
            children: (
              <Table
                loading={isLoadingTable}
                columns={[
                  ...firstColumn({ setParams, setModalInfo }),
                  ...columnsContigencyRequestInfo,
                  ...lastColumn({
                    setParams,
                    setModalAprove,
                    setModalReject,
                  }),
                ]}
                rowKey={'_id'}
                dataSource={contingencyRows}
                pagination={{
                  pageSize: 5,
                  total,
                  onChange(page) {
                    setPage(page);
                  },
                  hideOnSinglePage: true,
                  showTotal(total, range) {
                    return `${range[0]}-${range[1]} of ${total} items`;
                  },
                }}
              />
            ),
          },
        ]}
      />

      {/*--------------------------------------- Modals ---------------------------------*/}
      <ModalAprove
        changeStatus={updateContingencyStatus}
        folio={contingency.folio}
        isModalOpen={modalAprove}
        closeModal={() => setModalAprove(false)}
      />

      <ModalReject
        changeStatus={updateContingencyStatus}
        folio={contingency.folio}
        isModalOpen={modalReject}
        closeModal={() => setModalReject(false)}
      />
      <ModalInfo
        record={contingency}
        isModalOpen={modalInfo}
        closeModal={() => setModalInfo(false)}
      />
    </>
  );
};
