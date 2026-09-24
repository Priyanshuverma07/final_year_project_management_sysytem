import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
 


  return (
  <div className="page-wrapper">

  <footer className="footer-container">
    <div className="footer-inner">
      <div className="footer-brand">
        <div className="logo-text">Superviser Connect</div>
        <p className="brand-desc">Building the future of tech mentorship.</p>
        <div className="status-indicator">
          <span className="dot"></span> All systems operational
        </div>
      </div>

      <div className="footer-col">
        <h4>Product</h4>
        <a href="#">Supervisor</a>
        <a href="#">Resources</a>
      </div>

      <div className="footer-col">
        <h4>Company</h4>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </div>

      <div className="footer-col">
        <h4>Support</h4>
        <a href="#">Contact</a>
        <a href="#">Discord</a>
      </div>
    </div>

    <div className="footer-bottom">
      <div className="bottom-inner">
        <span>© 2026 connects Student and Supervisor</span>
        <div className="bottom-links">
          <a href="#">Twitter</a>
          <a href="#">GitHub</a>
        </div>
      </div>
    </div>
  </footer>
</div>
);
}

export default App;
