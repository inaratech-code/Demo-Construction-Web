import { useParams, Link } from 'react-router-dom';

const ProjectDetail = () => {
    const { id } = useParams();

    // Mock data based on id
    const project = id === '1' ? {
        title: 'The Apex Tower',
        category: 'Commercial',
        image: '/project_1.png',
        client: 'Apex Global',
        location: 'New York, NY',
        year: '2025',
        description: 'A striking 80-story commercial skyscraper featuring sustainable materials, a complex steel sub-structure, and an entirely glass exterior. This project represents the pinnacle of modern architecture and engineering efficiency.'
    } : {
        title: 'Lumina Tech Park',
        category: 'Industrial Complex',
        image: '/project_2.png',
        client: 'Lumina Industries',
        location: 'San Francisco, CA',
        year: '2024',
        description: 'An expansive modern tech park designed for the future of work. Spanning 40 acres, it integrates eco-friendly architecture with robust industrial infrastructure tailored for research and technological development.'
    };

    return (
        <div className="page" style={{ paddingTop: '100px' }}>
            <section className="section bg-secondary text-center pt-5 pb-5">
                <div className="container">
                    <span className="text-accent text-lg mb-2 d-block">{project.category}</span>
                    <h1 className="heading-lg">{project.title}</h1>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div style={{ width: '100%', height: '600px', overflow: 'hidden', borderRadius: '4px', marginBottom: '3rem' }}>
                        <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>

                    <div className="grid-2">
                        <div>
                            <h2 className="heading-sm mb-4">Project Overview</h2>
                            <p className="text-muted text-lg">{project.description}</p>
                        </div>
                        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '4px' }}>
                            <h3 className="heading-sm mb-4 border-b pb-2">Details</h3>
                            <ul style={{ listStyle: 'none' }}>
                                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-muted">Client:</span>
                                    <span className="font-weight-bold">{project.client}</span>
                                </li>
                                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-muted">Location:</span>
                                    <span className="font-weight-bold">{project.location}</span>
                                </li>
                                <li style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                                    <span className="text-muted">Year:</span>
                                    <span className="font-weight-bold">{project.year}</span>
                                </li>
                            </ul>
                            <div className="mt-4">
                                <Link to="/contact" className="btn btn-outline hover-orange" style={{ width: '100%' }}>Like this? Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default ProjectDetail;
