import { DownloadOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
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
  return (
    <div className="section-employee-info-container-information-left">
      <Card className="section-employee-info-container-open-request">
        <Button
          onClick={onClick}
          type="primary"
          icon={<DownloadOutlined />}
          size={'large'}
        >
          Open Request
        </Button>
      </Card>
      <Card className="section-employee-info-information-left-card">
        <div className="section-employee-info-information-left">
          <div>
            <strong>Vacations: </strong>
            {/* {vacation} days */}
            not available
          </div>
          <div>
            <strong>Contingency: </strong>
            {contingency} days
          </div>
          <div>
            <strong>Incapacity: </strong>
            {/* {incapacity} days */}
            not available
          </div>
          <div>
            <strong>Time by Time: </strong>
            {/* {time_by_time} days */}
            not available
          </div>
          <div>
            <strong>Bereavement: </strong>
            {/* {bereavement} days */}
            not available
          </div>
          <div>
            <strong>Marriage: </strong>
            {/* {marriage} days */}
            not available
          </div>
          <div>
            <strong>Pregnancy: </strong>
            {/* {pregnancy} days */}
            not available
          </div>
          <div>
            <strong>No paid: </strong>
            {/* {no_paid} days */}
            not available
          </div>
        </div>
      </Card>
    </div>
  );
};
