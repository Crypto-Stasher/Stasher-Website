import React from 'react';
import { Link } from 'react-router-dom';
import { DEVICE_IMAGE, devicePlateClass } from '../../../../shared/deviceImage';

interface ProductCardProps {
  name: string;
  tagline: string;
  availability: string;
  /** Opens the full-specification modal. */
  onOpenSpecs: () => void;
}

/**
 * Store-style product tile: image panel, name, tagline, then the reserve CTA
 * on the card itself.
 *
 * The card body and the CTA are siblings rather than nested — a <button> may
 * not contain a link, and both need to be reachable by keyboard on their own.
 */
export const ProductCard: React.FC<ProductCardProps> = ({
  name,
  tagline,
  availability,
  onOpenSpecs,
}) => (
  <article className="product-card">
    <button
      type="button"
      className="product-card-open"
      onClick={onOpenSpecs}
      aria-haspopup="dialog"
    >
      <span className={devicePlateClass('product-card-figure')}>
        <img
          src={DEVICE_IMAGE}
          alt={`The ${name} hardware wallet`}
          className="product-card-img"
          width={540}
          height={640}
          fetchPriority="high"
          decoding="async"
        />
      </span>

      <span className="product-card-name">{name}</span>
      <span className="product-card-tagline">{tagline}</span>
      <span className="product-card-hint">
        Full specs
        <span aria-hidden="true">→</span>
      </span>
    </button>

    <Link to="/preorder" className="cta-button product-card-cta">
      <span>Reserve yours</span>
      <span aria-hidden="true">↗</span>
    </Link>

    <p className="product-card-availability">{availability}</p>
  </article>
);
