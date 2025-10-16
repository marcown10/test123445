import React from 'react'

    function Footer() {
      return (
        <footer className="app-footer">
          <div className="footer-content">
            <p>&copy; 2023 Todo Master. All rights reserved.</p>
            <div className="social-links">
              <a href="#" aria-label="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </footer>
      )
    }

    export default Footer
