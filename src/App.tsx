import { AuthProvider } from './contexts/AuthContext';
import Navigation from './navigation/Navigation';

const AppContext = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

const App = () => {
  return (
    <AppContext>
      <Navigation />;
    </AppContext>
  );
};

export default App;
