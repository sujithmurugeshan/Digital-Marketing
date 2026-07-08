import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

function Contact() {
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus({
        type: 'error',
        message: 'Web3Forms access key is missing. Add VITE_WEB3FORMS_ACCESS_KEY to your frontend environment.',
      });
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', 'New strategy call request from Akshu Medias');
    formData.append('from_name', 'Akshu Medias Website');

    setIsSubmitting(true);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.ok && result.success) {
        event.currentTarget.reset();
        setStatus({ type: 'success', message: 'Thanks. Your request has been sent.' });
      } else {
        setStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Could not send your request. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
          <input type="checkbox" name="botcheck" className="hidden" tabIndex="-1" autoComplete="off" />
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
            {isSubmitting ? 'Sending...' : 'Request a strategy call'}
            <ArrowRight size={18} />
          </button>

          {status.message ? (
            <p className={`form-status ${status.type}`} role="status">
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}

export default Contact;
