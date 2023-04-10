import './Error404.css';

export const Error404 = ({
  message = 'Page Not Found',
}: {
  message: string;
}) => {
  return (
    <div className="error404-container">
      <div>{message}</div>
    </div>
  );
};
