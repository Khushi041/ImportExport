import React, { useEffect, useRef, useState } from 'react';
import './Products.css';

/* ─── Product Data ─────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 'moringa',
    name: 'Moringa Leaf Powder',
    latin: 'Moringa oleifera',
    category: 'Herbal Extract',
    description: 'Rich in nutrients and processed under strict quality standards. Cold-dried at source, retaining 95%+ bioactive compounds for pharmaceutical and nutraceutical grade export.',
    tags: ['Organic', 'Premium Grade', 'Quality Tested'],
    badge: 'Export Quality',
    origin: 'Gujarat, India',
    moq: '500 kg',
    shelf: '24 months',
    cert: 'FSSAI · ISO · USDA Organic',
    hue: '142deg',
    accent: '#2dd4a0',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="58" rx="18" ry="6" fill="rgba(45,212,160,0.12)"/>
        <path d="M40 60 C40 60 20 42 22 28 C24 14 40 10 40 10 C40 10 56 14 58 28 C60 42 40 60 40 60Z" fill="rgba(45,212,160,0.18)" stroke="rgba(45,212,160,0.5)" strokeWidth="1.2"/>
        <path d="M40 60 L40 20" stroke="rgba(45,212,160,0.6)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 38 C34 32 26 32 22 36" stroke="rgba(45,212,160,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M40 44 C46 38 54 38 58 42" stroke="rgba(45,212,160,0.5)" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M40 30 C36 26 30 25 26 28" stroke="rgba(45,212,160,0.4)" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="40" cy="18" r="3" fill="rgba(45,212,160,0.4)"/>
        <circle cx="22" cy="36" r="2" fill="rgba(45,212,160,0.3)"/>
        <circle cx="58" cy="42" r="2" fill="rgba(45,212,160,0.3)"/>
      </svg>
    ),
  },
  {
    id: 'onion',
    name: 'Onion Powder',
    latin: 'Allium cepa',
    category: 'Dehydrated Spice',
    description: 'Premium dehydrated onion powder with strong aroma and long shelf life. Triple-sieved to consistent mesh, ideal for FMCG, food manufacturing, and restaurant supply chains.',
    tags: ['Global Export', 'Premium Grade', 'Quality Tested'],
    badge: 'Export Quality',
    origin: 'Rajasthan, India',
    moq: '1 MT',
    shelf: '18 months',
    cert: 'FSSAI · APEDA · ISO 22000',
    hue: '28deg',
    accent: '#f59e0b',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="62" rx="20" ry="7" fill="rgba(245,158,11,0.10)"/>
        <ellipse cx="40" cy="44" rx="20" ry="22" fill="rgba(245,158,11,0.14)" stroke="rgba(245,158,11,0.45)" strokeWidth="1.2"/>
        <ellipse cx="40" cy="44" rx="13" ry="16" fill="rgba(245,158,11,0.08)" stroke="rgba(245,158,11,0.3)" strokeWidth="1"/>
        <ellipse cx="40" cy="44" rx="6" ry="8" fill="rgba(245,158,11,0.12)"/>
        <path d="M32 24 C34 18 40 15 40 15 C40 15 46 18 48 24" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M40 15 L40 20" stroke="rgba(245,158,11,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="20" y1="44" x2="60" y2="44" stroke="rgba(245,158,11,0.2)" strokeWidth="0.8"/>
        <line x1="22" y1="38" x2="58" y2="38" stroke="rgba(245,158,11,0.2)" strokeWidth="0.8"/>
        <line x1="22" y1="50" x2="58" y2="50" stroke="rgba(245,158,11,0.2)" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    id: 'garlic',
    name: 'Garlic Powder',
    latin: 'Allium sativum',
    category: 'Dehydrated Spice',
    description: 'Finely processed garlic powder ideal for food manufacturing and seasoning. Standardised allicin content, ultra-low moisture for extended shelf stability worldwide.',
    tags: ['Organic', 'Global Export', 'Premium Grade'],
    badge: 'Export Quality',
    origin: 'Madhya Pradesh, India',
    moq: '500 kg',
    shelf: '24 months',
    cert: 'FSSAI · APEDA · BRC Food',
    hue: '50deg',
    accent: '#e2d36b',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="62" rx="18" ry="6" fill="rgba(226,211,107,0.10)"/>
        <path d="M30 52 C24 46 22 36 26 28 C30 20 40 18 40 18 C40 18 50 20 54 28 C58 36 56 46 50 52 C46 56 34 56 30 52Z" fill="rgba(226,211,107,0.14)" stroke="rgba(226,211,107,0.45)" strokeWidth="1.2"/>
        <path d="M35 52 C31 46 30 36 33 28 C36 22 40 20 40 20 C40 20 44 22 47 28 C50 36 49 46 45 52" fill="rgba(226,211,107,0.1)" stroke="rgba(226,211,107,0.3)" strokeWidth="1"/>
        <path d="M38 52 L38 18 M40 18 L40 52 M42 52 L42 18" stroke="rgba(226,211,107,0.2)" strokeWidth="0.8" strokeLinecap="round"/>
        <path d="M36 16 C37 12 40 10 40 10 C40 10 43 12 44 16" stroke="rgba(226,211,107,0.55)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        <path d="M40 10 L40 16" stroke="rgba(226,211,107,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'pomegranate',
    name: 'Pomegranate',
    latin: 'Punica granatum',
    category: 'Fresh Export Fruit',
    description: 'Fresh export-grade pomegranates selected for international markets. Bhagwa and Arakta varieties, hand-sorted to 250–400g with full cold-chain logistics support.',
    tags: ['Organic', 'Global Export', 'Quality Tested'],
    badge: 'Export Quality',
    origin: 'Maharashtra, India',
    moq: '5 MT',
    shelf: '6 months',
    cert: 'APEDA · GlobalGAP · USDA',
    hue: '350deg',
    accent: '#f87171',
    icon: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="40" cy="64" rx="18" ry="5" fill="rgba(248,113,113,0.10)"/>
        <circle cx="40" cy="44" r="22" fill="rgba(248,113,113,0.14)" stroke="rgba(248,113,113,0.45)" strokeWidth="1.2"/>
        <circle cx="40" cy="44" r="16" fill="rgba(248,113,113,0.08)"/>
        {/* crown */}
        <path d="M33 23 L33 18 M37 22 L36 17 M40 22 L40 16 M43 22 L44 17 M47 23 L47 18" stroke="rgba(248,113,113,0.55)" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M33 23 L47 23" stroke="rgba(248,113,113,0.45)" strokeWidth="1.2"/>
        {/* seeds hint */}
        {[
          [36,38],[44,38],[40,43],[34,46],[46,46],[38,51],[42,51]
        ].map(([cx,cy],i) => (
          <ellipse key={i} cx={cx} cy={cy} rx="2.5" ry="3.5" fill="rgba(248,113,113,0.35)" stroke="rgba(248,113,113,0.5)" strokeWidth="0.5"/>
        ))}
      </svg>
    ),
  },
];

