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

type Props = {
  children?: JSX.Element;
  action: 'info' | 'edit' | 'reject' | 'cancel' | 'accept' | 'delete';
  onClick?: () => void;
};
const { useToken } = theme;

export const BtnTable = ({ children, onClick, action }: Props) => {
  const { token } = useToken();

  const config = {
    delete: {
      background: token.colorError,
      icon: <FontAwesomeIcon icon={faTrashCan} />,
    },
    reject: {
      background: token.colorError,
      //background: '#F5BB41',
      icon: <FontAwesomeIcon icon={faXmark} />,
    },
    info: {
      //background: token.colorPrimary,
      background: '#4597D3',
      icon: <FontAwesomeIcon icon={faEye} />,
    },
    edit: {
      //background: token.colorWarning,
      background: '#005596',
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
    },
    accept: {
      // background: token.colorSuccess,
      background: '#5BC2A7',
      icon: <FontAwesomeIcon icon={faCheck} />,
    },
    cancel: {
      background: token.colorError,
      icon: <FontAwesomeIcon icon={faFileCircleXmark} />,
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
