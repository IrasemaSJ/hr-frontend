import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import { StyleHTMLAttributes } from 'react';
import { useModal } from '../../hooks';
import { Stepper } from '../request-step/Stepper';
import './SectionEmployeeInfo.css';

interface Props {
  vacation: number;
  contingency: number;
  incapacity: number;
  time_by_time: number;
  bereavement: number;
  marriage: number;
  pregnancy: number;
  no_paid: number;
  onClick: () => void;
}

export const SectionEmployeeInfo = ({
  vacation,
  contingency,
  incapacity,
  time_by_time,
  bereavement,
  marriage,
  pregnancy,
  no_paid,
  onClick,
}: Props) => {
  const { UseModal, showModal, handleCancel } = useModal();
  return (
    <div className="section-employee-info-container-information-left">
      <Card className="section-employee-info-container-open-request">
        <Button
          onClick={showModal}
          type="primary"
          icon={<DownloadOutlined />}
          size={'large'}
        >
          Open Request
        </Button>
        <UseModal>
          <Stepper closeModal={handleCancel} />
        </UseModal>
      </Card>
      <Card className="section-employee-info-information-left-card">
        <div className="section-employee-info-information-left">
          <div>
            <strong>Vacations: </strong>
            {vacation} days
          </div>
          <div>
            <strong>Contingency: </strong>
            {contingency} days
          </div>
          <div>
            <strong>Incapacity: </strong>
            {incapacity} days
          </div>
          <div>
            <strong>Time by Time: </strong>
            {time_by_time} days
          </div>
          <div>
            <strong>Bereavement: </strong>
            {bereavement} days
          </div>
          <div>
            <strong>Marriage: </strong>
            {marriage} days
          </div>
          <div>
            <strong>Pregnancy: </strong>
            {pregnancy} days
          </div>
          <div>
            <strong>No paid: </strong>
            {no_paid} days
          </div>
        </div>
      </Card>
    </div>
  );
};
