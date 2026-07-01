import SectionHeader from './SectionHeader.jsx';
import { processSteps } from '../data/siteData.js';
import campaignImage from '../assets/campaign-map.svg';

function Process() {
  return (
    <section id="process" className="section process-section">
      <div className="container process-layout">
        <div>
          <SectionHeader
            eyebrow="Process"
            title="A focused path from noisy marketing to confident decisions"
            description="Every engagement starts with clarity: what is leaking, what can scale, and what deserves your next dollar."
          />

          <div className="process-list">
            {processSteps.map((item) => (
              <article className="process-step" key={item.step}>
                <span>{item.step}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <figure className="process-visual">
          <img src={campaignImage} alt="Campaign planning dashboard with channels and growth signals" />
        </figure>
      </div>
    </section>
  );
}

export default Process;
