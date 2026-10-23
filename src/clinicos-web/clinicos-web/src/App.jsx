import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import OtpForm from './components/OtpForm';
import SuccessPanel from './components/SuccessPanel';
import { LOGO_SRC } from './constants';

export default function App() {
  const [view, setView] = useState('login'); // login | signup | otp | success
  const [flow, setFlow] = useState('login');
  const [phone, setPhone] = useState('');
  const isSignup = view === 'signup';

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [view]);

  const startOtp = (nextFlow) => (formattedPhone) => {
    setFlow(nextFlow);
    setPhone(formattedPhone);
    setView('otp');
  };

  return (
    <div className="page">
      <div className="background" aria-hidden="true" />
      <div className="ambient" aria-hidden="true"><span className="orb one" /><span className="orb two" /></div>

      <header className="topbar">
        <div className="brand-shell">
          <img className="brand-logo" src={LOGO_SRC} alt="ClinicOS — Smarter Clinics. Healthier Communities." />
        </div>
        <div className="top-actions">
          <span>{isSignup ? 'Already have an account?' : 'New to ClinicOS?'}</span>
          <button type="button" onClick={() => setView(isSignup ? 'login' : 'signup')}>
            {isSignup ? 'Sign in' : 'Create account'}
          </button>
        </div>
      </header>

      <main>
        <Hero mode={isSignup ? 'signup' : 'login'} />
        <section className="auth-card" aria-live="polite">
          <section className="screen active">
            {view === 'login' && <LoginForm onSubmit={startOtp('login')} onSwitch={() => setView('signup')} />}
            {view === 'signup' && <SignupForm onSubmit={startOtp('signup')} onSwitch={() => setView('login')} />}
            {view === 'otp' && (
              <OtpForm phone={phone} onVerified={() => setView('success')}
                onChangeNumber={() => setView(flow === 'signup' ? 'signup' : 'login')} />
            )}
            {view === 'success' && <SuccessPanel onBack={() => setView('login')} />}
          </section>
        </section>
      </main>

      <footer className="footer">
        <span>© ClinicOS · Smarter Clinics. Healthier Communities.</span>
        <span>Glassmorphism theme prototype · No backend connected</span>
      </footer>
    </div>
  );
}
