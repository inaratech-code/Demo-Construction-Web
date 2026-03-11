import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="page" style={{ paddingTop: '100px' }}>
            <section className="section bg-secondary">
                <div className="container text-center pt-5 pb-5">
                    <h1 className="heading-lg">About BNK</h1>
                    <p className="text-lg text-muted max-w-700 mx-auto mt-4">
                        We are more than builders. We are visionaries, engineers, and creators.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container grid-2">
                    <div>
                        <h2 className="heading-md">Our Story</h2>
                        <p className="text-muted text-lg mb-4">
                            Founded in 1999, BNK construction emerged with a singular vision: to revolutionize the commercial construction landscape through uncompromising quality and innovative engineering.
                        </p>
                        <p className="text-muted mb-4">
                            Over two decades later, our portfolio spans across continents, featuring some of the most complex structural achievements of the modern era. We unite master craftsmanship with state-of-the-art building technologies.
                        </p>
                        <Link to="/contact" className="btn btn-primary mt-3">Work With Us</Link>
                    </div>
                    <div>
                        <img src="/about.png" alt="Our Team" style={{ width: '100%', borderRadius: '4px', filter: 'grayscale(20%)' }} />
                    </div>
                </div>
            </section>
        </div>
    );
};
export default About;
