import { Modal, Typography } from 'antd';
import { ContingencyHttp } from '../../api/interfaces/contingencies/contingency.interfaces';
import { formatTableDate } from '../../helpers';

interface Props {
  employee?: boolean;
  record: ContingencyHttp;
  width?: number;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ModalInfo = ({
  employee,
  record,
  width,
  isModalOpen,
  closeModal,
}: Props) => {
  return (
    <Modal
      width={width}
      open={isModalOpen}
      onCancel={closeModal}
      footer={false}
    >
      <Typography.Title level={2}>Contingency Information</Typography.Title>
      <Typography.Text>
        <ul>
          <li>
            <span>
              <strong>Folio: </strong> {record.folio}
            </span>
          </li>
          {!employee && (
            <li>
              <span>
                <strong>Name: </strong> {record.name_employee}
              </span>
            </li>
          )}
          <li>
            <span>
              <strong>Date: </strong>
              {formatTableDate(record.date)}
            </span>
          </li>
          <li>
            <span>
              <strong>Half day: </strong>
              {record.half_day ? '  ✅' : ' ❌'}
            </span>
          </li>
          <li>
            <span>
              <strong>comments: </strong>
              {record.comments}
            </span>
          </li>
          {record.observations !== '' && (
            <li>
              <span style={{ color: 'red' }}>
                <strong style={{ color: 'black' }}>observations: </strong>
                {record.observations}
              </span>
            </li>
          )}
        </ul>
      </Typography.Text>
    </Modal>
  );
};
