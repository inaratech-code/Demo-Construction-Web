import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer bg-tertiary">
            <div className="container">
                <div className="footer-top grid-2 align-center">
                    <h2 className="heading-lg m-0">READY TO<br />START?</h2>
                    <div style={{ justifySelf: 'end' }}>
                        <Link to="/contact" className="btn btn-primary d-inline-block">
                            DISCOVER BNK
                        </Link>
                    </div>
                </div>

                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link to="/" className="logo mb-4 d-inline-block">
                            <Building2 className="logo-icon text-accent" size={24} />
                            <span>BNK<span className="text-accent">.</span></span>
                        </Link>
                        <p className="text-muted mono-text max-w-300">
                            PIONEERING STRUCTURAL EXCELLENCE SINCE 1999.
                        </p>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-title mono-label">NAVIGATION</h4>
                        <ul>
                            <li><Link to="/about" className="mono-text hover-accent">About</Link></li>
                            <li><Link to="/projects" className="mono-text hover-accent">Portfolio</Link></li>
                            <li><Link to="/services" className="mono-text hover-accent">Services</Link></li>
                            <li><Link to="/contact" className="mono-text hover-accent">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4 className="footer-title mono-label">EXPERTISE</h4>
                        <ul>
                            <li><Link to="/services" className="mono-text hover-accent">General Contracting</Link></li>
                            <li><Link to="/services" className="mono-text hover-accent">Design & Build</Link></li>
                            <li><Link to="/services" className="mono-text hover-accent">Pre-Construction</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h4 className="footer-title mono-label">CONTACT</h4>
                        <ul className="contact-list">
                            <li className="mono-text text-muted">1200 Architecture Blvd<br />New York, NY 10001</li>
                            <li><a href="mailto:info@bnk.com" className="mono-text hover-accent">info@bnkconstruction.com</a></li>
                            <li className="mono-text text-muted">+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom-wrapper">
                <div className="container footer-bottom">
                    <p className="text-muted mono-text">&copy; {new Date().getFullYear()} BNK CONSTRUCTION.</p>
                    <div className="footer-legal gap-4 d-flex">
                        <Link to="#" className="mono-text hover-accent">PRIVACY POLICY</Link>
                        <Link to="#" className="mono-text hover-accent">TERMS OF SERVICE</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
