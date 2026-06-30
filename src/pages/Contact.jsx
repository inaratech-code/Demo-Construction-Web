import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react';
import './Contact.css';
import { addMessage } from '../utils/projectStorage';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });

    const [currentTheme, setCurrentTheme] = useState(() => {
        return document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const theme = document.documentElement.getAttribute('data-theme') || 'dark';
            setCurrentTheme(theme);
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const tempErrors = {};
        if (!formData.firstName.trim()) {
            tempErrors.firstName = 'First name is required';
        }
        
        if (!formData.email.trim()) {
            tempErrors.email = 'Email address is required';
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                tempErrors.email = 'Please enter a valid email address';
            }
        }

        if (!formData.message.trim()) {
            tempErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            tempErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        // 1. Save contact message locally to Admin Inbox
        addMessage({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            message: formData.message
        });

        // 2. EmailJS Real-World Integration (Optional Setup)
        /*
        // To get actual email alerts (to Admin) AND auto-replies (to Client):
        // 1. Run command: npm install @emailjs/browser
        // 2. Sign up at https://www.emailjs.com/
        // 3. Uncomment this block and configure your credentials:
        
        // (A) Admin alert email template variables
        const adminTemplateParams = {
            from_name: `${formData.firstName} ${formData.lastName}`,
            from_email: formData.email,
            message: formData.message
        };

        // (B) Client auto-reply thank-you email template variables
        const clientTemplateParams = {
            to_name: formData.firstName,
            to_email: formData.email
        };

        // Send Notification to Admin
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: 'YOUR_SERVICE_ID',
                template_id: 'YOUR_ADMIN_NOTIFICATION_TEMPLATE_ID',
                user_id: 'YOUR_PUBLIC_KEY',
                template_params: adminTemplateParams
            })
        })
        .then(res => {
            if (res.ok) console.log('Admin notification email sent.');
        })
        .catch(err => console.error(err));

        // Send Thank You Auto-Reply to Client
        fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                service_id: 'YOUR_SERVICE_ID',
                template_id: 'YOUR_CLIENT_AUTO_REPLY_TEMPLATE_ID',
                user_id: 'YOUR_PUBLIC_KEY',
                template_params: clientTemplateParams
            })
        })
        .then(res => {
            if (res.ok) console.log('Client auto-reply email sent.');
        })
        .catch(err => console.error(err));
        */

        // Simulate server API call (1.5s delay)
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            message: ''
        });
        setErrors({});
        setIsSubmitted(false);
    };

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

                    <div className="contact-form-wrapper">
                        {isSubmitted ? (
                            <div className="success-card">
                                <div className="success-icon-circle">
                                    <CheckCircle2 size={36} />
                                </div>
                                <h2 className="heading-sm success-title">Message Sent!</h2>
                                <p className="text-muted success-text">
                                    Thank you, {formData.firstName}. We have received your message and will get back to you within 24 hours.
                                </p>
                                <button type="button" className="btn btn-outline" onClick={handleReset}>
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h2 className="heading-sm mb-4">Send a Message</h2>
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                                className={`form-input ${errors.firstName ? 'input-error' : ''}`}
                                            />
                                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="lastName"
                                                placeholder="Last Name"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                disabled={isSubmitting}
                                                className="form-input"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email Address"
                                            value={formData.email}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            className={`form-input ${errors.email ? 'input-error' : ''}`}
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name="message"
                                            placeholder="Tell us about your project"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                            style={{ resize: 'vertical' }}
                                            className={`form-input ${errors.message ? 'input-error' : ''}`}
                                        ></textarea>
                                        {errors.message && <span className="error-message">{errors.message}</span>}
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="btn-spinner"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            'Submit Inquiry'
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="section bg-secondary" style={{ padding: '5rem 0', borderTop: '1px solid var(--border-color)', transition: 'background-color var(--transition-normal)' }}>
                <div className="container">
                    <h2 className="heading-sm mb-4" style={{ textAlign: 'center' }}>Our Headquarters</h2>
                    <div style={{
                        width: '100%',
                        height: '450px',
                        borderRadius: '4px',
                        overflow: 'hidden',
                        border: '1px solid var(--border-color)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                        transition: 'border-color var(--transition-normal)'
                    }}>
                        <iframe 
                            title="BNK Headquarters Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617539446452!2d-73.98785302343202!3d40.74844047138902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ 
                                border: 0, 
                                filter: currentTheme === 'light'
                                    ? 'grayscale(30%) contrast(1.1)'
                                    : 'invert(90%) hue-rotate(180deg) grayscale(100%) contrast(1.2)',
                                transition: 'filter var(--transition-normal)'
                            }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
