import { useState } from 'react';

export const useStepper = ({ steps }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  steps.map;
  return {
    next,
    prev,
    current,
    steps,
    items,
  };
};
