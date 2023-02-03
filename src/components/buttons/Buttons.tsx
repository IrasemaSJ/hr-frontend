import { Button, theme } from 'antd';
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UndoOutlined,
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
      background: token.colorError,
      icon: <UndoOutlined />,
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
      background: token.colorSuccess,
      icon: <CheckOutlined />,
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
