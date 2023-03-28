import { faFileCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'antd';
import { MyButton } from '../buttons/Buttons';
import './SectionemployeeInfo.css';

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
        <MyButton onClick={onClick} action="link">
          <FontAwesomeIcon icon={faFileCirclePlus} />
          &nbsp;Open Request
        </MyButton>
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
            <strong>Medical Incapacity: </strong>
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
            <strong>Maternity Leave: </strong>
            {/* {pregnancy} days */}
            not available
          </div>
          <div>
            <strong>Non paid: </strong>
            {/* {no_paid} days */}
            not available
          </div>
        </div>
      </Card>
    </div>
  );
};
