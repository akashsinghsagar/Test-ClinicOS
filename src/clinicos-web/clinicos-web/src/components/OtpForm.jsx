import { useEffect, useRef, useState } from 'react';
import FormLogo from './FormLogo';
import Message from './Message';
import useCountdown from '../hooks/useCountdown';
import { DEMO_OTP, OTP_LENGTH, RESEND_SECONDS } from '../constants';
import { digitsOnly } from '../utils';

const pad = (n) => String(n).padStart(2, '0');

export default function OtpForm({ phone, onVerified, onChangeNumber }) {
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''));
  const [message, setMessage] = useState(null);
  const refs = useRef([]);
  const { remaining, restart } = useCountdown(RESEND_SECONDS);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  const focus = (i) => refs.current[i]?.focus();

  const handleInput = (i, value) => {
    const d = digitsOnly(value).slice(-1);
    setDigits((prev) => prev.map((v, idx) => (idx === i ? d : v)));
    if (d) focus(i + 1);
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i]) focus(i - 1);
    if (e.key === 'ArrowLeft') focus(i - 1);
    if (e.key === 'ArrowRight') focus(i + 1);
  };

  const handlePaste = (e) => {
    const data = digitsOnly(e.clipboardData.getData('text')).slice(0, OTP_LENGTH);
    if (!data) return;
    e.preventDefault();
    setDigits(Array.from({ length: OTP_LENGTH }, (_, i) => data[i] ?? ''));
    focus(Math.min(data.length, OTP_LENGTH - 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (digits.join('') !== DEMO_OTP) {
      setMessage({ text: `Incorrect demo code. Enter ${DEMO_OTP}.`, type: 'error' });
      return;
    }
    onVerified();
  };

  const handleResend = () => {
    setMessage({ text: `Demo OTP is ${DEMO_OTP}. No SMS was sent.`, type: 'info' });
    restart();
  };

  return (
    <>
      <FormLogo />
      <div className="step">MOBILE VERIFICATION · 02</div>
      <h2>Verify your number</h2>
      <p className="sub">We’ve sent a 6-digit OTP to<br /><strong>{phone}</strong></p>
      <div className="message info show">Prototype mode: enter <strong>{DEMO_OTP}</strong>. No SMS is sent.</div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="otp-grid">
          {digits.map((d, i) => (
            <input key={i} ref={(el) => (refs.current[i] = el)} aria-label={`Digit ${i + 1}`} maxLength={1}
              inputMode="numeric" autoComplete={i === 0 ? 'one-time-code' : 'off'} value={d} required
              onChange={(e) => handleInput(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)} onPaste={handlePaste} />
          ))}
        </div>
        <button className="primary" type="submit">Verify OTP <span aria-hidden="true">→</span></button>
      </form>
      <div className="resend-row">
        Didn’t receive the code?{' '}
        <button className="text-link" type="button" onClick={handleResend} disabled={remaining > 0}>Resend code</button>
        <span>{remaining > 0 ? ` · 00:${pad(remaining)}` : ''}</span>
      </div>
      <Message message={message} />
      <p className="change-row"><button className="text-link" type="button" onClick={onChangeNumber}>← Change mobile number</button></p>
      <div className="secure-note">
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></svg>
        Your information is secure and encrypted
      </div>
    </>
  );
}
