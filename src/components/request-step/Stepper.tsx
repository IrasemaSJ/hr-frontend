import React from 'react';
import { Button, message, Steps } from 'antd';
import { ContingencyForm } from '../form/ContingencyForm';
import { StepOne } from './StepOne';
import { LastStep } from './LastStep';
import { useStepper } from '../../hooks';
import { useState } from 'react';
import { StepMid } from './StepMid';
// const description = <p>holo</p>;

interface Props {
  closeModal: () => void;
}

export const Stepper = ({ closeModal }: Props) => {
  const [requestType, setRequestType] = useState('');

  const { steps, items, next, prev, current } = useStepper({
    steps: [
      {
        title: 'Type',
        content: () => <StepOne next={next} />,
      },
      {
        title: 'Fill',
        content: () => <StepMid next={next} />,
      },
      {
        title: 'Response',
        content: () => <LastStep prev={prev} closeModal={closeModal} />,
      },
    ],
  });

  const contentStyle: React.CSSProperties = {
    color: 'black',
    padding: '10px',
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
      <div style={contentStyle}>{steps[current].content()}</div>
    </>
  );
};
