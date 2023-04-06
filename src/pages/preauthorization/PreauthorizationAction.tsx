import React, { useEffect, useState } from 'react';
import { Card, Typography, Divider, Spin } from 'antd';
import { ReactComponent as Logo } from '../../assets/logo_improving.svg';
import { useSearchParams } from 'react-router-dom';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import ApiHR from '../../api/ApiHR';
import { PreauthorizationForm } from './PreauthorizationForm';
import { PreauthorizationResult } from './PreauthorizationResult';
import { TokenContentInterface, TokenValidateHttp } from '../../api/interfaces';

export interface TokenInfoData {
  dates: string[];
  email: string;
  folio: string;
  id_request: string;
  requestType: string;
  token: string;
}

export const PreauthorizationAction = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>();
  const [tokenInfo, setTokenInfo] = useState<TokenInfoData>();

  async function handleToken() {
    setIsLoading(true);
    try {
      // call the api to check if the token is valid
      const token = searchParams.get('hash') || null;
      if (!token) return <div>Token not found</div>;
      await ApiHR.get<TokenValidateHttp>(
        `/preauthorizations/validate-token-url/${token}`,
      );

      // if the token is valid, decode the info
      const { dates, email_responsible, folio, id_request, requestType } =
        await jwt_decode<TokenContentInterface>(token);

      // set the token info in state
      setTokenInfo({
        dates: dates,
        email: email_responsible,
        folio: folio,
        id_request: id_request,
        requestType: requestType,
        token,
      });
    } catch (error) {
      return <>not found</>;
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log(tokenInfo);
    handleToken();
  }, []);

  // check if it exists a token
  const token = searchParams.get('hash');
  if (!token) return <div>Token not found</div>;

  // check if it is a valid token in syntax
  const decoded = jwt_decode<TokenContentInterface>(token);
  console.log(decoded);
  const { folio, requestType, id_request, email_responsible } = decoded;
  if (!folio) return <div>Folio not found</div>;

  const handleFinish = async (values: {
    observations: string;
    status: string;
  }) => {
    setIsLoading(true);
    try {
      const postBody = {
        ...values,
        folio,
        requestType,
        token,
      };

      const response = await ApiHR.patch(`/preauthorizations/${id_request}`, {
        email: email_responsible,
        status: values.status,
        observations: values.observations,
        token,
        requestType,
      });

      console.log(response);
      setResult({
        ...postBody,
        message: response.data,
        statusCode: response.status,
      });
    } catch (error) {
      console.log(error);
      setResult(error);
    }
    setIsLoading(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Spin spinning={isLoading} style={{ width: '100%' }}>
        <Card
          style={{
            margin: '10 auto',
            maxWidth: '600px',
            minWidth: '90%',
          }}
        >
          <div
            style={{
              width: 'auto',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo />
            {requestType && (
              <Typography.Title
                type="secondary"
                level={5}
                style={{ marginTop: 25 }}
              >
                {requestType} Request
              </Typography.Title>
            )}
            <Divider />
            {tokenInfo && (
              <>
                {!result ? (
                  <PreauthorizationForm
                    // this component uses dat in tokenInfo
                    handleFinish={handleFinish}
                    folio={tokenInfo.folio}
                  />
                ) : (
                  <PreauthorizationResult
                    // this component uses data in result after respond vacation request
                    folio={result.folio}
                    observations={result.observations || 'None'}
                    statusCode={result.statusCode}
                    status={result.status}
                  />
                )}
              </>
            )}
          </div>
        </Card>
      </Spin>
    </div>
  );
};
