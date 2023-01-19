import { useState } from 'react';

export const useStepper = ({ steps }) => {
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
  }));

  return {
    next,
    prev,
    current,
    steps,
    items,
  };
};
