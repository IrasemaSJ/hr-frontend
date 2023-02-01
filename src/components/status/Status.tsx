import { Tag } from 'antd';

interface Props {
  status: string;
}
export const Status = ({ status }: Props) => {
  return status === 'approved' ? (
    <Tag color="green"> {status} </Tag>
  ) : status === 'rejected' ? (
    <Tag color="red"> {status} </Tag>
  ) : status === 'pending' ? (
    <Tag color="yellow"> {status} </Tag>
  ) : (
    <Tag color="black"> {status} </Tag>
  );
};
