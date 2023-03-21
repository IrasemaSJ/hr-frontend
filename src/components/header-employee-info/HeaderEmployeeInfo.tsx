import { UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import './HeaderEmployeeInfo.css';

interface Props {
  name: string;
  job: string;
  seniority: string;
  admission_date: string;
}

export const HeaderEmployeeInfo = ({
  name,
  job,
  seniority,
  admission_date,
}: Props) => {
  return (
    <Card>
      <div className="header-employee-info-container">
        <div className="header-employee-info-subcontainer">
          <div className="header-employee-info-icon-container">
            <div className="header-employee-info-icon">
              <UserOutlined />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '30px' }}>{name.toUpperCase()}</div>
            <span>{job}</span>
          </div>
        </div>
        <div className="header-employee-info-subcontainer">
          <div>
            <div style={{ fontSize: '18px' }}>
              <b>Seniority</b>
            </div>
            <span>{seniority}</span>
          </div>
          <div>
            <div style={{ fontSize: '18px' }}>
              <b>Hire date</b>
            </div>
            <span>{admission_date}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
