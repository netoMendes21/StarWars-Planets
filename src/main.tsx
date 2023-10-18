import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ProviderPlanets from './context/Provider';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <BrowserRouter>
      <ProviderPlanets>
        <App />
      </ProviderPlanets>
    </BrowserRouter>,
  );
