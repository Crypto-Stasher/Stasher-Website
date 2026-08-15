import React from 'react';
import { Link } from 'react-router-dom';
import { APP_PAGE_CONTENT } from '../../domain/appPageContent';
import { PlatformIcon } from '../shared/components/PlatformIcon';
import { useScrollReveal } from '@hooks';

/**
 * The desktop companion app page (/app).
 *
 * Deliberately download-first: the fold carries the platform buttons, because
 * that is the only thing anyone arrives here to do. Everything below explains
 * what the app is allowed to do — which is the security story, not a feature
 * list.
 */
export const AppPage: React.FC = () => {
  useScrollReveal(true);
  const content = APP_PAGE_CONTENT;

  return (
    <div className="app-page">
      <header className="container app-page-hero">
        <p className="section-title">{content.kicker}</p>
        <h1 className="app-page-title">{content.title}</h1>
        <p className="section-description">{content.intro}</p>

        <div className="app-downloads reveal">
          {content.downloads.map((download) => (
            download.url ? (
              <a key={download.platform} href={download.url} className="app-download" download>
                <PlatformIcon platform={download.platform} />
                <span className="app-download-text">
                  <span className="app-download-platform">{download.label}</span>
                  <span className="app-download-detail">{download.detail}</span>
                </span>
              </a>
            ) : (
              // Not a link and not focusable: there is nothing to download yet.
              <span
                key={download.platform}
                className="app-download app-download--pending"
                aria-disabled="true"
              >
                <PlatformIcon platform={download.platform} />
                <span className="app-download-text">
                  <span className="app-download-platform">{download.label}</span>
                  <span className="app-download-detail">Coming soon</span>
                </span>
              </span>
            )
          ))}
        </div>

        <p className="app-downloads-note">{content.downloadsNote}</p>
      </header>

      <section className="container app-walkthrough">
        <p className="section-title">{content.walkthroughTitle}</p>
        <h2 className="section-heading reveal-blur">{content.walkthroughHeading}</h2>

        <ol className="app-steps stagger">
          {content.walkthrough.map((step, index) => (
            <li key={step.id} className="app-step stagger-item">
              <figure className="app-step-figure">
                <img
                  src={step.src}
                  alt={step.alt}
                  className="app-step-img"
                  width={820}
                  height={1457}
                  /* The first pair is above the fold on a wide screen. */
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <span className="app-step-id" aria-hidden="true">
                  {step.id}
                </span>
              </figure>
              <h3 className="app-step-title">{step.title}</h3>
              <p className="app-step-desc">{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section-dark">
        <div className="container">
          <p className="section-title">What it does</p>
          <h2 className="section-heading reveal-blur">Everything except spend your money</h2>

          <div className="product-feature-list stagger">
            {content.features.map((feature) => (
              <article key={feature.id} className="product-feature-block stagger-item">
                <span className="product-feature-id">{feature.id}</span>
                <div>
                  <h3 className="product-feature-title">{feature.title}</h3>
                  <p className="product-feature-desc">{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container app-requirements">
        <p className="section-title">Before you start</p>
        <h2 className="section-heading reveal-blur">What you need</h2>
        <ul className="product-box-list stagger">
          {content.requirements.map((item) => (
            <li key={item} className="product-box-item stagger-item">
              <span className="product-check" aria-hidden="true">&#x25B8;</span>
              {item}
            </li>
          ))}
        </ul>

        <div className="app-page-cta reveal">
          <Link to="/product" className="cta-button">
            <span>See the device</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
