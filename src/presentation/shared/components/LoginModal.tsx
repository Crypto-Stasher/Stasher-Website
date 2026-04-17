import React, { useState } from 'react';
import { useAuth } from '../../../application/context/AuthContext';
import './LoginModal.css';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email);
    setIsSubmitting(false);
  };

  return (
    <div className="modal-overlay reveal-blur active">
      <div className="modal-container">
        <div className="modal-glare"></div>
        <button className="modal-close" onClick={closeLoginModal} aria-label="Close">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="modal-header">
          <div className="modal-tech-tag">SECURE_LINK_PROT</div>
          <h2 className="modal-title">OPERATOR AUTHENTICATION</h2>
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

          <button type="submit" className="modal-submit" disabled={isSubmitting}>
            {isSubmitting ? 'VERIFYING...' : 'INITIALIZE UPLINK'}
          </button>
        </form>
      </div>
    </div>
  );
};
