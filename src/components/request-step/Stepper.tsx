import React from 'react';
import { Steps } from 'antd';
import { StepOne } from './StepOne';
import { LastStep } from './LastStep';
import { useStepper } from '../../hooks';
import { useState } from 'react';
import { StepMid } from './StepMid';
import { CreateContingencyForm } from '../form/interfaces/contingencyForm.interfaces';
// const description = <p>holo</p>;

interface Props {
  closeModal: () => void;
  createContingency: (data: CreateContingencyForm) => void;
  folio: string;
}
export type RequestType = 'vacation' | 'contingecy' | '';
export const Stepper = ({ closeModal, createContingency, folio }: Props) => {
  // state of the request
  const [requestType, setRequestType] = useState<RequestType>('');

  // stepper context
  const { steps, items, next, prev, current } = useStepper({
    steps: [
      {
        title: 'Select',
        content: () => <StepOne next={next} setType={setRequestType} />,
        description: 'Select your request',
      },
      {
        title: 'Information',
        content: () => (
          <StepMid
            next={next}
            requestType={requestType}
            prev={prev}
            createContingency={createContingency}
          />
        ),
        description: 'Fill out your info',
      },
      {
        title: 'Done',
        content: () => <LastStep closeModal={closeModal} folio={folio} />,
        description: 'You are ready',
      },
    ],
  });

  const contentStyle: React.CSSProperties = {
    color: 'black',
    padding: '10px',
  };

  return (
    <>
      <Steps
        responsive={true}
        labelPlacement="horizontal"
        type="navigation"
        style={{ marginTop: 30, color: 'black', marginBottom: 10 }}
        current={current}
        items={items}
      />
      {/* content */}
      <div style={contentStyle}>{steps[current].content()}</div>
    </>
  );
};
