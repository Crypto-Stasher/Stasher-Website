import React, { useState } from 'react';
import stasherHero from '../../../../assets/stasher_hero_device.png';
import type {
  HeroContent,
  StatsContent,
  DifferentiatorItem,
  ComplianceContent,
  AssetsContent,
  ArchitectureContent,
  SecurityContent,
  HowItWorksContent,
  ProductsContent,
  TechStackContent,
  AppShowcaseContent,
  ComparisonContent,
  OpenSourceContent,
  FaqContent,
  NewsletterContent,
} from '../../../../domain/models/Content';
import { Radar } from './Radar';
import { useTextScramble } from '../../../../application/hooks/useTextScramble';

/* ─── DIVIDERS ─── */
export const Divider: React.FC<{ variant?: 'line' | 'glow' | 'dots' }> = ({ variant = 'line' }) => {
  if (variant === 'dots') {
    return (
      <div className="divider-dots divider-animated">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
      </div>
    );
  }
  return <div className={`divider-animated ${variant === 'glow' ? 'divider-glow' : ''}`} />;
};

/* ─── HERO ─── */
interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const scrambledTitle = useTextScramble(content.title);

  return (
    <section className="hero">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
        <div className="hero-content reveal-left">
          <span className="tech-tag">{content.tag}</span>
          <h1 style={{ minHeight: '1.2em' }}>{scrambledTitle}</h1>
          <p style={{ maxWidth: '600px', fontSize: '1.1rem', marginBottom: '3rem' }}>{content.description}</p>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <button className="cta-button">{content.cta}</button>
            <div style={{ borderLeft: '1px solid var(--border-neon)', paddingLeft: '1.5rem' }}>
              <div className="node-label">NETWORK LOAD</div>
              <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontWeight: 700 }}>{content.networkLoad}</div>
            </div>
          </div>
        </div>
        <div className="hero-image reveal-right" style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', minWidth: '300px' }}>
          <Radar />
          <img
            src={stasherHero}
            alt="Stasher Hardware"
            style={{ width: '100%', maxWidth: '540px', position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 30px rgba(0, 242, 254, 0.15))' }}
          />
        </div>
      </div>
    </section>
  );
};

/* ─── STATS BAR ─── */
interface StatsProps {
  content: StatsContent;
}

