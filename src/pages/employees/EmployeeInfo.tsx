import { UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { CardActionContainer, CardAction } from '../../components';
import './EmployeeInfo.css';

export const EmployeeInfo = () => {
  return (
    <div>
      <Card>
        <div className="employee-info-card-header">
          <div style={{ fontSize: '50px' }}>
            <div
              style={{
                backgroundColor: '#cecece',
                borderRadius: '50%',
                padding: '10px 20px',
              }}
            >
              <UserOutlined />
            </div>
          </div>
          <div>
            <div style={{ fontSize: '30px' }}>
              Adrian Manuel Barrabas Garcia
            </div>
            <span>Software Specialist</span>
          </div>
          <div>
            <div style={{ fontSize: '18px' }}>
              <b>Seniority</b>
            </div>
            <span>2 years, 4 months</span>
          </div>
          <div>
            <div style={{ fontSize: '18px' }}>
              <b>Date of admission</b>
            </div>
            <span>8 feb 2022</span>
          </div>
        </div>
      </Card>

      <CardActionContainer>
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Vacations"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Contingency"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Incapacity"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Time by Time"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Bereavement"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Pregnancy"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Paternity"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Marriage"
          text="7 days"
          onClick={() => console.log('hola')}
        />
        <CardAction
          urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
          title="Non paid"
          text="7 days"
          onClick={() => console.log('hola')}
        />
      </CardActionContainer>
    </div>
  );
};
