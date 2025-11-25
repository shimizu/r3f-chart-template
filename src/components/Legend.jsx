import React from 'react';

const Legend = ({ yScale, colorScale }) => {
  if (!yScale || !colorScale) return null;

  const ticks = yScale.ticks(5);
  const legendHeight = 200; // in pixels
  const legendWidth = 20; // in pixels

  const gradient = `linear-gradient(to top, ${colorScale.range().join(', ')})`;

  return (
    <div style={{ position: 'absolute', top: '50%', right: '50px', color: '#366', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center' }}>
      <div style={{ width: legendWidth, height: legendHeight, background: gradient }} />
      <div style={{ marginLeft: '5px', height: legendHeight, position: 'relative' }}>
        {ticks.map((tick, i) => {
          const position = (tick - yScale.domain()[0]) / (yScale.domain()[1] - yScale.domain()[0]);
          return (
            <div key={i} style={{ position: 'absolute', bottom: `${position * 100}%`, transform: 'translateY(50%)', fontSize: '12px' }}>
              - {Math.round(tick)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Legend;
