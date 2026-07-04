import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/DM_logo.png';
import { navItems } from '../data/siteData.js';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="LaunchWave Digital home">
        <img src={logo} alt="" />
        <span>LaunchWave</span>
      </a>

      <button
        className="nav-toggle"
        type="button"
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`site-nav ${isOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={closeMenu}>
          Book a call
        </a>
      </nav>
    </header>
  );
}

export default Header;
