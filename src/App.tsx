import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './navigation/Navigation';

const AppContext = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation/>
      </AuthProvider>
    </BrowserRouter>
  );
};

const App = () => {
  return <AppContext />;
};

export default App;
