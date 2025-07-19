import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      {/* You can wrap with context providers or layout wrappers here if needed */}
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
