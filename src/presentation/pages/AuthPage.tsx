import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../application/context/AuthContext';
import { ThemeToggle } from '../shared/components/ThemeToggle';
import { StasherBrand } from '../shared/components/StasherBrand';

type Mode = 'LOGIN' | 'SIGNUP';

export const AuthPage: React.FC = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLogin = mode === 'LOGIN';

  const switchMode = () => {
    setMode(isLogin ? 'SIGNUP' : 'LOGIN');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isLogin && password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }

    setIsSubmitting(true);
    if (isLogin) {
      await login(email);
    } else {
      await signup?.(email);
    }
    setIsSubmitting(false);
    navigate('/');
  };

  return (
    <div className="layout-root auth-page">
      <div className="bg-grid" aria-hidden="true"></div>

      {/* Theme init normally lives in the site nav; this page has no nav. */}
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>

      <main className="auth-card">
        <Link to="/" className="auth-logo" aria-label="Back to the Stasher homepage">
          <StasherBrand />
        </Link>

        <h1 className="auth-title">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
        <p className="auth-desc">
          {isLogin
            ? 'Log in to manage your Stasher.'
            : 'A free account to register your device and get updates.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              required
              minLength={8}
              placeholder={isLogin ? 'Your password' : 'At least 8 characters'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {!isLogin && (
            <div className="auth-field">
              <label htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                placeholder="Same password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          )}

          {error && (
            <p className="auth-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="cta-button auth-submit" disabled={isSubmitting}>
            {isSubmitting ? 'One moment…' : isLogin ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className="auth-switch">
          {isLogin ? 'New to Stasher?' : 'Already have an account?'}{' '}
          <button type="button" className="auth-switch-link" onClick={switchMode}>
            {isLogin ? 'Create an account' : 'Log in'}
          </button>
        </p>

        <Link to="/" className="auth-back">
          ← Back to the homepage
        </Link>
      </main>
    </div>
  );
};
