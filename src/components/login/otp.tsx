import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ApiService from '../../services/api';
import { AuthService } from '../../services/auth.service';
import HeaderTitle from '../header/header-title/header-title';

export function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const email = (location.state as any)?.email || '';

  const handleVerify = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await ApiService.verifyCode(email, otp);
      if (response.success) {
        AuthService.setSession(response);
        navigate('/');
      } else {
        setError(response.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <HeaderTitle />
      <div className='otp-page'>
        <div className='otp-card'>
          <h2 className='otp-title'>Enter OTP</h2>
          <p className='otp-subtitle'>
            A verification code has been sent to <strong>{email}</strong>
          </p>

          {error && <div className='otp-error'>{error}</div>}

          <input
            type='text'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder='Enter OTP'
            className='otp-input'
          />

          <button
            onClick={handleVerify}
            disabled={loading}
            className={`otp-btn ${loading ? 'disabled' : ''}`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </div>
      </div>
    </>
  );
}