export const Stats: React.FC<StatsProps> = ({ content }) => {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid stagger">
          {content.items.map((item, idx) => (
            <div key={idx} className="stat-item stagger-item">
              <div className="stat-value">{item.value}</div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── ARCHITECTURE ─── */
interface ArchitectureProps {
  content: ArchitectureContent;
}

export const Architecture: React.FC<ArchitectureProps> = ({ content }) => {
  return (
    <section id="architecture" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>
        <p className="section-description reveal">{content.description}</p>

        <div className="arch-zones stagger">
          {content.zones.map((zone) => (
            <div key={zone.zone} className="arch-zone stagger-item">
              <div className="arch-zone-header" style={{ borderColor: zone.color }}>
                <span className="arch-zone-label" style={{ color: zone.color }}>{zone.zone}</span>
              </div>
              <div className="arch-machines">
                {zone.machines.map((machine) => (
                  <div key={machine.name} className="arch-machine">
                    <div className="arch-machine-name" style={{ color: zone.color }}>{machine.name}</div>
                    <div className="arch-machine-role">{machine.role}</div>
                    <div className="arch-machine-detail">{machine.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="arch-flow reveal">
          <div className="arch-flow-line" />
          <div className="arch-flow-labels">
            <span style={{ color: 'var(--accent-cyan)' }}>OFFLINE</span>
            <span style={{ color: 'var(--accent-yellow)' }}>BRIDGE</span>
            <span style={{ color: 'var(--accent-blue)' }}>MOBILE</span>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── SECURITY ─── */
interface SecurityProps {
  content: SecurityContent;
}

export const Security: React.FC<SecurityProps> = ({ content }) => {
  return (
    <section id="security" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>
      <p className="section-description reveal">{content.description}</p>

      <div className="security-grid stagger">
        {content.features.map((feature) => (
          <div key={feature.id} className="security-card stagger-item">
            <div className="security-icon">{feature.icon}</div>
            <div className="security-id">{feature.id}</div>
            <h3 className="security-title">{feature.title}</h3>
            <p className="security-desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── HOW IT WORKS ─── */
interface HowItWorksProps {
  content: HowItWorksContent;
}

const ZONE_COLORS: Record<string, string> = {
  hot: 'var(--accent-red)',
  dmz: 'var(--accent-yellow)',
  cold: 'var(--accent-cyan)',
};

export const HowItWorks: React.FC<HowItWorksProps> = ({ content }) => {
  return (
    <section id="how-it-works" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>

        <div className="ceremony-flow stagger">
          {content.steps.map((step) => (
            <div key={step.step} className="ceremony-step stagger-item">
              <div className="ceremony-step-number" style={{ borderColor: ZONE_COLORS[step.zone], color: ZONE_COLORS[step.zone] }}>
                {String(step.step).padStart(2, '0')}
              </div>
              <div className="ceremony-step-content">
                <div className="ceremony-step-label">{step.label}</div>
                <div className="ceremony-zone-tag" style={{ color: ZONE_COLORS[step.zone], borderColor: ZONE_COLORS[step.zone] }}>
                  {step.zone.toUpperCase()}
                </div>
                <p className="ceremony-step-desc">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── DIFFERENTIATORS ─── */
interface DifferentiatorsProps {
  title: string;
  items: DifferentiatorItem[];
}

export const Differentiators: React.FC<DifferentiatorsProps> = ({ title, items }) => {
  return (
    <section id="differentiators" className="container">
      <p className="section-title">Institutional Core</p>
      <h2 className="section-heading reveal-blur">{title}</h2>
      <div className="features-grid stagger">
        {items.map((item) => (
          <div key={item.id} className="feature-card stagger-item">
            <div className="glare" />
            <div className="node-label">{item.id} // {item.label}</div>
            <h3>{item.title}</h3>
            <p style={{ color: 'var(--text-dim)', position: 'relative', zIndex: 1 }}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── PRODUCTS ─── */
interface ProductsProps {
  content: ProductsContent;
}

export const Products: React.FC<ProductsProps> = ({ content }) => {
  return (
    <section id="products" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>

        <div className="products-grid">
          {content.tiers.map((tier, idx) => (
            <div key={tier.id} className={`product-card ${idx === 0 ? 'reveal-left' : 'reveal-right'} ${tier.highlight ? 'product-card--highlight' : ''}`}>
              <div className="product-header">
                <h3 className="product-name">{tier.name}</h3>
                <p className="product-tagline">{tier.tagline}</p>
              </div>
              <ul className="product-features">
                {tier.features.map((feature, fidx) => (
                  <li key={fidx} className="product-feature">
                    <span className="product-check">&#x25B8;</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── APP SHOWCASE ─── */
interface AppShowcaseProps {
  content: AppShowcaseContent;
}

export const AppShowcase: React.FC<AppShowcaseProps> = ({ content }) => {
  return (
    <section id="app" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>
      <p className="section-description reveal">{content.description}</p>

      <div className="app-grid stagger">
        {content.features.map((feature, idx) => (
          <div key={idx} className="app-feature-card stagger-item">
            <div className="app-feature-number">{String(idx + 1).padStart(2, '0')}</div>
            <h3 className="app-feature-title">{feature.title}</h3>
            <p className="app-feature-desc">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="app-download reveal-scale">
        <p className="app-download-label">AVAILABLE ON</p>
        <div className="app-download-buttons">
          {content.downloadLinks.map((link) => (
            <a key={link.platform} href={link.url} className="app-download-btn">
              {link.platform === 'iOS' ? 'App Store' : 'Google Play'}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── COMPARISON TABLE ─── */
interface ComparisonProps {
  content: ComparisonContent;
}

export const Comparison: React.FC<ComparisonProps> = ({ content }) => {
  return (
    <section id="compare" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>

        <div className="comparison-table-wrapper reveal-scale">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="comparison-highlight">Stasher</th>
                <th>{content.competitors[0]}</th>
                <th>{content.competitors[1]}</th>
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row, idx) => (
                <tr key={idx}>
                  <td className="comparison-feature">{row.feature}</td>
                  <td className="comparison-highlight">{row.stasher}</td>
                  <td>{row.competitor1}</td>
                  <td>{row.competitor2}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

/* ─── TECH STACK ─── */
interface TechStackProps {
  content: TechStackContent;
}

export const TechStack: React.FC<TechStackProps> = ({ content }) => {
  return (
    <section id="tech" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>

      <div className="tech-grid stagger">
        {content.items.map((item) => (
          <div key={item.name} className="tech-item stagger-item">
            <div className="tech-category">{item.category}</div>
            <div className="tech-name">{item.name}</div>
            <div className="tech-detail">{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── OPEN SOURCE ─── */
interface OpenSourceProps {
  content: OpenSourceContent;
}

export const OpenSource: React.FC<OpenSourceProps> = ({ content }) => {
  return (
    <section id="open-source" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>
        <p className="section-description reveal">{content.description}</p>

        <div className="opensource-grid stagger">
          {content.points.map((point, idx) => (
            <div key={idx} className="opensource-card stagger-item">
              <div className="opensource-number">{String(idx + 1).padStart(2, '0')}</div>
              <h3 className="opensource-title">{point.title}</h3>
              <p className="opensource-desc">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── COMPLIANCE ─── */
interface ComplianceProps {
  content: ComplianceContent;
}

export const Compliance: React.FC<ComplianceProps> = ({ content }) => {
  return (
    <section id="compliance" style={{ background: 'rgba(0, 242, 254, 0.01)', borderTop: '1px solid var(--border-neon)', borderBottom: '1px solid var(--border-neon)' }}>
      <div className="container">
        <p className="section-title">Operations & Audit</p>
        <h2 className="section-heading reveal-left" style={{ textAlign: 'left' }}>{content.title}</h2>
        <p className="reveal" style={{ maxWidth: '700px', color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '4rem' }}>{content.description}</p>
        <div className="compliance-list stagger">
          {content.points.map((point, index) => (
            <div key={index} className="compliance-item stagger-item">
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── FAQ ─── */
interface FaqProps {
  content: FaqContent;
}

export const Faq: React.FC<FaqProps> = ({ content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal-blur">{content.title}</h2>

      <div className="faq-list stagger">
        {content.items.map((item, idx) => (
          <div
            key={idx}
            className={`faq-item stagger-item ${openIndex === idx ? 'faq-item--open' : ''}`}
          >
            <button
              className="faq-question"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              aria-expanded={openIndex === idx}
            >
              <span>{item.question}</span>
              <span className="faq-toggle">{openIndex === idx ? '\u2212' : '+'}</span>
            </button>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── ASSETS ─── */
interface AssetsProps {
  content: AssetsContent;
}

export const Assets: React.FC<AssetsProps> = ({ content }) => {
  return (
    <section id="assets" className="section-dark" style={{ textAlign: 'center' }}>
      <div className="container">
        <p className="section-title">Asset Deployment</p>
        <h2 className="section-heading reveal-blur">{content.title}</h2>
        <div className="stagger" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          {content.items.map((asset, index) => (
            <span key={index} className="asset-badge stagger-item">{asset}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── NEWSLETTER ─── */
interface NewsletterProps {
  content: NewsletterContent;
}

export const Newsletter: React.FC<NewsletterProps> = ({ content }) => {
  return (
    <section id="newsletter" className="container">
      <div className="newsletter-box reveal-scale">
        <h2 className="newsletter-title">{content.title}</h2>
        <p className="newsletter-desc">{content.description}</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            className="newsletter-input"
            placeholder={content.placeholder}
            required
          />
          <button type="submit" className="cta-button">{content.cta}</button>
        </form>
      </div>
    </section>
  );
};
