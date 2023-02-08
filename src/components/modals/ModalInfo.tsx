import { Modal, Typography } from 'antd';
import { ContingencyHttp } from '../../api/interfaces/contingency.interfaces';
import { format } from '../../helpers';
import * as dayjs from 'dayjs';

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
    <Modal width={width} open={isModalOpen} onCancel={closeModal} footer={[]}>
      <>
        <Typography.Title level={2}>Contingency Information</Typography.Title>
        <p>
          <Typography.Text>
            <ul>
              <li>
                <strong>Folio:</strong> <span>{record.folio}</span>
              </li>
              {!employee && (
                <li>
                  <strong>Name:</strong> <span> {record.name_employee}</span>
                </li>
              )}
              <li>
                <strong>Date:</strong>
                <span> {dayjs(record.date).format(format.table)}</span>
              </li>
              <li>
                <strong>Half day:</strong>
                <span>{record.half_day ? ' ✅' : '❌'}</span>
              </li>
              <li>
                <strong>comments:</strong>
                <span> {record.comments}</span>
              </li>
              {record.observations !== '' && (
                <li>
                  <strong>observations:</strong>
                  <span style={{ color: 'red' }}> {record.observations}</span>
                </li>
              )}
            </ul>
          </Typography.Text>
        </p>
      </>
    </Modal>
  );
};
