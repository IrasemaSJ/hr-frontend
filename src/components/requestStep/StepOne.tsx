import React from 'react';
import { CardActionContainer } from '../card-action-container/CardActionContainer';
import { CardAction } from '../card-action.tsx/CardAction';

export const StepOne = () => {
  return (
    <CardActionContainer>
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Vacations"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
        urlAvatar="https://travellersworldwide.com/wp-content/uploads/2022/05/shutterstock_1938868960.png.webp"
        title="Contingency"
        text="7 days"
        onClick={() => console.log('hola')}
      />
      <CardAction
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
      />
    </CardActionContainer>
  );
};
