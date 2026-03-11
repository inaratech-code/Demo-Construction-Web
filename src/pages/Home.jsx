import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import './Home.css';

const Home = () => {
    useEffect(() => {
        // Scroll reveal observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-up');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

        // Smooth text reveal observer
        const textRevealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('text-reveal-active');
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.text-reveal').forEach((el) => textRevealObserver.observe(el));

        return () => {
            observer.disconnect();
            textRevealObserver.disconnect();
        };
    }, []);

    return (
        <div className="home-page">
            {/* Haptikos-Style Hero */}
            <section className="hero">
                <div className="container hero-content">
                    <div className="reveal">
                        <h1 className="heading-jumbo text-center hero-title-haptikos">
                            BUILDING THE structural FRAMEWORK <br />
                            <span className="text-accent">OF TOMORROW.</span>
                        </h1>
                    </div>
                    <div className="hero-scroll-prompt reveal delay-2">
                        <span className="mono-text">SCROLL TO EXPLORE</span>
                        <div className="scroll-line"></div>
                    </div>
                </div>
            </section>

            {/* Visual Break (B/W hero bg) */}
            <section className="visual-break">
                <div className="parallax-bg" style={{ backgroundImage: 'url(/hero_bg.png)' }}></div>
            </section>

            {/* 01 / OUR VISION  */}
            <section className="section bg-secondary">
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <span className="mono-label reveal">01 / Our Vision</span>
                    <h2 className="heading-md text-reveal mt-4">
                        WE BELIEVE THAT ARCHITECTURE IS MORE THAN JUST STRUCTURE. IT IS THE FOUNDATIONUPON WHICH HUMAN EXPERIENCES ARE BUILT, DEMANDING PRECISION, SUSTAINABILITY, AND UNCOMPROMISING EXCELLENCE.
                    </h2>
                    <div className="vision-actions reveal mt-5 pt-3">
                        <Link to="/about" className="btn hover-light">
                            Discover BNK
                        </Link>
                    </div>
                </div>
            </section>

            {/* 02 / OUR EXPERTISE (Philosophy style) */}
            <section className="section bg-primary">
                <div className="container">
                    <div className="grid-2 align-start">
                        <div className="reveal">
                            <span className="mono-label">02 / Our Expertise</span>
                            <h2 className="heading-lg mt-4 max-w-500">ENGINEERING PERFECTION.</h2>
                            <p className="text-muted mt-4 max-w-500 text-lg">
                                For over 25 years, BNK has pioneered massive commercial builds by bridging the gap between imaginative architectural design and structural reality.
                            </p>
                        </div>

                        <div className="expertise-list">
                            {[
                                { num: '01', title: 'GENERAL CONTRACTING', desc: 'Comprehensive site management from blueprint to operational handover.' },
                                { num: '02', title: 'PRE-CONSTRUCTION', desc: 'Rigorous feasibility studies, 3D modeling, and risk mitigation.' },
                                { num: '03', title: 'DESIGN & BUILD', desc: 'Unifying master architects with state-of-the-art engineering teams.' }
                            ].map((item, idx) => (
                                <div key={idx} className="expertise-item reveal delay-1">
                                    <span className="expertise-num mono-text text-accent">{item.num} /</span>
                                    <div className="expertise-content">
                                        <h3 className="heading-sm mb-2">{item.title}</h3>
                                        <p className="text-muted">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-5 reveal delay-2">
                                <Link to="/services" className="nav-contact-btn pb-1">
                                    VIEW ALL SERVICES &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 03 / FEATURED PROJECTS (Media Stack style) */}
            <section className="section bg-secondary">
                <div className="container">
                    <div className="grid-2">
                        <div className="sticky-col reveal">
                            <span className="mono-label">03 / Selected Works</span>
                            <h2 className="heading-lg mt-4">MONUMENTAL<br />ACHIEVEMENTS.</h2>
                            <p className="text-muted mt-4 max-w-500 text-lg mb-4">
                                A curated selection of our most ambitious commercial and industrial projects shaping modern skylines.
                            </p>
                            <Link to="/projects" className="btn hover-light">
                                View Portfolio
                            </Link>
                        </div>

                        <div className="media-stack">
                            <Link to="/projects/1" className="media-card reveal">
                                <img src="/project_1.png" alt="The Apex Tower" />
                                <div className="media-overlay">
                                    <div className="media-info">
                                        <span className="mono-label mb-1">Commercial</span>
                                        <h3 className="heading-sm mb-0">The Apex Tower</h3>
                                    </div>
                                </div>
                            </Link>

                            <Link to="/projects/2" className="media-card reveal mt-4">
                                <img src="/project_2.png" alt="Lumina Tech Park" />
                                <div className="media-overlay">
                                    <div className="media-info">
                                        <span className="mono-label mb-1">Industrial</span>
                                        <h3 className="heading-sm mb-0">Lumina Tech Park</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 04 / CTA */}
            <section className="section cta-section text-center bg-primary" style={{ padding: '10rem 0' }}>
                <div className="container reveal">
                    <span className="mono-label mb-4 text-center mx-auto d-block">START TODAY</span>
                    <h2 className="heading-jumbo mb-5">READY TO<br />BUILD?</h2>
                    <Link to="/contact" className="btn btn-primary btn-large">
                        REQUEST CONSULTATION
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
