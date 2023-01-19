import React from 'react';
import { ContingencyForm } from '../form/ContingencyForm';
import { RequestType } from './Stepper';
import { VacationForm } from '../form/VacationForm';

interface Props {
  next: () => void;
  requestType: RequestType;
}
export const StepMid = ({ next, requestType }: Props) => {
  switch (requestType) {
    case 'contingecy':
      return <ContingencyForm onSuccess={[next]} />;
    case 'vacation':
      return <VacationForm onSuccess={[next]} />;
    default:
      return <p>Form not found</p>;
  }
};
