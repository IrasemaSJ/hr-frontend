import React from 'react';
import './CardActionContainer.css';

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export const CardActionContainer = ({ children }: Props) => {
  return <div className="card-action-container-container">{children}</div>;
};
