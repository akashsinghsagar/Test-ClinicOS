import FormLogo from './FormLogo';

export default function SuccessPanel({ onBack }) {
  return (
    <>
      <FormLogo />
      <div className="step">VERIFICATION COMPLETE · 03</div>
      <h2>You’re verified</h2>
      <p className="sub">Your number has been verified in this prototype. The production app would now load your ClinicOS workspace.</p>
      <div className="message show">Demo complete. No account or session has been created.</div>
      <button className="primary" type="button" onClick={onBack}>Back to sign in</button>
    </>
  );
}
