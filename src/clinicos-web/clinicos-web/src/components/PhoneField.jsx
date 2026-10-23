import { COUNTRY_CODES } from '../constants';

export default function PhoneField({ id, code, number, onCodeChange, onNumberChange }) {
  return (
    <div className="field">
      <label htmlFor={id}>Mobile number</label>
      <div className="phone-row">
        <select aria-label="Country code" value={code} onChange={(e) => onCodeChange(e.target.value)}>
          {COUNTRY_CODES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
        <input id={id} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210"
          value={number} onChange={(e) => onNumberChange(e.target.value)} required />
      </div>
    </div>
  );
}
