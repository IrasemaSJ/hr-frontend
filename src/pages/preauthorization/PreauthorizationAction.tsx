import React, { useEffect, useState } from 'react';
import {
  Card,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Modal,
  Spin,
  Result,
} from 'antd';
import { ReactComponent as Logo } from '../../assets/logo_improving.svg';
import { useSearchParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import ApiHR from '../../api/ApiHR';
import { PreauthorizationForm } from './PreauthorizationForm';
import { PreauthorizationResult } from './PreauthorizationResult';

//simulacion de manejador de peticiones
function apiReqest(body: any, delay: number) {
  return new Promise(function (_resolve, _reject) {
    setTimeout(() => {
      // _resolve({ statusCode: 200, ...body });
      _reject({ statusCode: 500, ...body });
    }, delay);
  });
}
interface TokenInterface {
  dates: string[];
  email_responsible: string;
  exp: number;
  folio: string;
  iat: number;
  id_request: string;
  requestType: string;
}
export const PreauthorizationAction = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>();

  async function handleToken() {
    try {
      // call the api to check if the token is valid
      const token = searchParams.get('hash') || null;
      if (!token) return <div>Token not found</div>;
      const response = await ApiHR.get(
        `/preauthorizations/validate-token-url/${token}`,
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleToken();
  }, []);

  // check if it exists a token
  const token = searchParams.get('hash');
  if (!token) return <div>Token not found</div>;

  // check if it is a valid token in syntax
  const decoded: TokenInterface = jwt_decode(token);
  // console.log(decoded);
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
            <Typography.Title
              type="secondary"
              level={5}
              style={{ marginTop: 25 }}
            >
              {requestType} Request
            </Typography.Title>
            <Divider />
            {!result ? (
              <PreauthorizationForm handleFinish={handleFinish} folio={folio} />
            ) : (
              <PreauthorizationResult
                folio={result.folio}
                observations={result.observations || 'None'}
                statusCode={result.statusCode}
                status={result.status}
              />
            )}
          </div>
        </Card>
      </Spin>
    </div>
  );
};
