/* eslint-disable */
import React from "react";
import { createRoot } from 'react-dom/client';

import App from './App'
import "./assets/css/App.css";
import "./assets/css/Notfound.css";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/css/Spinner.css";
import "./assets/css/Pagination.css";

import * as Sentry from "@sentry/react";
// import ErrorBoundary from "./components/errorBoundary/ErrorBoundary";

Sentry.init({
  dsn: process.env.DSN_TOKEN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const container = document.getElementById('app-root');
const root = createRoot(container);

// const ERROR_BOUNDARY_FEED = "Có lỗi ";

root.render(
  // <ErrorBoundary
  //   extra={{
  //     errorKey: "ERROR_BOUNDARY_FEED",
  //     uiMessage: ERROR_BOUNDARY_FEED
  //   }}
  //   fallbackRender={({
  //     eventId,
  //     resetErrorBoundary,
  //     componentStack,
  //     error
  //   }) => (
  //     <div>
  //       <p>{ERROR_BOUNDARY_FEED}</p>
  //       <div>
  //       Lỗi : <code>{eventId}</code>
  //       </div>
  //       <button onClick={resetErrorBoundary}>Try again</button>
  //     </div>
  //   )}
  // >
  // </ErrorBoundary>
  <App />
);