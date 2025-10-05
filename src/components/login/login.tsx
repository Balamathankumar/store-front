import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSendVerification } from '../../hooks/useApi';
import HeaderTitle from '../header/header-title/header-title';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    sendVerification,
    loading: sending,
    error: sendError,
  } = useSendVerification();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email.trim() || !name.trim()) {
      setLocalError('Please enter both email and name.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setLocalError('Please enter a valid email address.');
      return;
    }

    try {
      await sendVerification(email.trim(), name.trim());
      navigate('/otp', { state: { email: email.trim() } });
    } catch (err: any) {
      setLocalError(err?.message || sendError || 'Failed to send OTP');
    }
  };
  //  <HiUser className='input-icon' />;

  return (
    <>
      <HeaderTitle />
      <div className='login-page'>
        <div className='login-card'>
          <div className='login-header'>
            <h1>Welcome Back!</h1>
            <p>Login to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit} className='login-form'>
            {(localError || sendError) && (
              <div className='error-message'>{localError || sendError}</div>
            )}

            <div className='input-group'>
              <input
                type='text'
                placeholder='Full Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='input-field'
              />
            </div>

            <div className='input-group'>
              {/* <HiMail className='input-icon' /> */}
              <input
                type='email'
                placeholder='you@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='input-field'
              />
            </div>

            <button
              type='submit'
              disabled={sending}
              className={`submit-btn ${sending ? 'disabled' : ''}`}
            >
              {sending ? 'Sending OTP...' : 'Send OTP'}
            </button>

            <p className='info-text'>
              We'll send you a verification code to login.
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
