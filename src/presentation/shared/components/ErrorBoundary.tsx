import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          background: 'var(--bg-deep)',
          color: 'var(--text-main)',
          fontFamily: 'var(--font-mono)'
        }}>
          <h1 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>Sytem Failure Detected</h1>
          <p style={{ color: 'var(--text-dim)', marginBottom: '2rem', maxWidth: '600px' }}>
            A critical error has occurred in the UI rendering pipeline.
          </p>
          {this.state.error && (
            <pre style={{
              background: 'rgba(255,255,255,0.05)',
              padding: '1rem',
              borderRadius: '4px',
              border: '1px solid var(--border-neon)',
              maxWidth: '100%',
              overflow: 'auto',
              fontSize: '0.8rem',
              color: 'var(--accent-cyan)',
              textAlign: 'left'
            }}>
              {this.state.error.message}
            </pre>
          )}
          <button 
            className="cta-button" 
            style={{ marginTop: '2rem' }}
            onClick={() => window.location.reload()}
          >
            REBOOT SYSTEM
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
