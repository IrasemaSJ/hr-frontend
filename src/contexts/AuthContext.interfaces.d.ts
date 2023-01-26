export interface Roles {
  admin: 'admin';
  assistant: 'assistant';
  employee: 'employee';
}

export interface UserInformation {
  name: string;
  role: Roles | '';
  token: '';
}

export interface ContextProps {
  user: UserInformation;
  setUser: (user: UserInformation) => void;
}
