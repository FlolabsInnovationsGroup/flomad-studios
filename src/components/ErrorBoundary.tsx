'use client';

import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Only log detailed errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Uncaught error:', error, errorInfo);
    } else {
      // In production, log minimal information and send to monitoring service
      console.error('Application error occurred');
      // TODO: Send error to monitoring service (e.g., Sentry, LogRocket)
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center px-4">
          <div className="text-center space-y-6 max-w-md">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-red-500">Oops! Something went wrong</h2>
              <p className="text-foreground/70">
                We apologize for the inconvenience. Please try refreshing the page.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 text-left">
                  <summary className="cursor-pointer text-sm text-foreground/60">
                    Error Details (Development Only)
                  </summary>
                  <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Refresh Page
              </button>
              <button
                onClick={() => this.setState({ hasError: false })}
                className="px-6 py-2 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 
