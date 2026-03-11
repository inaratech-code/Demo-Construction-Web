import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <div className="page" style={{ paddingTop: '100px' }}>
            <section className="section bg-secondary text-center pt-5 pb-5">
                <div className="container">
                    <h1 className="heading-lg">Get in Touch</h1>
                    <p className="text-lg text-muted max-w-700 mx-auto mt-4">
                        Let's discuss how we can bring your next massive project to life.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container grid-2">
                    <div className="contact-info">
                        <h2 className="heading-md mb-5">Contact Information</h2>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <MapPin className="text-accent" />
                            </div>
                            <div>
                                <h3 className="heading-sm mb-2" style={{ fontSize: '1.2rem' }}>Headquarters</h3>
                                <p className="text-muted">1200 Architecture Blvd, Suite 400<br />New York, NY 10001</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Phone className="text-accent" />
                            </div>
                            <div>
                                <h3 className="heading-sm mb-2" style={{ fontSize: '1.2rem' }}>Phone</h3>
                                <p className="text-muted">+1 (555) 123-4567</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ width: '50px', height: '50px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Mail className="text-accent" />
                            </div>
                            <div>
                                <h3 className="heading-sm mb-2" style={{ fontSize: '1.2rem' }}>Email</h3>
                                <p className="text-muted">info@bnkconstruction.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-form-wrapper" style={{ background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '4px' }}>
                        <h2 className="heading-sm mb-4">Send a Message</h2>
                        <form>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                                <input type="text" placeholder="First Name" style={{ width: '100%', padding: '1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }} />
                                <input type="text" placeholder="Last Name" style={{ width: '100%', padding: '1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px' }} />
                            </div>
                            <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px', marginBottom: '1rem' }} />
                            <textarea placeholder="Tell us about your project" rows="5" style={{ width: '100%', padding: '1rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'white', borderRadius: '4px', marginBottom: '1rem', resize: 'vertical' }}></textarea>
                            <button type="button" className="btn btn-primary" style={{ width: '100%' }}>Submit Inquiry</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
