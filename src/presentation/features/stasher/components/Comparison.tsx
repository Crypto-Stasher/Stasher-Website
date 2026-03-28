import React from 'react';
import type { ComparisonContent } from '../../../../domain/models/sections';

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
