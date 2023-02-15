import { Avatar, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import './CardAction.css';
interface Props {
  urlAvatar: string;
  title: string;
  text: string;
  onClick: () => void;
  disableCard?: boolean;
}

export const CardAction = ({
  urlAvatar,
  title,
  text,
  onClick,
  disableCard,
}: Props) => {
  const diableStyles = disableCard
    ? {
        disabled: true,
        className: 'ant-card-disabled',
        hoverable: false,
      }
    : { hoverable: true, onClick };
  return (
    <Card bordered={false} {...diableStyles}>
      <Meta
        avatar={<Avatar src={urlAvatar} />}
        title={
          <p {...{ className: disableCard ? 'ant-card-disabled' : '' }}>
            {title}
          </p>
        }
      />
      <div style={{ marginTop: '10px' }}>
        <strong>Available</strong>
        <br />
        <span>{text}</span>
      </div>
    </Card>
  );
};
