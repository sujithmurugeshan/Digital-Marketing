import logo from '../assets/logo.svg';
import { navItems } from '../data/siteData.js';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <a className="brand footer-brand" href="#top" aria-label="LaunchWave Digital home">
          <img src={logo} alt="" />
          <span>LaunchWave</span>
        </a>

        <nav aria-label="Footer navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <p>Copyright 2026 LaunchWave Digital. Growth you can measure.</p>
      </div>
    </footer>
  );
}

export default Footer;
