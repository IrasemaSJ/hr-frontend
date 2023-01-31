import { NotificationPlacement } from 'antd/es/notification/interface';

interface Params {
  error: any;
  openNotification: (placemente: NotificationPlacement, data: any) => void;
  logOut: () => void;
}
/**
 * 400: bad request
 * 401: unauthenticated
 * 500: server error
 */
export const handleErrorHttp = ({
  error,
  openNotification,
  logOut,
}: Params) => {
  if (error.response.status === 400) {
    return openNotification('top', error.response.data.message);
  }
  if (error.response.status === 401) {
    return logOut();
  }
  if (error.response.status === 500) {
    return openNotification('top', error.response.data.message);
  }
};
