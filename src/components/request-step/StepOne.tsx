import React from 'react';
import { CardActionContainer } from '../card-action-container/CardActionContainer';
import { CardAction } from '../card-action.tsx/CardAction';
import { RequestType } from './Stepper';

interface Props {
  next: () => void;
  setType: (type: RequestType) => void;
}
export const StepOne = ({ next, setType }: Props) => {
  const handleClick = (type: RequestType) => {
    setType(type);
    next();
  };

  return (
    <CardActionContainer>
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Vacations"
        text="7 days"
        onClick={() => handleClick('vacation')}
        // onClick={() => action('vacation')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Contingency"
        text="7 days"
        onClick={() => handleClick('contingecy')}
        // onClick={() => action('contingency')}
      />
      {/* <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Incapacity"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Time by Time"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Bereavement"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Pregnancy"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Paternity"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Marriage"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Non paid"
        text="7 days"
        onClick={() => console.log('hola')}
      /> */}
    </CardActionContainer>
  );
};
