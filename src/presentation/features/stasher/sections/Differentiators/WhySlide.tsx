import React from 'react';
import type { DifferentiatorItem } from '@models/sections';
import { useTextScramble } from '@hooks';

interface WhySlideProps {
  item: DifferentiatorItem;
  state: 'idle' | 'active' | 'leaving';
  /** Which half the copy occupies; the object takes the other. */
  textSide: 'left' | 'right';
}

/**
 * One frame of the Why Stasher stage.
 *
 * Split out of the section so each slide can own a scramble instance for its
 * kicker — the hook is per-component, and the effect has to re-run when this
 * particular slide takes the screen.
 */
export const WhySlide: React.FC<WhySlideProps> = ({ item, state, textSide }) => {
  const label = `${item.id} // ${item.label}`;
  const scrambled = useTextScramble(label, state === 'active');

  return (
    <div
      className={`why-slide ${state === 'active' ? 'is-active' : ''} ${state === 'leaving' ? 'is-leaving' : ''}`}
      aria-hidden={state !== 'active'}
    >
      <div className={`container why-slide-inner why-slide-inner--text-${textSide}`}>
        <div className="why-slide-copy">
          {/* Falls back to the plain label so the prerendered HTML carries the
              real text, not an empty node waiting on the scramble. */}
          <p className="node-label">{scrambled || label}</p>

          {/* Split into words so each can flip up out of its own mask — the
              title lands a word at a time rather than all at once. */}
          <h3>
            {item.title.split(' ').map((word, wordIndex, words) => (
              <React.Fragment key={`${word}-${wordIndex}`}>
                <span
                  className="why-word"
                  style={{ '--word-index': wordIndex } as React.CSSProperties}
                >
                  <span>{word}</span>
                </span>
                {/* Real text node, not a margin: the space has to stay
                    collapsible so the line still wraps naturally. */}
                {wordIndex < words.length - 1 ? ' ' : null}
              </React.Fragment>
            ))}
          </h3>

          <p className="why-slide-desc">{item.description}</p>
        </div>
      </div>
    </div>
  );
};
