import React, { useState } from 'react';
import { Button, message, Steps, theme } from 'antd';
import { ContingencyForm } from '../form/ContingencyForm';
import { StepOne } from './StepOne';
import { LastStep } from './LastStep';
// const description = <p>holo</p>;

interface Props {
  closeModal: () => void;
}
export const Stepper = ({ closeModal }: Props) => {
  const steps = [
    {
      title: 'Type',
      content: <StepOne />,
    },
    {
      title: 'Fill',
      content: <ContingencyForm />,
    },
    {
      title: 'Response',
      content: <LastStep />,
    },
  ];
  // const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle: React.CSSProperties = {
    // lineHeight: '260px',
    // textAlign: 'center',
    // backgroundColor: token.colorFillAlter,
    // borderRadius: token.borderRadiusLG,
    // border: `1px dashed ${token.colorBorder}`,
    // color: token.colorTextTertiary,
    color: 'black',
    padding: '10px',
    // background: 'blue',
    // marginTop: 50,
  };

  return (
    <>
      <h1>Request</h1>

      <Steps
        responsive={true}
        labelPlacement="horizontal"
        type="navigation"
        style={{ marginTop: 30, color: 'black' }}
        current={current}
        items={items}
      />
      {/* content */}
      <div style={contentStyle}>{steps[current].content}</div>

      {/* footer */}

      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              closeModal();
              message.success('Processing complete!');
            }}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};
