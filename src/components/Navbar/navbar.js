import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Products', href: '#products' },
  {
    label: 'Country',
    href: '#country',
    dropdown: [
      { label: 'United States',  code: 'US', region: 'Americas'    },
      { label: 'United Kingdom', code: 'GB', region: 'Europe'      },
      { label: 'UAE',            code: 'AE', region: 'Middle East'  },
      { label: 'Germany',        code: 'DE', region: 'Europe'      },
      { label: 'Australia',      code: 'AU', region: 'Asia Pacific' },
      { label: 'Canada',         code: 'CA', region: 'Americas'    },
      { label: 'Singapore',      code: 'SG', region: 'Asia Pacific' },
      { label: 'Netherlands',    code: 'NL', region: 'Europe'      },
    ],
  },
  { label: 'Contact Us', href: '#contact' },
];

const REGION_COLORS = {
  'Americas':     '#2C74B3',
  'Europe':       '#205295',
  'Middle East':  '#144272',
  'Asia Pacific': '#0A2647',
};

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [dropdownOpen,  setDropdownOpen]  = useState(false);
  const [activeLink,    setActiveLink]    = useState('Home');
  const [mobileCountry, setMobileCountry] = useState(false);
  const dropdownRef  = useRef(null);
  const dropTimerRef = useRef(null);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 960) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Smooth scroll + close mobile
  const handleNavClick = useCallback((e, link) => {
    e.preventDefault();
    setActiveLink(link.label);
    setMobileOpen(false);
    setDropdownOpen(false);
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleCountryHover  = () => { clearTimeout(dropTimerRef.current); setDropdownOpen(true); };
  const handleCountryLeave  = () => { dropTimerRef.current = setTimeout(() => setDropdownOpen(false), 180); };

  const grouped = NAV_LINKS.find(l => l.label === 'Country').dropdown.reduce((acc, c) => {
    if (!acc[c.region]) acc[c.region] = [];
    acc[c.region].push(c);
    return acc;
  }, {});

  return (
    <>
      <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}${mobileOpen ? ' navbar--mobile-open' : ''}`}>
        <div className="navbar__inner">

          {/* ── LOGO ── */}
          <a href="#home" className="navbar__logo" onClick={e => handleNavClick(e, { href: '#home', label: 'Home' })}>
            <div className="logo__globe-wrap" aria-hidden="true">
              <div className="logo__globe">
                <div className="logo__meridian logo__meridian--1" />
                <div className="logo__meridian logo__meridian--2" />
                <div className="logo__meridian logo__meridian--3" />
                <div className="logo__equator" />
                <div className="logo__core" />
                <div className="logo__flare" />
              </div>
            </div>
            <div className="logo__text">
              <span className="logo__primary">GOHIL</span>
              <span className="logo__secondary">EXPORTS</span>
            </div>
            <div className="logo__status" aria-label="Global Trade Active">
              <span className="logo__status-dot" />
              <span className="logo__status-label">GLOBAL TRADE ACTIVE</span>
            </div>
          </a>

          {/* ── DESKTOP NAV ── */}
          <nav className="navbar__nav" aria-label="Primary navigation">
            <ul className="navbar__list">
              {NAV_LINKS.map(link => (
                <li
                  key={link.label}
                  className={`navbar__item${link.dropdown ? ' navbar__item--has-dropdown' : ''}`}
                  onMouseEnter={link.dropdown ? handleCountryHover : undefined}
                  onMouseLeave={link.dropdown ? handleCountryLeave : undefined}
                  ref={link.dropdown ? dropdownRef : null}
                >
                  <a
                    href={link.href}
                    className={`navbar__link${activeLink === link.label ? ' navbar__link--active' : ''}`}
                    onClick={e => handleNavClick(e, link)}
                    aria-haspopup={link.dropdown ? 'true' : undefined}
                    aria-expanded={link.dropdown ? dropdownOpen : undefined}
                  >
                    {link.label}
                    {link.dropdown && (
                      <span className={`navbar__chevron${dropdownOpen ? ' navbar__chevron--open' : ''}`} aria-hidden="true">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    )}
                  </a>

                  {/* COUNTRY MEGA DROPDOWN */}
                  {link.dropdown && (
                    <div
                      className={`dropdown${dropdownOpen ? ' dropdown--open' : ''}`}
                      onMouseEnter={handleCountryHover}
                      onMouseLeave={handleCountryLeave}
                      role="menu"
                      aria-label="Country menu"
                    >
                      <div className="dropdown__header">
                        <span className="dropdown__header-title">GLOBAL TRADE DESTINATIONS</span>
                        <span className="dropdown__header-count">{link.dropdown.length} Markets</span>
                      </div>
                      <div className="dropdown__grid">
                        {Object.entries(grouped).map(([region, countries]) => (
                          <div key={region} className="dropdown__region">
                            <div
                              className="dropdown__region-label"
                              style={{ '--region-color': REGION_COLORS[region] }}
                            >
                              {region}
                            </div>
                            {countries.map(c => (
                              <a
                                key={c.code}
                                href={`#country-${c.code.toLowerCase()}`}
                                className="dropdown__item"
                                role="menuitem"
                                onClick={() => setDropdownOpen(false)}
                              >
                                <span className="dropdown__item-flag" aria-hidden="true">
                                  {FLAG_ICONS[c.code]}
                                </span>
                                <span className="dropdown__item-name">{c.label}</span>
                                <span className="dropdown__item-arrow" aria-hidden="true">→</span>
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="dropdown__footer">
                        <span className="dropdown__footer-dot" />
                        All destinations subject to trade compliance
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* ── CTA ── */}
          <div className="navbar__actions">
            <a href="#contact" className="navbar__cta" onClick={e => handleNavClick(e, { href: '#contact', label: 'Contact Us' })}>
              <span className="cta__glow" aria-hidden="true" />
              <span className="cta__label">Get Quote</span>
              <span className="cta__icon" aria-hidden="true">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7H12M8 3L12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>

            {/* Hamburger */}
            <button
              className={`navbar__hamburger${mobileOpen ? ' navbar__hamburger--open' : ''}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className="ham__bar ham__bar--1" />
              <span className="ham__bar ham__bar--2" />
              <span className="ham__bar ham__bar--3" />
            </button>
          </div>
        </div>

        {/* Navbar bottom accent line */}
        <div className="navbar__accent-line" aria-hidden="true" />
      </header>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      <div
        className={`mobile-menu${mobileOpen ? ' mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        {/* BG decoration */}
        <div className="mobile-menu__bg" aria-hidden="true">
          <div className="mobile-bg__globe" />
          <div className="mobile-bg__glow" />
          <div className="mobile-bg__grid" />
        </div>

        <div className="mobile-menu__inner">
          {/* Mobile logo */}
          <div className="mobile-menu__logo">
            <span className="mobile-logo__primary">GOHIL</span>
            <span className="mobile-logo__secondary">EXPORTS</span>
          </div>

          <nav aria-label="Mobile navigation">
            <ul className="mobile-menu__list">
              {NAV_LINKS.map((link, i) => (
                <li
                  key={link.label}
                  className="mobile-menu__item"
                  style={{ '--delay': `${i * 0.06 + 0.15}s` }}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        className="mobile-menu__link mobile-menu__link--toggle"
                        onClick={() => setMobileCountry(v => !v)}
                        aria-expanded={mobileCountry}
                      >
                        <span>{link.label}</span>
                        <span className={`mobile-chevron${mobileCountry ? ' mobile-chevron--open' : ''}`} aria-hidden="true">
                          <svg width="12" height="7" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </button>
                      {mobileCountry && (
                        <ul className="mobile-dropdown">
                          {link.dropdown.map(c => (
                            <li key={c.code} className="mobile-dropdown__item">
                              <a
                                href={`#country-${c.code.toLowerCase()}`}
                                className="mobile-dropdown__link"
                                onClick={() => setMobileOpen(false)}
                              >
                                <span className="mobile-dropdown__flag">{FLAG_ICONS[c.code]}</span>
                                {c.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={link.href}
                      className={`mobile-menu__link${activeLink === link.label ? ' mobile-menu__link--active' : ''}`}
                      onClick={e => handleNavClick(e, link)}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#contact"
            className="mobile-menu__cta"
            onClick={e => handleNavClick(e, { href: '#contact', label: 'Contact Us' })}
          >
            Get Quote →
          </a>

          <div className="mobile-menu__footer">
            <span className="mobile-status-dot" />
            Global Trade Active · GOHIL EXPORTS
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

/* Inline SVG flag icons — pure CSS/SVG, no images */
const FLAG_ICONS = {
  US: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#B22234"/><rect y="1.08" width="20" height="1.08" fill="#fff"/><rect y="2.15" width="20" height="1.08" fill="#B22234"/><rect y="3.23" width="20" height="1.08" fill="#fff"/><rect y="4.31" width="20" height="1.08" fill="#B22234"/><rect y="5.38" width="20" height="1.08" fill="#fff"/><rect y="6.46" width="20" height="1.08" fill="#B22234"/><rect y="7.54" width="20" height="1.08" fill="#fff"/><rect y="8.62" width="20" height="1.08" fill="#B22234"/><rect y="9.69" width="20" height="1.08" fill="#fff"/><rect y="10.77" width="20" height="1.08" fill="#B22234"/><rect y="11.85" width="20" height="1.08" fill="#fff"/><rect width="8" height="7.54" fill="#3C3B6E"/></svg>,
  GB: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#012169"/><path d="M0 0L20 14M20 0L0 14" stroke="#fff" strokeWidth="2.5"/><path d="M0 0L20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.5"/><path d="M10 0V14M0 7H20" stroke="#fff" strokeWidth="3.5"/><path d="M10 0V14M0 7H20" stroke="#C8102E" strokeWidth="2"/></svg>,
  AE: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#009A44"/><rect width="20" height="9.33" fill="#fff"/><rect width="20" height="4.67" fill="#000"/><rect width="5" height="14" fill="#EF3340"/></svg>,
  DE: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#000"/><rect y="4.67" width="20" height="4.67" fill="#DD0000"/><rect y="9.33" width="20" height="4.67" fill="#FFCE00"/></svg>,
  AU: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#00008B"/><rect width="10" height="7" fill="#00008B"/><path d="M0 0L10 7M10 0L0 7" stroke="#fff" strokeWidth="2"/><path d="M5 0V7M0 3.5H10" stroke="#fff" strokeWidth="3"/><path d="M5 0V7M0 3.5H10" stroke="#CC0001" strokeWidth="1.5"/><circle cx="15" cy="10" r="1.5" fill="#fff"/><circle cx="17" cy="7" r="1" fill="#fff"/><circle cx="13" cy="7" r="1" fill="#fff"/><circle cx="17" cy="12" r="1" fill="#fff"/></svg>,
  CA: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="14" fill="#fff"/><rect width="5" height="14" fill="#FF0000"/><rect x="15" width="5" height="14" fill="#FF0000"/><text x="10" y="10" fontSize="7" textAnchor="middle" fill="#FF0000">🍁</text></svg>,
  SG: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="7" fill="#EF3340"/><rect y="7" width="20" height="7" fill="#fff"/><circle cx="5" cy="5" r="2.5" fill="#fff"/><circle cx="6.5" cy="5" r="2" fill="#EF3340"/><g fill="#fff" fontSize="3"><text x="8.5" y="4">★</text><text x="7.5" y="7">★</text><text x="10" y="6.5">★</text><text x="9" y="3">★</text><text x="11" y="4.5">★</text></g></svg>,
  NL: <svg viewBox="0 0 20 14" width="20" height="14"><rect width="20" height="4.67" fill="#AE1C28"/><rect y="4.67" width="20" height="4.67" fill="#fff"/><rect y="9.33" width="20" height="4.67" fill="#21468B"/></svg>,
};