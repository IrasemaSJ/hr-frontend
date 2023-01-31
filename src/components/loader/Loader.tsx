import { Spin, SpinProps } from 'antd';
import './Loader.css';

interface Props {
  tip?: string;
  size?: SpinProps['size'];
  show: boolean;
}
export const Loader = ({ tip = 'Loading', size = 'large', show }: Props) => {
  return show ? (
    <div className="loader-container">
      <Spin tip={tip} size={size} />
    </div>
  ) : (
    <></>
  );
};
