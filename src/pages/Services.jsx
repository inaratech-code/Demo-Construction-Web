import { Link } from 'react-router-dom';

const Services = () => {
    return (
        <div className="page" style={{ paddingTop: '100px' }}>
            <section className="section text-center bg-secondary pt-5 pb-5">
                <div className="container">
                    <h1 className="heading-lg">Our Services</h1>
                    <p className="text-lg text-muted max-w-700 mx-auto mt-4">
                        End-to-end construction capabilities tailored for monumental visions.
                    </p>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    {/* Re-use services grid styles from home if needed, or simple layout here */}
                    <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        <div className="service-card">
                            <h3 className="heading-sm text-accent">General Contracting</h3>
                            <p className="text-muted mb-3">Complete site management and execution from blueprint to final inspection.</p>
                        </div>
                        <div className="service-card">
                            <h3 className="heading-sm text-accent">Pre-Construction</h3>
                            <p className="text-muted mb-3">Cost estimation, 3D modeling, and scheduling to ensure project viability.</p>
                        </div>
                        <div className="service-card">
                            <h3 className="heading-sm text-accent">Design & Build</h3>
                            <p className="text-muted mb-3">A unified team of architects and engineers working together to deliver excellence.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Services;
