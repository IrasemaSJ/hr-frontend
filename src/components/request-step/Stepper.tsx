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
export type RequestType = 'vacation' | 'contingecy' | '';
export const Stepper = ({ closeModal }: Props) => {
  const [requestType, setRequestType] = useState<RequestType>('');

  const { steps, items, next, prev, current } = useStepper({
    steps: [
      {
        title: 'Select',
        content: () => <StepOne next={next} setType={setRequestType} />,
      },
      {
        title: 'Fill Out',
        content: () => (
          <StepMid next={next} requestType={requestType} prev={prev} />
        ),
      },
      {
        title: 'Review',
        content: () => <LastStep closeModal={closeModal} />,
      },
    ],
  });

  const contentStyle: React.CSSProperties = {
    color: 'black',
    padding: '10px',
  };

  return (
    <>
      <h1>🗓️ Request</h1>

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
