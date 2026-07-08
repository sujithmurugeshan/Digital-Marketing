import { ArrowRight, PlayCircle } from 'lucide-react';
import heroImage from '../assets/growth-dashboard.svg';
import { trustItems } from '../data/siteData.js';

function Hero() {
  return (
    <section id="top" className="hero" style={{ '--hero-image': `url(${heroImage})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="eyebrow">Performance marketing for ambitious brands</p>
          <h1>LaunchWave Digital</h1>
          <p className="hero-copy">
            We turn ad spend, search demand, and lifecycle campaigns into a measurable growth
            engine for service businesses, SaaS teams, and ecommerce brands.
          </p>

          <div className="hero-actions" aria-label="Primary calls to action">
            <a className="button button-primary" href="#contact">
              Start growing
              <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="#results">
              <PlayCircle size={18} />
              View results
            </a>
          </div>

          <div className="trust-strip" aria-label="Agency strengths">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <span key={item.label}>
                  <Icon size={18} />
                  {item.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
