import React from 'react';
import { ContingencyForm } from '../form/ContingencyForm';

interface Props {
  next: () => void;
}
export const StepMid = ({ next }: Props) => {
  return <ContingencyForm onSuccess={[next]} />;
};
