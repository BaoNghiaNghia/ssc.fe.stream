/* eslint-disable */
import React, { useCallback, useState } from "react";
import * as Sentry from '@sentry/browser';
import { ErrorBoundary as ErrorBoundaryLib } from "react-error-boundary";

export const ErrorBoundary = ({ onError, fallbackRender, extra, ...rest }) => {
    const [eventId, setEventId] = useState(null);
    const onErrorHandle = (...args) => {
      if (onError) {
        onError(...args);
      }
      const [error, componentStack] = args;
      const sentryEventId = Sentry.captureException(error, {
        contexts: { react: { componentStack } },
        ...(extra ? { extra } : {})
      });
  
      if (sentryEventId) {
        setEventId(sentryEventId);
      }
    };
  
    const fallbackRenderHandle = useCallback(
      props => {
        return fallbackRender({
          ...props,
          eventId
        });
      },
      [eventId, fallbackRender]
    );
    
  
    return (
      <ErrorBoundaryLib
        onError={onErrorHandle}
        fallbackRender={fallbackRenderHandle}
        {...rest}
      />
    );
  };

export default ErrorBoundary;