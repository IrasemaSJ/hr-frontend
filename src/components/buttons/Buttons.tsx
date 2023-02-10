import { Button, theme } from 'antd';
import {
  DeleteOutlined,
  DislikeOutlined,
  EditOutlined,
  EyeOutlined,
  LikeOutlined,
} from '@ant-design/icons';

type Props = {
  children?: JSX.Element;
  action: 'info' | 'edit' | 'reject' | 'cancel' | 'accept';
  onClick?: () => void;
};
const { useToken } = theme;

export const BtnTable = ({ children, onClick, action }: Props) => {
  const { token } = useToken();

  const config = {
    cancel: {
      background: token.colorError,
      icon: <DeleteOutlined />,
    },
    reject: {
      // background: token.colorError,
      background: '#F5BB41',
      icon: <DislikeOutlined />,
    },
    info: {
      background: token.colorPrimary,
      icon: <EyeOutlined />,
    },
    edit: {
      background: token.colorWarning,
      icon: <EditOutlined />,
    },
    accept: {
      // background: token.colorSuccess,
      background: '#5BC2A7',
      icon: <LikeOutlined />,
    },
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={config[action].icon}
      style={{
        background: config[action].background,
        margin: '2px',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