const STATS = [
  { value: 50,   suffix: '+',  label: 'Countries Served',     icon: '🌐' },
  { value: 1000, suffix: '+',  label: 'MT Exported/Year',     icon: '⚓' },
  { value: 98,   suffix: '%',  label: 'Client Satisfaction',  icon: '✦' },
  { value: 24,   suffix: '/7', label: 'Global Support',       icon: '◎' },
];

/* ─── Counter hook ─────────────────────────────────────────── */
function useCountUp(target, duration, active) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

function StatItem({ value, suffix, label, icon, active }) {
  const count = useCountUp(value, 2400, active);
  return (
    <div className="ps-stat">
      <span className="ps-stat__icon" aria-hidden="true">{icon}</span>
      <div className="ps-stat__value">
        {count}<span className="ps-stat__suffix">{suffix}</span>
      </div>
      <div className="ps-stat__label">{label}</div>
    </div>
  );
}

/* ─── Product Card ─────────────────────────────────────────── */
function ProductCard({ product }) {
  const { name, latin, category, description, tags, badge, origin, moq, shelf, cert, accent, icon } = product;
  return (
    <article className="pc" style={{ '--accent': accent, '--accent-dim': `${accent}22`, '--accent-mid': `${accent}55` }}>
      {/* Image area */}
      <div className="pc__image">
        <div className="pc__image-bg" aria-hidden="true" />
        <div className="pc__icon-wrap" aria-hidden="true">{icon}</div>
        <div className="pc__image-grid" aria-hidden="true" />
        {/* Badge */}
        <div className="pc__badge">{badge}</div>
        {/* Category pill */}
        <div className="pc__category">{category}</div>
      </div>

      {/* Body */}
      <div className="pc__body">
        <div className="pc__meta">
          <span className="pc__origin">
            <svg width="9" height="12" viewBox="0 0 9 12" fill="none"><path d="M4.5 0C2.01 0 0 2.01 0 4.5c0 3.37 4.5 7.5 4.5 7.5S9 7.87 9 4.5C9 2.01 6.99 0 4.5 0zm0 6.5A2 2 0 1 1 4.5 2.5a2 2 0 0 1 0 4z" fill="currentColor"/></svg>
            {origin}
          </span>
          <span className="pc__moq">MOQ {moq}</span>
        </div>

        <h3 className="pc__name">{name}</h3>
        <p className="pc__latin">{latin}</p>
        <p className="pc__desc">{description}</p>

        {/* Specs row */}
        <div className="pc__specs">
          <div className="pc__spec">
            <span className="pc__spec-label">Shelf Life</span>
            <span className="pc__spec-value">{shelf}</span>
          </div>
          <div className="pc__spec-divider" />
          <div className="pc__spec">
            <span className="pc__spec-label">Certifications</span>
            <span className="pc__spec-value">{cert}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="pc__tags">
          {tags.map(t => <span key={t} className="pc__tag">{t}</span>)}
        </div>

        {/* CTA */}
        <button className="pc__cta">
          <span>View Details</span>
          <span className="pc__cta-arrow" aria-hidden="true">
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
              <path d="M1 5H13M9 1L13 5L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
      </div>

      {/* Glow border */}
      <div className="pc__glow-border" aria-hidden="true" />
    </article>
  );
}

