import React from 'react';
import btc from 'cryptocurrency-icons/svg/color/btc.svg';
import eth from 'cryptocurrency-icons/svg/color/eth.svg';
import sol from 'cryptocurrency-icons/svg/color/sol.svg';
import xrp from 'cryptocurrency-icons/svg/color/xrp.svg';
import dot from 'cryptocurrency-icons/svg/color/dot.svg';
import ltc from 'cryptocurrency-icons/svg/color/ltc.svg';
import ada from 'cryptocurrency-icons/svg/color/ada.svg';

// Official coin logos from the `cryptocurrency-icons` package (local SVGs).
const LOGOS: Record<string, string> = {
  BITCOIN: btc,
  ETHEREUM: eth,
  SOLANA: sol,
  XRP: xrp,
  POLKADOT: dot,
  LITECOIN: ltc,
  CARDANO: ada,
};

interface CoinIconProps {
  /** Coin name as it appears in content, e.g. "BITCOIN" or "50+ MORE". */
  name: string;
}

export const CoinIcon: React.FC<CoinIconProps> = ({ name }) => {
  const logo = LOGOS[name.toUpperCase()];

  // Catch-all (e.g. "50+ MORE") — neutral chip with the label text.
  if (!logo) {
    const label = name.replace(/MORE/i, '').trim() || '+';
    return (
      <div className="coin-chip coin-chip--more" title={name} aria-label={name}>
        <span className="coin-more">{label}</span>
        <span className="coin-more-sub">more</span>
      </div>
    );
  }

  return (
    <div className="coin-chip" title={name} aria-label={name}>
      <img className="coin-logo" src={logo} alt="" width={34} height={34} loading="lazy" />
      <span className="coin-name">{name.charAt(0) + name.slice(1).toLowerCase()}</span>
    </div>
  );
};
