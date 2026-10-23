import { LOGO_SRC } from '../constants';

export default function FormLogo() {
  return (
    <div className="form-logo-shell">
      <img className="form-logo" src={LOGO_SRC} alt="ClinicOS" />
    </div>
  );
}
