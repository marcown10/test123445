import React from 'react'

    function Navbar() {
      return (
        <nav className="navbar">
          <div className="navbar-brand">
            <h2>Todo Master</h2>
          </div>
          <div className="navbar-menu">
            <a href="#" className="navbar-item">Home</a>
            <a href="#" className="navbar-item">About</a>
            <a href="#" className="navbar-item">Contact</a>
          </div>
        </nav>
      )
    }

    export default Navbar
