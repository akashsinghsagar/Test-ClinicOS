import { useState } from 'react';
import FormLogo from './FormLogo';
import PhoneField from './PhoneField';
import Message from './Message';
import SecurityRow from './SecurityRow';
import { MIN_PHONE_DIGITS } from '../constants';
import { digitsOnly, formatPhone } from '../utils';

export default function LoginForm({ onSubmit, onSwitch }) {
  const [code, setCode] = useState('+91');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (digitsOnly(number).length < MIN_PHONE_DIGITS) {
      setMessage({ text: 'Please enter a valid mobile number.', type: 'error' });
      return;
    }
    setMessage(null);
    onSubmit(formatPhone(code, number));
  };

  const placeholder = (provider) => () =>
    setMessage({ text: `${provider} sign-in is a visual placeholder; no external provider is connected.`, type: 'info' });

  return (
    <>
      <FormLogo />
      <div className="step">SECURE ACCESS · 01</div>
      <h2>Welcome back</h2>
      <p className="sub">Sign in to your ClinicOS workspace using your mobile number.</p>
      <form onSubmit={handleSubmit} noValidate>
        <PhoneField id="loginPhone" code={code} number={number} onCodeChange={setCode} onNumberChange={setNumber} />
        <button className="primary" type="submit">Send OTP <span aria-hidden="true">→</span></button>
      </form>
      <div className="social-divider">or continue with</div>
      <div className="socials">
        <button className="social" type="button" onClick={placeholder('Google')}><span className="google">G</span>Google</button>
        <button className="social" type="button" onClick={placeholder('Microsoft')}><span className="microsoft">▦</span>Microsoft</button>
      </div>
      <Message message={message} />
      <p className="link-row">
        New to ClinicOS? <button className="text-link" type="button" onClick={onSwitch}>Create an account</button>
      </p>
      <SecurityRow />
    </>
  );
}
