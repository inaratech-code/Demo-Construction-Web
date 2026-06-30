import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Make sure media-card style rules are loaded
import { getProjects } from '../utils/projectStorage';

const categories = ['All', 'Commercial', 'Industrial', 'Residential', 'Renovation'];

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [projectsList, setProjectsList] = useState([]);

    useEffect(() => {
        setProjectsList(Object.values(getProjects()));
    }, []);

    const filteredProjects = activeFilter === 'All'
        ? projectsList
        : projectsList.filter(p => p.category === activeFilter);

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

            <section className="section" style={{ paddingTop: '3rem' }}>
                <div className="container">
                    {/* Category Filter Tabs */}
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginBottom: '3rem',
                        borderBottom: '1px solid var(--border-color)',
                        paddingBottom: '1rem'
                    }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveFilter(cat)}
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.8rem',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    background: 'transparent',
                                    border: 'none',
                                    color: activeFilter === cat ? 'var(--accent-color)' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    padding: '0.5rem 1rem',
                                    borderBottom: activeFilter === cat ? '2px solid var(--accent-color)' : '2px solid transparent',
                                    marginBottom: '-1.1rem',
                                    transition: 'all var(--transition-fast)',
                                    fontWeight: activeFilter === cat ? 'bold' : 'normal'
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Filtered Grid */}
                    <div className="grid-2">
                        {filteredProjects.map(project => (
                            <Link 
                                key={project.id} 
                                to={`/projects/${project.id}`} 
                                className="media-card"
                                style={{
                                    display: 'block',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '4px',
                                    border: '1px solid var(--border-color)',
                                    backgroundColor: 'var(--bg-secondary)',
                                    animation: 'fadeUp 0.6s var(--transition-normal) both'
                                }}
                            >
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        transition: 'transform var(--transition-normal)'
                                    }}
                                />
                                <div className="media-overlay">
                                    <div className="media-info">
                                        <span className="mono-label mb-1">{project.category}</span>
                                        <h3 className="heading-sm mb-0 text-white">{project.title}</h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    {filteredProjects.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                            <p className="text-lg">No projects found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Projects;
