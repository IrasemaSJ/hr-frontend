export interface Roles {
  admin: 'admin';
  assistant: 'assistant';
  employee: 'employee';
}

export interface UserInformation {
  name: string;
  role: Roles[keyof Roles] | '';
}

export interface Credentials {
  email: string;
  password: string;
}
export interface ContextProps {
  user: UserInformation;
  setUser: (user: UserInformation) => void;
  logIn: () => void;
  logOut: () => void;
  credentials: Credentials;
  error: Credentials;
  errorServer: string | string[];
  isLoading: boolean;
  setCredentials: (credentials: Credentials) => void;
}
