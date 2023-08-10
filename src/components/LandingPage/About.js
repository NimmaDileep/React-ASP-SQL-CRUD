import React from 'react';
import './About.css';

function About() {
    return (
        <div className="about-container">
            <div className="section">
                <h1>About Our Company</h1>
                <p>
                    Founded in 2010, IT Consultant Management has become a leading figure in streamlining consultant submissions and vendor management for IT consulting companies worldwide. Our platform was built on the backbone of our in-depth industry experience and our dedication to bringing efficiency and innovation to the consulting world.
                </p>
            </div>
            <div className="section">
                <h2>Our Mission</h2>
                <p>
                    We aim to empower IT consulting companies with the tools and insights they need to optimize their vendor relationships and ensure the best opportunities for their consultants. In an ever-evolving IT landscape, our mission remains constant: Deliver unparalleled service and results to our users.
                </p>
            </div>
            <div className="section">
                <h2>Core Values</h2>
                <ul>
                    <li><b>Integrity:</b> We believe in honest and transparent operations.</li>
                    <li><b>Innovation:</b> Staying at the forefront of technology to deliver the best solutions.</li>
                    <li><b>Excellence:</b> We strive for perfection in everything we do.</li>
                    <li><b>Partnership:</b> Building strong relationships with our users and vendors.</li>
                    <li><b>Empowerment:</b> Providing our clients the tools to achieve greatness.</li>
                </ul>
            </div>
        </div>
    );
}

export default About;
