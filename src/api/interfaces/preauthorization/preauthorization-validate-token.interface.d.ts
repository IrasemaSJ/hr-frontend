export interface TokenValidateHttp {
  _id: string;
  token: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TokenContentInterface {
  dates: string[];
  email_responsible: string;
  exp: number;
  folio: string;
  iat: number;
  id_request: string;
  requestType: string;
}
