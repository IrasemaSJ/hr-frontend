import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Navigation } from './navigation/Navigation';
import { ThemeProvider } from './theme/ThemeProvider';

const AppContext = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Navigation />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App = () => {
  return <AppContext />;
};

export default App;
