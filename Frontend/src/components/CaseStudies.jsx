import { ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader.jsx';
import { caseStudies } from '../data/siteData.js';

function CaseStudies() {
  return (
    <section id="results" className="section results-section">
      <div className="container">
        <SectionHeader
          eyebrow="Results"
          title="Campaigns built to show their work"
          description="A few examples of the kind of measurable improvements a tighter marketing system can create."
        />

        <div className="case-grid">
          {caseStudies.map((study) => (
            <article className="case-card" key={study.company}>
              <div>
                <span className="case-category">{study.category}</span>
                <h3>{study.company}</h3>
              </div>
              <strong>{study.result}</strong>
              <p>{study.description}</p>
              <a href="#contact" aria-label={`Discuss results like ${study.company}`}>
                Talk through a similar project
                <ArrowUpRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudies;
