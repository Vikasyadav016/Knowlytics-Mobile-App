import React from 'react';
import './Landingpage.css';
import Registration from './AuthPages/AuthMainPage/Registration';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="logo">ExamPro</div>
        <ul className="nav-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#pricing">Pricing</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button className="btn-primary">Get Started</button></li>
        </ul>
      </nav>

      <header className="hero-section">
        <div className="hero-text">
          <h1>Seamless Online Exam Platform</h1>
          <p>Conduct secure and reliable exams from anywhere, anytime.</p>
          <button className="btn-primary">Start Your Free Trial</button>
        </div>
        <div className="hero-image">
          {/* You can replace this with an actual image */}
          <img src="https://via.placeholder.com/500x300?text=Online+Exam" alt="Online Exam" />
        </div>
      </header>

      <section id="features" className="features-section">
        <h2>Features</h2>
        <div className="features-cards">
          <div className="card">
            <h3>Secure Exams</h3>
            <p>Ensure exam integrity with proctoring and anti-cheating measures.</p>
          </div>
          <div className="card">
            <h3>Real-time Results</h3>
            <p>Instant grading and analytics for better insights.</p>
          </div>
          <div className="card">
            <h3>Easy Setup</h3>
            <p>Create and schedule exams with an intuitive interface.</p>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <h2>How It Works</h2>
        <ol>
          <li>Create your exam with our simple tools.<Registration /></li>
          <li>Invite candidates via email or link.</li>
          <li>Monitor exams with live proctoring features.</li>
          <li>Get instant results and detailed reports.</li>
        </ol>
      </section>

      <section id="pricing" className="pricing-section">
        <h2>Pricing</h2>
        <div className="pricing-cards">
          <div className="card pricing-card">
            <h3>Basic</h3>
            <p>$10/month</p>
            <ul>
              <li>Up to 50 exams</li>
              <li>Email support</li>
            </ul>
            <button className="btn-secondary">Choose Basic</button>
          </div>
          <div className="card pricing-card">
            <h3>Pro</h3>
            <p>$30/month</p>
            <ul>
              <li>Unlimited exams</li>
              <li>Priority support</li>
              <li>Advanced analytics</li>
            </ul>
            <button className="btn-primary">Choose Pro</button>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <p>Contact us at support@exampro.com</p>
        <p>© 2025 ExamPro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
