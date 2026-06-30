import { ReactLenis } from 'lenis/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import DashboardLayout from './dashboard/DashboardLayout';
import DashboardHome from './dashboard/DashboardHome';

function App() {
    return (
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, autoRaf: true }}>
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/dashboard" element={<DashboardLayout />}>
                        <Route index element={<DashboardHome />} />
                    </Route>

                    <Route path="/*" element={
                        <>
                            <Navbar />
                            <main>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/about" element={<About />} />
                                    <Route path="/services" element={<Services />} />
                                    <Route path="/projects" element={<Projects />} />
                                    <Route path="/projects/:id" element={<ProjectDetail />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/admin" element={<Admin />} />
                                </Routes>
                            </main>
                            <Footer />
                        </>
                    } />
                </Routes>
            </div>
        </Router>
        </ReactLenis>
    );
}

export default App;
