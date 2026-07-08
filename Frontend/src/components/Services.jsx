import SectionHeader from './SectionHeader.jsx';
import { services } from '../data/siteData.js';

function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="The channels, creative, and tracking your growth needs"
          description="Pick a single service or combine them into a coordinated acquisition system with one clear reporting layer."
        />

        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article className="service-card" key={service.title}>
                <span className="icon-box" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Services;
