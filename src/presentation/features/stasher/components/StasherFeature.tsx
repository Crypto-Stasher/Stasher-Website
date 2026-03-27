import React from 'react';
import stasherHero from '../../../../assets/stasher_hero_device.png';
import type {
  HeroContent,
  DifferentiatorItem,
  ComplianceContent,
  AssetsContent,
  ArchitectureContent,
  SecurityContent,
  HowItWorksContent,
  ProductsContent,
  TechStackContent,
} from '../../../../domain/models/Content';
import { Radar } from './Radar';
import { useTextScramble } from '../../../../application/hooks/useTextScramble';

/* ─── HERO ─── */
interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  const scrambledTitle = useTextScramble(content.title);

  return (
    <section className="hero">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4rem' }}>
        <div className="hero-content reveal">
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
        <div className="hero-image reveal" style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative', minWidth: '300px' }}>
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

/* ─── ARCHITECTURE ─── */
interface ArchitectureProps {
  content: ArchitectureContent;
}

export const Architecture: React.FC<ArchitectureProps> = ({ content }) => {
  return (
    <section id="architecture" className="section-dark">
      <div className="container">
        <p className="section-title">{content.subtitle}</p>
        <h2 className="section-heading reveal">{content.title}</h2>
        <p className="section-description reveal">{content.description}</p>

        <div className="arch-zones">
          {content.zones.map((zone) => (
            <div key={zone.zone} className="arch-zone reveal">
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
            <span style={{ color: 'var(--accent-red)' }}>INTERNET</span>
            <span style={{ color: 'var(--accent-yellow)' }}>mTLS BRIDGE</span>
            <span style={{ color: 'var(--accent-cyan)' }}>AIR-GAP</span>
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
      <h2 className="section-heading reveal">{content.title}</h2>
      <p className="section-description reveal">{content.description}</p>

      <div className="security-grid">
        {content.features.map((feature) => (
          <div key={feature.id} className="security-card reveal">
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
        <h2 className="section-heading reveal">{content.title}</h2>

        <div className="ceremony-flow">
          {content.steps.map((step, idx) => (
            <div key={step.step} className="ceremony-step reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
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
              {idx < content.steps.length - 1 && (
                <div className="ceremony-connector" style={{ background: ZONE_COLORS[step.zone] }} />
              )}
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
      <h2 className="section-heading reveal">{title}</h2>
      <div className="features-grid">
        {items.map((item) => (
          <div key={item.id} className="feature-card reveal">
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
        <h2 className="section-heading reveal">{content.title}</h2>

        <div className="products-grid">
          {content.tiers.map((tier) => (
            <div key={tier.id} className={`product-card reveal ${tier.highlight ? 'product-card--highlight' : ''}`}>
              <div className="product-header">
                <h3 className="product-name">{tier.name}</h3>
                <p className="product-tagline">{tier.tagline}</p>
              </div>
              <ul className="product-features">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="product-feature">
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

/* ─── TECH STACK ─── */
interface TechStackProps {
  content: TechStackContent;
}

export const TechStack: React.FC<TechStackProps> = ({ content }) => {
  return (
    <section id="tech" className="container">
      <p className="section-title">{content.subtitle}</p>
      <h2 className="section-heading reveal">{content.title}</h2>

      <div className="tech-grid">
        {content.items.map((item) => (
          <div key={item.name} className="tech-item reveal">
            <div className="tech-category">{item.category}</div>
            <div className="tech-name">{item.name}</div>
            <div className="tech-detail">{item.detail}</div>
          </div>
        ))}
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
        <h2 className="section-heading reveal" style={{ textAlign: 'left' }}>{content.title}</h2>
        <p className="reveal" style={{ maxWidth: '700px', color: 'var(--text-dim)', fontSize: '1.1rem', marginBottom: '4rem' }}>{content.description}</p>
        <div className="compliance-list reveal">
          {content.points.map((point, index) => (
            <div key={index} className="compliance-item">
              {point}
            </div>
          ))}
        </div>
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
    <section id="assets" className="container reveal" style={{ textAlign: 'center' }}>
      <p className="section-title">Asset Deployment</p>
      <h2 className="section-heading">{content.title}</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
        {content.items.map((asset, index) => (
          <span key={index} className="asset-badge">{asset}</span>
        ))}
      </div>
    </section>
  );
};
