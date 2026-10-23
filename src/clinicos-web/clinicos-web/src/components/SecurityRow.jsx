const Svg = ({ children }) => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8">{children}</svg>
);

export default function SecurityRow() {
  return (
    <div className="security-row">
      <div className="security-item">
        <Svg><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Svg>
        Secure<br />&amp; Encrypted
      </div>
      <div className="security-item">
        <Svg><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></Svg>
        Privacy-first<br />Architecture
      </div>
      <div className="security-item">
        <Svg><path d="M20 16.5A4.5 4.5 0 0 0 18 8h-1A6 6 0 0 0 5 9.5 4 4 0 0 0 6 17h14Z" /></Svg>
        Built for<br />Healthcare
      </div>
    </div>
  );
}
