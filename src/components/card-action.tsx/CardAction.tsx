import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';

interface Props {
  urlAvatar: string;
  title: string;
  text: string;
  onClick: () => void;
}

export const CardAction = ({ urlAvatar, title, text, onClick }: Props) => {
  return (
    <Card
      bordered={false}
      // style={{ minWidth: '300px' }}
      hoverable={true}
      onClick={onClick}
    >
      <Meta avatar={<Avatar src={urlAvatar} />} title={title} />
      <div style={{ marginTop: '10px' }}>
        <strong>Avaliable</strong>
        <br />
        <span>{text}</span>
      </div>
    </Card>
  );
};
