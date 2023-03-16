import { Button, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faEye,
  faFileCircleXmark,
  faPenToSquare,
  faTrashCan,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  action: 'info' | 'edit' | 'reject' | 'cancel' | 'accept' | 'delete' | 'link';
  onClick?: () => void;
  icon?: JSX.Element;
  arg?: any;
  circled?: boolean;
};

const useActionColors = (action: Props['action']) => {
  const { useToken } = theme;
  const { token } = useToken();

  const config = {
    delete: {
      background: token.colorError,
      icon: <FontAwesomeIcon icon={faTrashCan} />,
    },
    reject: {
      background: token.colorError,
      icon: <FontAwesomeIcon icon={faXmark} />,
    },
    info: {
      background: token.colorInfo,
      icon: <FontAwesomeIcon icon={faEye} />,
    },
    edit: {
      background: token.colorInfo,
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
    accept: {
      background: token.colorSuccess,
      icon: <FontAwesomeIcon icon={faCheck} />,
    },
    cancel: {
      background: token.colorWarning,
      icon: <FontAwesomeIcon icon={faFileCircleXmark} />,
    },
    link: {
      background: token.colorLink,
      icon: <FontAwesomeIcon icon={faFileCircleXmark} />,
    },
  };
  return config[action];
};

export const MyButton = ({
  children,
  onClick,
  action,
  icon,
  ...arg
}: Props) => {
  const { background } = useActionColors(action);
  return (
    <Button
      {...arg}
      type="primary"
      icon={icon}
      style={{
        background: background,
        // margin: '2px',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export const BtnTable = ({ children, onClick, action, ...args}: Props) => {
  const { background, icon } = useActionColors(action);

  return (
    <Button
      type="primary"
      shape="circle"
      icon={icon}
      style={{
        background: background,
        margin: '2px',
      }}
      onClick={onClick}
      {...args}
    >
      {children}
    </Button>
  );
};
