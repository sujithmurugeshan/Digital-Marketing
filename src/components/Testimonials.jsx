import SectionHeader from './SectionHeader.jsx';
import { testimonials } from '../data/siteData.js';

function Testimonials() {
  return (
    <section className="section testimonial-section">
      <div className="container">
        <SectionHeader
          eyebrow="Client notes"
          title="Clear strategy, cleaner reporting, stronger leads"
          description="Teams work with us when they want less marketing fog and more accountable growth."
        />

        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <figure className="testimonial" key={testimonial.name}>
              <blockquote>{testimonial.quote}</blockquote>
              <figcaption>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
