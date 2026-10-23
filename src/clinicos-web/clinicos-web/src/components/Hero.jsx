import { HERO_COPY } from '../constants';

export default function Hero({ mode }) {
  const c = HERO_COPY[mode];
  return (
    <section className="hero">
      <div className="eyebrow">Care operations, thoughtfully connected</div>
      <h1>{c.title}<span>{c.accent}</span></h1>
      <p className="hero-copy">{c.text}</p>
      <div className="features">
        {c.features.map((f) => (
          <div className="feature" key={f.label}><span className="feature-icon">{f.icon}</span>{f.label}</div>
        ))}
      </div>
    </section>
  );
}
