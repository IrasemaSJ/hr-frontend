import { Modal, Typography } from 'antd';
import { ContingencyHttp } from '../../api/interfaces/contingencies/contingency.interfaces';
import { formatTableDate } from '../../helpers';
import { Status } from '../status/Status';

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
              <strong>Status: </strong>
              {<Status status={record.status} />}
            </span>
          </li>
          <li>
            <span>
              <strong>Date: </strong>
              {formatTableDate(record.date)}
            </span>
          </li>
          <li>
            <span>
              <strong>Preauthorization responsibles: </strong>
              {record.project_responsibles.map(
                ({ id, name, project_role, preauthorize, observations }) => (
                  <li key={id}>
                    {name}: | {project_role} |{' '}
                    {<Status status={preauthorize} />}
                    <br />
                    {observations && (
                      <div>
                        Observations:{' '}
                        <span style={{ color: 'red' }}>{observations}</span>
                      </div>
                    )}
                  </li>
                ),
              )}
            </span>
          </li>
          <li>
            <span>
              <strong>Detail of request: </strong>
              {record.comments}
            </span>
          </li>
          {record.observations !== '' && (
            <li>
              <span style={{ color: 'red' }}>
                <strong style={{ color: 'black' }}>Observations: </strong>
                {record.observations}
              </span>
            </li>
          )}
        </ul>
      </Typography.Text>
    </Modal>
  );
};
