import { useState } from 'react';
import FormLogo from './FormLogo';
import PhoneField from './PhoneField';
import Message from './Message';
import SecurityRow from './SecurityRow';
import { MIN_PHONE_DIGITS, ROLES } from '../constants';
import { digitsOnly, formatPhone } from '../utils';

const initial = { fullName: '', clinicName: '', code: '+91', phone: '', email: '', role: '' };

export default function SignupForm({ onSubmit, onSwitch }) {
  const [form, setForm] = useState(initial);
  const [message, setMessage] = useState(null);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    if (digitsOnly(form.phone).length < MIN_PHONE_DIGITS) {
      setMessage({ text: 'Please enter a valid mobile number.', type: 'error' });
      return;
    }
    setMessage(null);
    onSubmit(formatPhone(form.code, form.phone));
  };

  return (
    <>
      <FormLogo />
      <div className="step">CREATE WORKSPACE · 01</div>
      <h2>Create your account</h2>
      <p className="sub">Get started with ClinicOS in a few steps.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="fullName">Full name</label>
          <input id="fullName" autoComplete="name" placeholder="Enter your full name" value={form.fullName} onChange={set('fullName')} required />
        </div>
        <div className="field">
          <label htmlFor="clinicName">Clinic name</label>
          <input id="clinicName" placeholder="Your clinic or practice name" value={form.clinicName} onChange={set('clinicName')} required />
        </div>
        <PhoneField id="signupPhone" code={form.code} number={form.phone}
          onCodeChange={(v) => setForm((f) => ({ ...f, code: v }))}
          onNumberChange={(v) => setForm((f) => ({ ...f, phone: v }))} />
        <div className="field">
          <label htmlFor="email">Email address</label>
          <input id="email" type="email" autoComplete="email" placeholder="you@clinic.com" value={form.email} onChange={set('email')} required />
        </div>
        <div className="field">
          <label htmlFor="role">Your role</label>
          <select id="role" value={form.role} onChange={set('role')} required>
            <option value="">Select your role</option>
            {ROLES.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <button className="primary" type="submit">Create account <span aria-hidden="true">→</span></button>
      </form>
      <Message message={message} />
      <p className="link-row">
        Already have an account? <button className="text-link" type="button" onClick={onSwitch}>Sign in</button>
      </p>
      <SecurityRow />
    </>
  );
}
