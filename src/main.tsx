import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.tsx';
import './index.css';

Sentry.init({
  dsn: "https://aed606809173440f2af1a4a915a85591@o4511140791451648.ingest.de.sentry.io/4511140809736272",
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions (reduce in production)
  // Session Replay (Optional but recommended)
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, 
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
