import { metrics } from '../data/siteData.js';

function Metrics() {
  return (
    <section className="metrics-section" aria-label="Agency performance metrics">
      <div className="container metrics-grid">
        {metrics.map((metric) => (
          <div className="metric" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Metrics;
