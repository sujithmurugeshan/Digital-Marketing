import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h2>Ready to make your next campaign easier to measure?</h2>
          <p>
            Tell us what you are trying to grow. We will come back with the biggest opportunities
            we see and a practical first step.
          </p>

          <ul className="contact-points" aria-label="What you receive">
            <li>
              <CheckCircle2 size={18} />
              Funnel review with priority fixes
            </li>
            <li>
              <CheckCircle2 size={18} />
              Channel plan matched to your budget
            </li>
            <li>
              <CheckCircle2 size={18} />
              Reporting model before launch
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" required />
          </label>
          <label>
            Work email
            <input type="email" name="email" placeholder="you@company.com" required />
          </label>
          <label>
            Monthly marketing budget
            <select name="budget" defaultValue="">
              <option value="" disabled>
                Select a range
              </option>
              <option>$2k - $5k</option>
              <option>$5k - $15k</option>
              <option>$15k - $50k</option>
              <option>$50k+</option>
            </select>
          </label>
          <label>
            What do you want to improve?
            <textarea name="message" rows="4" placeholder="Leads, ROAS, SEO, tracking..." />
          </label>

          <button className="button button-primary form-button" type="submit">
            Request a strategy call
            <ArrowRight size={18} />
          </button>

          {submitted ? (
            <p className="form-status" role="status">
              Thanks. Your request is ready to connect to a backend or email service.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default Contact;
