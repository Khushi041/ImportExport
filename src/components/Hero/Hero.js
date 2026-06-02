import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

const STATS = [
  { value: 150, suffix: '+', label: 'Countries Served' },
  { value: 5000, suffix: '+', label: 'Shipments/Year' },
  { value: 98, suffix: '%', label: 'On-Time Delivery' },
  { value: 24, suffix: '/7', label: 'Trade Support' },
];

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, suffix, label, animate }) {
  const count = useCountUp(value, 2200, animate);
  return (
    <div className="stat-card">
      <span className="stat-value">
        {count}
        <span className="stat-suffix">{suffix}</span>
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

const CONTAINERS = [
  { color: '#2C74B3', depth: 40, label: 'SEA FREIGHT' },
  { color: '#144272', depth: -30, label: 'AIR CARGO' },
  { color: '#205295', depth: 60, label: 'LAND TRADE' },
  { color: '#0A2647', depth: -50, label: 'CUSTOMS' },
];

const ORBIT_NODES = [
  { angle: 0,   label: 'SHANGHAI' },
  { angle: 72,  label: 'ROTTERDAM' },
  { angle: 144, label: 'DUBAI' },
  { angle: 216, label: 'NEW YORK' },
  { angle: 288, label: 'SINGAPORE' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const globeRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mouseScene, setMouseScene] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    const statsEl = document.querySelector('.stats-row');
    if (statsEl) observer.observe(statsEl);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });

    const sr = sceneRef.current?.getBoundingClientRect();
    if (sr) {
      setMouseScene({
        x: ((e.clientX - sr.left) / sr.width - 0.5) * 30,
        y: ((e.clientY - sr.top) / sr.height - 0.5) * 30,
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setMouseScene({ x: 0, y: 0 });
  };

  return (
    <section
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layers */}
      <div className="hero-bg">
        <div className="bg-grid" />
        <div className="bg-radial-1" />
        <div className="bg-radial-2" />
        <div className="bg-radial-3" />
      </div>

      {/* Particles */}
      <div className="particles" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className={`particle particle-${i % 7}`} />
        ))}
      </div>

      {/* Main grid */}
      <div className="hero-inner">
        {/* ── LEFT COLUMN ── */}
        <div
          className="hero-left"
          style={{ transform: `perspective(1200px) rotateX(${tilt.x * 0.4}deg) rotateY(${tilt.y * 0.4}deg)` }}
        >
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Global Trade Infrastructure
          </div>

          <h1 className="headline">
            <span className="headline-line">Connecting Global</span>
            <span className="headline-line accent-word">Markets</span>
            <span className="headline-line">Through Trusted</span>
            <span className="headline-line">Trade Solutions</span>
          </h1>

          <p className="subheading">
            End-to-end import &amp; export services — from customs compliance and
            freight forwarding to international logistics and verified supplier networks
            spanning six continents.
          </p>

          <div className="trust-badges">
            {['Global Network', 'Fast Logistics', 'Verified Suppliers', 'International Compliance'].map((b) => (
              <div className="badge" key={b}>
                <span className="badge-check">✓</span>
                {b}
              </div>
            ))}
          </div>

          <div className="cta-row">
            <button className="btn-primary">
              <span>Start Trading Globally</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn-secondary">
              Explore Services
              <span className="btn-arrow-sec">↗</span>
            </button>
          </div>

          {/* Stats */}
          <div className="stats-row">
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} animate={statsVisible} />
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — 3D SCENE ── */}
        <div className="hero-right" ref={sceneRef}>
          <div
            className="scene-wrapper"
            style={{
              transform: `perspective(1000px) rotateX(${mouseScene.y * 0.15}deg) rotateY(${mouseScene.x * 0.15}deg)`,
            }}
          >
            {/* Command-center glass panel */}
            <div className="command-panel">
              <div className="panel-header">
                <div className="panel-dots">
                  <span /><span /><span />
                </div>
                <span className="panel-title">GLOBAL TRADE NETWORK — LIVE</span>
                <span className="panel-status"><span className="status-dot" />ACTIVE</span>
              </div>

              {/* Globe */}
              <div className="globe-stage" ref={globeRef}>
                <div className="globe">
                  {/* Latitude rings */}
                  {[-50, -25, 0, 25, 50].map((deg, i) => (
                    <div
                      key={i}
                      className="lat-ring"
                      style={{ transform: `translateZ(0px) rotateX(${deg}deg)` }}
                    />
                  ))}
                  {/* Longitude rings */}
                  {[0, 36, 72, 108, 144].map((deg, i) => (
                    <div
                      key={i}
                      className="lon-ring"
                      style={{ transform: `rotateY(${deg}deg)` }}
                    />
                  ))}
                  {/* Globe core glow */}
                  <div className="globe-core" />
                  {/* Globe poles */}
                  <div className="globe-pole top" />
                  <div className="globe-pole bottom" />
                </div>

                {/* Trade-route orbit ring */}
                <div className="orbit-ring orbit-1">
                  {ORBIT_NODES.map((node, i) => (
                    <div
                      key={i}
                      className="orbit-node"
                      style={{ '--angle': `${node.angle}deg`, '--radius': '110px' }}
                    >
                      <div className="node-dot" />
                      <span className="node-label">{node.label}</span>
                    </div>
                  ))}
                </div>
                <div className="orbit-ring orbit-2" />
                <div className="orbit-ring orbit-3" />

                {/* Trade-line pulses */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className={`trade-pulse tp-${i}`} />
                ))}
              </div>

              {/* Floating cargo containers */}
              <div className="containers-layer">
                {CONTAINERS.map((c, i) => (
                  <div
                    key={i}
                    className={`cargo-container cargo-${i}`}
                    style={{
                      '--c-color': c.color,
                      '--c-depth': `${c.depth}px`,
                    }}
                  >
                    <div className="container-face front" />
                    <div className="container-face back" />
                    <div className="container-face top" />
                    <div className="container-face bottom" />
                    <div className="container-face left" />
                    <div className="container-face right" />
                    <span className="container-label">{c.label}</span>
                  </div>
                ))}
              </div>

              {/* Live data cards */}
              <div className="data-cards">
                <div className="data-card dc-1">
                  <span className="dc-dot green" />
                  <div>
                    <div className="dc-title">PACIFIC ROUTE</div>
                    <div className="dc-val">4,820 nm · ETA 14d</div>
                  </div>
                </div>
                <div className="data-card dc-2">
                  <span className="dc-dot blue" />
                  <div>
                    <div className="dc-title">CONTAINER #VX-9831</div>
                    <div className="dc-val">In Transit → Dubai</div>
                  </div>
                </div>
                <div className="data-card dc-3">
                  <span className="dc-dot amber" />
                  <div>
                    <div className="dc-title">CUSTOMS CLEARED</div>
                    <div className="dc-val">Rotterdam Terminal</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}