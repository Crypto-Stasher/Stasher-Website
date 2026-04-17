import React, { useState } from 'react';
import { useAuth } from '../../application/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../shared/components/LoginModal.css'; // We can reuse the styling from the modal

export const AuthPage: React.FC = () => {
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [org, setOrg] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (mode === 'LOGIN') {
      await login(email);
    } else {
      await signup?.(email); // added signup to auth context
    }
    setIsSubmitting(false);
    navigate('/'); // Redirect to the main site
  };

  return (
    <div className="layout-root" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-deep)' }}>
      <div className="bg-grid" aria-hidden="true"></div>
      <div className="scanline" aria-hidden="true"></div>

      <div className="modal-container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="modal-glare"></div>
        <button className="modal-close" onClick={() => navigate('/')} aria-label="Close">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="modal-header">
          <div className="modal-tech-tag">SECURE_LINK_PROT</div>
          <h2 className="modal-title">{mode === 'LOGIN' ? 'OPERATOR AUTHENTICATION' : 'NEW OPERATOR REGISTRATION'}</h2>
          <div className="modal-scanline"></div>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="email">CLIENT_ID [EMAIL]</label>
            <input
              id="email"
              type="email"
              required
              placeholder="operator@stasher.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">ACCESS_PHRASE</label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {mode === 'SIGNUP' && (
            <>
              <div className="form-group">
                <label htmlFor="confirm-password">CONFIRM_ACCESS_PHRASE</label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="org">ORGANIZATION_NAME</label>
                <input
                  id="org"
                  type="text"
                  required
                  placeholder="Stasher Corp"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </>
          )}

          {mode === 'LOGIN' && (
            <div className="form-group">
              <label htmlFor="token">2FA_TOKEN [TOTP/FIDO2]</label>
              <input
                id="token"
                type="text"
                required
                placeholder="000000"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                disabled={isSubmitting}
              />
              <div className="input-decorator">AWAITING_INPUT</div>
            </div>
          )}

          <button type="submit" className="modal-submit" disabled={isSubmitting}>
            {isSubmitting ? 'VERIFYING...' : (mode === 'LOGIN' ? 'INITIALIZE UPLINK' : 'REGISTER CLEARANCE')}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
          <span style={{ color: 'var(--text-dim)' }}>
            {mode === 'LOGIN' ? 'NO CLEARANCE?' : 'ALREADY CLEARED?'}
          </span>
          {' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-cyan)',
              cursor: 'pointer',
              fontFamily: 'inherit',
              textDecoration: 'underline',
              padding: 0
            }}
          >
            {mode === 'LOGIN' ? 'REQUEST ACCESS' : 'AUTHENTICATE'}
          </button>
        </div>
      </div>
    </div>
  );
};
