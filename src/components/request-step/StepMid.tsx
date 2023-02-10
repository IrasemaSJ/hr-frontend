import React from 'react';
import { ContingencyForm } from '../form/ContingencyForm';
import { RequestType } from './Stepper';
import { VacationForm } from '../form/VacationForm';
import { CreateContingencyForm } from '../form/interfaces/contingencyForm.interfaces';

interface Props {
  next: () => void;
  prev: () => void;
  requestType: RequestType;
  createContingency: (data: CreateContingencyForm) => void;
}
export const StepMid = ({
  next,
  requestType,
  prev,
  createContingency,
}: Props) => {
  switch (requestType) {
    case 'contingecy':
      return (
        <ContingencyForm
          next={next}
          createContingency={createContingency}
          prev={prev}
        />
      );
    case 'vacation':
      return <VacationForm title="Vacation" onSuccess={[next]} prev={prev} />;
    default:
      return <p>Form not found</p>;
  }
};
