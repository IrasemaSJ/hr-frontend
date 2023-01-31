import React from 'react';
import { ContingencyForm } from '../form/ContingencyForm';
import { RequestType } from './Stepper';
import { VacationForm } from '../form/VacationForm';

interface Props {
  next: () => void;
  prev: () => void;
  requestType: RequestType;
  setFolio: React.Dispatch<React.SetStateAction<string>>;
}
export const StepMid = ({ next, requestType, prev, setFolio }: Props) => {
  switch (requestType) {
    case 'contingecy':
      return (
        <ContingencyForm onSuccess={[next]} prev={prev} setFolio={setFolio} />
      );
    case 'vacation':
      return <VacationForm title="Vacation" onSuccess={[next]} prev={prev} />;
    default:
      return <p>Form not found</p>;
  }
};
