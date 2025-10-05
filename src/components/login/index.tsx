import React, { useState } from 'react';
import { useSendVerification, useVerifyCode } from '../../hooks/useApi';

export default function LoginFlow() {
  const {
    sendVerification,
    loading: sending,
    error: sendError,
  } = useSendVerification();
  const {
    verifyCode,
    loading: verifying,
    error: verifyError,
  } = useVerifyCode();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'login' | 'otp'>('login');

  const handleLogin = async () => {
    await sendVerification(email, name);
    setStep('otp');
  };

  const handleVerify = async () => {
    const result = await verifyCode(email, otp);
    console.log('Verified:', result);
  };

  return (
    <div>
      {step === 'login' && (
        <>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Name'
          />
          <button onClick={handleLogin} disabled={sending}>
            {sending ? 'Sending...' : 'Send Verification'}
          </button>
          {sendError && <p>{sendError}</p>}
        </>
      )}

      {step === 'otp' && (
        <>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder='OTP'
          />
          <button onClick={handleVerify} disabled={verifying}>
            {verifying ? 'Verifying...' : 'Verify OTP'}
          </button>
          {verifyError && <p>{verifyError}</p>}
        </>
      )}
    </div>
  );
}
