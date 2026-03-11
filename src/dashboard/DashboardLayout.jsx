import { Outlet, Link } from 'react-router-dom';
import { Building2, LayoutDashboard, Briefcase, FileText, Settings, LogOut } from 'lucide-react';
import './Dashboard.css';

const DashboardLayout = () => {
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="dashboard-sidebar">
                <div style={{ padding: '2rem' }}>
                    <Link to="/" className="logo d-inline-block">
                        <Building2 className="logo-icon" size={28} />
                        <span>BNK<span className="text-accent">.</span></span>
                    </Link>
                </div>
                <nav style={{ flex: 1, padding: '0 1rem' }}>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '4px', background: 'rgba(255,107,0,0.1)', color: 'var(--accent-color)' }}>
                                <LayoutDashboard size={20} /> Dashboard
                            </Link>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                <Briefcase size={20} /> My Projects
                            </Link>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                <FileText size={20} /> Invoices & Docs
                            </Link>
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem', borderRadius: '4px', color: 'var(--text-secondary)' }}>
                                <Settings size={20} /> Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div style={{ padding: '2rem' }}>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
                        <LogOut size={20} /> Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: 'auto' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 2rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)' }}>
                    <h2 className="heading-sm mb-0">Client Portal</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: '2px solid var(--accent-color)' }}></div>
                        <span className="font-weight-bold">Apex Global</span>
                    </div>
                </header>
                <div style={{ padding: '2rem' }}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
export default DashboardLayout;

/* Add to index.css or a new file if needed, but for simplicity, we rely on flex-wrap mostly in DashboardHome. 
   Notice how dashboard-container/sidebar needs CSS. Let's create Dashboard.css */
