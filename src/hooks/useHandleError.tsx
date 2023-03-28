import { useContext, useEffect, useState } from 'react';
import {
  NotificationInstance,
  NotificationPlacement,
} from 'antd/es/notification/interface';
import { handleErrorHttp } from '../helpers';
import { AuthContext } from '../contexts/AuthContext';

export const useHandleError = (api?: NotificationInstance) => {
  const { logOut } = useContext(AuthContext);
  const [serverError, setServerError] = useState();

  useEffect(() => {
    if (serverError) {
      handleErrorHttp({ error: serverError, openNotification, logOut });
    }
  }, [serverError]);

  const openNotification = (
    placement: NotificationPlacement,
    messages: string | string[],
  ) => {
    api!.error({
      message: `Oops! Something went wrong!`,
      description: (
        <ul>
          {Array.isArray(messages) ? (
            messages.map((msg) => <li key={msg}>{msg}</li>)
          ) : (
            <li>{messages}</li>
          )}
        </ul>
      ),
      placement,
    });
  };

  return {
    setServerError,
  };
};
