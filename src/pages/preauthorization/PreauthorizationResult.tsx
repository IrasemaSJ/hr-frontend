import { Button, Result, Typography } from 'antd';
import React from 'react';

export const PreauthorizationResult: React.FC<{
  statusCode: number;
  folio: string;
  observations: string;
  status: string;
}> = ({ statusCode, folio, observations, status }) => {
  const handlerClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  return (
    <>
      <Result
        status={statusCode <= 300 ? 'success' : 'error'}
        title={
          statusCode <= 300 ? 'Successfully Submitted!' : 'Submission Failed'
        }
        subTitle={
          statusCode <= 300 ? (
            <>
              <Typography.Text>
                Request {folio} has been {status}
              </Typography.Text>
              <Typography.Paragraph>
                Observations: {observations || 'None'}
              </Typography.Paragraph>
            </>
          ) : (
            <Typography.Paragraph>
              Something went wrong, please try again later
            </Typography.Paragraph>
          )
        }
      />
      <Button type="primary" key="button" onClick={handlerClose}>
        Close
      </Button>
    </>
  );
};
