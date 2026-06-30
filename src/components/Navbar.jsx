import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">

                {/* Left: Logo */}
                <Link to="/" className="logo">
                    <Building2 className="logo-icon text-accent" size={24} />
                    <span>BNK<span className="text-accent">.</span></span>
                </Link>

                {/* Center: Links */}
                <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                        <span className="active-indicator">&gt;</span>HOME
                    </Link>
                    <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
                        <span className="active-indicator">&gt;</span>ABOUT
                    </Link>
                    <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>
                        <span className="active-indicator">&gt;</span>SERVICES
                    </Link>
                    <Link to="/projects" className={`nav-link ${location.pathname.startsWith('/projects') ? 'active' : ''}`}>
                        <span className="active-indicator">&gt;</span>PROJECTS
                    </Link>
                    <Link to="/admin" className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                        <span className="active-indicator">&gt;</span>ADMIN
                    </Link>

                    <button className="mobile-close" onClick={() => setMobileMenuOpen(false)}>
                        <X size={28} />
                    </button>
                </nav>

                {/* Right: Actions */}
                <div className="nav-actions">
                    <button 
                        onClick={toggleTheme} 
                        className="theme-toggle-btn"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <Link to="/contact" className="nav-contact-btn d-none-mobile">
                        START A PROJECT &rarr;
                    </Link>
                    <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={28} />
                    </button>
                </div>

            </div>
        </header>
    );
};

export default Navbar;
