import { Link } from 'react-router-dom';
import { Clock, CheckCircle, TrendingUp, Calendar } from 'lucide-react';

const DashboardHome = () => {
    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                <div>
                    <h1 className="heading-md" style={{ marginBottom: '0.5rem' }}>Overview</h1>
                    <p className="text-muted">Welcome back. Here is the latest on your projects.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}>New Request</button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {[
                    { label: 'Active Projects', value: '2', icon: <TrendingUp size={24} className="text-accent" /> },
                    { label: 'Completed', value: '5', icon: <CheckCircle size={24} className="text-accent" /> },
                    { label: 'Pending Docs', value: '3', icon: <Clock size={24} className="text-accent" /> },
                    { label: 'Next Milestone', value: 'Oct 15', icon: <Calendar size={24} className="text-accent" /> }
                ].map((stat, idx) => (
                    <div key={idx} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>{stat.label}</p>
                            <p className="heading-sm" style={{ margin: 0 }}>{stat.value}</p>
                        </div>
                        <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(255,107,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {stat.icon}
                        </div>
                    </div>
                ))}
            </div>

            {/* Project Progress */}
            <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                <h2 className="heading-sm mb-4">Current Project: The Apex Tower Phase 2</h2>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <span className="text-muted">Structural Framing</span>
                    <span className="text-accent font-weight-bold">65%</span>
                </div>
                <div style={{ height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: '65%', height: '100%', background: 'var(--accent-color)' }}></div>
                </div>
                <div className="mt-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                    <div>
                        <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Last Update</p>
                        <p className="font-weight-bold">Oct 1, 2026</p>
                    </div>
                    <div>
                        <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Est. Completion</p>
                        <p className="font-weight-bold">Jan 2027</p>
                    </div>
                    <div>
                        <p className="text-muted mb-1" style={{ fontSize: '0.85rem' }}>Latest Additions</p>
                        <Link to="#" className="text-accent" style={{ textDecoration: 'underline' }}>View Inspection Report</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
