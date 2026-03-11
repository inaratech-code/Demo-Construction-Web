import { Link } from 'react-router-dom';

const Projects = () => {
    return (
        <div className="page" style={{ paddingTop: '100px' }}>
            <section className="section bg-secondary pb-5">
                <div className="container text-center pt-5">
                    <h1 className="heading-lg">Portfolio</h1>
                    <p className="text-lg text-muted max-w-700 mx-auto mt-4">
                        Explore our architectural masterpieces and construction feats.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="grid-2 mt-5">
                        <Link to="/projects/1" className="media-card">
                            <img src="/project_1.png" alt="The Apex Tower" />
                            <div className="media-overlay">
                                <div className="media-info">
                                    <span className="mono-label mb-1">Commercial</span>
                                    <h3 className="heading-sm mb-0 text-white">The Apex Tower</h3>
                                </div>
                            </div>
                        </Link>
                        <Link to="/projects/2" className="media-card">
                            <img src="/project_2.png" alt="Lumina Tech Park" />
                            <div className="media-overlay">
                                <div className="media-info">
                                    <span className="mono-label mb-1">Industrial</span>
                                    <h3 className="heading-sm mb-0 text-white">Lumina Tech Park</h3>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Projects;
