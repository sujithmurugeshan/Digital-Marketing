import { useEffect, useRef, useState } from 'react';
import { Target } from 'lucide-react';
import { industries, industryFilters } from '../data/siteData.js';

function Industries() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [industryCount, setIndustryCount] = useState(0);
  const gridRef = useRef(null);
  const heroRef = useRef(null);
  const countedRef = useRef(false);

  useEffect(() => {
    const cards = Array.from(gridRef.current?.querySelectorAll('.industry-card') ?? []);

    if (!cards.length) {
      return undefined;
    }

    cards.forEach((card, index) => {
      card.style.setProperty('--delay', `${(index % 8) * 60}ms`);
    });

    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-revealed'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-revealed');
          window.setTimeout(() => {
            entry.target.style.removeProperty('--delay');
          }, 900);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) {
      return undefined;
    }

    const animateCounter = () => {
      const duration = 1200;
      const target = industries.length;
      const start = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;

        setIndustryCount(Math.round(eased * target));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      animateCounter();
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || countedRef.current) {
            return;
          }

          countedRef.current = true;
          animateCounter();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, []);

  const updateSpotlight = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <section id="industries" className="section industries-section">
      <div className="container industries-container">
        <div className="industries-heading-row">
          <div>
            <p className="eyebrow industries-eyebrow">Industries We Serve</p>
            <h2 className="industries-title">
              One agency.
              <br />
              <span>Fourteen markets</span> we already speak the language of.
            </h2>
          </div>
          <p className="industries-subcopy">
            Every industry moves differently. <strong>We tune the strategy</strong>, not the other
            way around.
          </p>
        </div>

        <div className="industry-filters" aria-label="Industry filters">
          {industryFilters.map((filter) => (
            <button
              className={`industry-chip ${activeFilter === filter.value ? 'is-active' : ''}`}
              type="button"
              aria-pressed={activeFilter === filter.value}
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="industry-grid" ref={gridRef}>
          <article
            className="industry-card industry-card--hero"
            ref={heroRef}
            onPointerMove={updateSpotlight}
          >
            <span className="industry-index" aria-hidden="true">
              {industries.length}
            </span>
            <span className="industry-icon-wrap" aria-hidden="true">
              <Target size={22} />
            </span>
            <div className="industry-hero-copy">
              <div className="industry-counter-row">
                <span className="industry-counter">{industryCount}</span>
                <span className="industry-counter-label">Industries served</span>
              </div>
              <p className="industry-headline">
                Different markets.<span>.</span>
                <br />
                Same obsession<span>:</span> growth.
              </p>
            </div>
          </article>

          {industries.map((industry, index) => {
            const Icon = industry.icon;
            const isDimmed =
              activeFilter !== 'all' && !industry.categories.includes(activeFilter);

            return (
              <article
                className={`industry-card ${industry.wide ? 'industry-card--wide' : ''} ${
                  isDimmed ? 'is-dimmed' : ''
                }`}
                key={industry.title}
                onPointerMove={updateSpotlight}
              >
                <span className="industry-index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="industry-icon-wrap" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <div className="industry-name-block">
                  <h3>{industry.title}</h3>
                  <p>{industry.tag}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Industries;
