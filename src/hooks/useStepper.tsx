import { useState } from 'react';
import { StepProps } from 'antd/lib/steps';
interface StepType extends StepProps {
  content: () => JSX.Element;
}
export const useStepper = ({ steps }: { steps: StepType[] }) => {
  const [current, setCurrent] = useState(0);

  // go next step if current is minor than steps.length - 1
  const next = () => {
    if (current < steps.length - 1) {
      setCurrent(current + 1);
    }
  };

  // go prev step if current is greater than 0
  const prev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description || '',
  }));

  return {
    current,
    steps,
    items,
    next,
    prev,
  };
};
