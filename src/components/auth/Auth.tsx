import { MainLayout } from '../layout/MainLayout';

type Props = {
  children: JSX.Element;
};

export const Auth = ({ children }: Props) => {
  //TODO: make session logic
  return <MainLayout>{children}</MainLayout>;
};
