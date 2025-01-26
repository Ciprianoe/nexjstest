"use client";
// components/navbar.tsx  BY CEEM
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
  
    const toggleMenu = () => {
      setIsActive(!isActive);
    };
  
    return (
   <nav className="navbar has-background-primary" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a
      role="button"
      className={`navbar-burger has-text-white ${isActive ? 'is-active' : ''}`}
      aria-label="menu"
      aria-expanded={isActive}
      onClick={toggleMenu}
      data-target="navbarBasicExample"
    >
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
    <div className="navbar-start">
      <Link className="navbar-item" href="/">
        Home
      </Link>
      <Link className="navbar-item" href="/mentorings">
        Mentorías
      </Link>
      <Link className="navbar-item" href="/courses">
        Cursos
      </Link>
    </div>

    <div className="navbar-end">
      <div className="navbar-item has-dropdown is-hoverable">
        <a className="navbar-link has-text-white" aria-haspopup="true" aria-controls="dropdown-notifications">
          <span className="icon" style={{ position: 'relative' }}>
            <i className="fas fa-bell"></i>
            <span className="tag is-danger is-small" style={{ 
              position: 'absolute', 
              top: '0', 
              right: '0', 
              transform: 'translate(50%, -50%)', 
              fontSize: '0.7em', 
              padding: '0.2em 0.4em' 
            }}>
              2
            </span>
          </span>
        </a>
        <div className="navbar-dropdown" id="dropdown-notifications">
          <a className="navbar-item">Notificación 1</a>
          <a className="navbar-item">Notificación 2</a>
          <a className="navbar-item">Ver todas las notificaciones</a>
        </div>
      </div>
      <div className="navbar-item">
        <span className="icon has-text-white">
          <i className="fas fa-user"></i>
        </span>
      </div>
    </div>
  </div>
</nav>  
    

    );
  };
  
  export default Navbar;