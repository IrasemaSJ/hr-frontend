import React from 'react';
import { ContingencyForm } from '../form/ContingencyForm';
import { RequestType } from './Stepper';
import { VacationForm } from '../form/VacationForm';

interface Props {
  next: () => void;
  prev: () => void;
  requestType: RequestType;
}
export const StepMid = ({ next, requestType, prev }: Props) => {
  switch (requestType) {
    case 'contingecy':
      return <ContingencyForm onSuccess={[next]} prev={prev} />;
    case 'vacation':
      return <VacationForm onSuccess={[next]} prev={prev} />;
    default:
      return <p>Form not found</p>;
  }
};