/* ─── Main Component ───────────────────────────────────────── */
export default function Products() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const [statsOn,   setStatsOn]   = useState(false);
  const [isPaused,  setIsPaused]  = useState(false);

  /* Intersection observer for stats */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Duplicate cards for seamless loop */
  const allCards = [...PRODUCTS, ...PRODUCTS, ...PRODUCTS];

  return (
    <section className="products-section" id="products" ref={sectionRef}>
      {/* ── Background ── */}
      <div className="ps-bg" aria-hidden="true">
        <div className="ps-bg__grid" />
        <div className="ps-bg__radial-1" />
        <div className="ps-bg__radial-2" />
        <div className="ps-bg__radial-3" />
        {/* Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={`ps-particle ps-particle--${i % 5}`} />
        ))}
      </div>

      {/* ── Section Header ── */}
      <div className="ps-header">
        <div className="ps-header__eyebrow">
          <span className="ps-eyebrow-dot" />
          <span>GOHIL EXPORTS — PRODUCT PORTFOLIO</span>
          <span className="ps-eyebrow-dot" />
        </div>
        <h2 className="ps-header__title">
          Premium Export<br />
          <span className="ps-title-accent">Products</span>
        </h2>
        <p className="ps-header__sub">
          Supplying high-quality agricultural and food products to global markets
          with strict quality standards and reliable export solutions.
        </p>

        {/* Stats row */}
        <div className="ps-stats">
          {STATS.map(s => (
            <StatItem key={s.label} {...s} active={statsOn} />
          ))}
        </div>
      </div>

      {/* ── Carousel ── */}
      <div
        className="ps-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Product showcase carousel"
      >
        {/* Fade masks */}
        <div className="ps-carousel__fade-left"  aria-hidden="true" />
        <div className="ps-carousel__fade-right" aria-hidden="true" />

        <div
          className={`ps-track${isPaused ? ' ps-track--paused' : ''}`}
          ref={trackRef}
        >
          {allCards.map((p, i) => (
            <div className="ps-track__slide" key={`${p.id}-${i}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer strip ── */}
      <div className="ps-footer-strip">
        <div className="ps-footer-strip__inner">
          {['APEDA Registered', 'ISO 22000', 'FSSAI Certified', 'GlobalGAP', 'USDA Organic', 'BRC Food Safety', 'Phytosanitary Certified'].map(cert => (
            <span key={cert} className="ps-cert-badge">{cert}</span>
          ))}
        </div>
      </div>
    </section>
  );
}