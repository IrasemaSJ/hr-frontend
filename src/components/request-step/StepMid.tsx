import React from 'react';
import { ContingencyForm } from '../form/ContingencyForm';
import { RequestType } from './Stepper';
import { VacationForm } from '../form/VacationForm';
import { SubmitValues } from '../../pages/employees/EmployeeInfo';

interface Props {
  next: () => void;
  prev: () => void;
  requestType: RequestType;
  createContingency: (data: SubmitValues) => void;
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
