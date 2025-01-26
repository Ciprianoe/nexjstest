"use client";
// components/navbar.tsx  BY CEEM
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
  
    const toggleMenu = () => {
      setIsActive(!isActive);
    };
  
    return (
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
        
          <a
            role="button"
            className={`navbar-burger ${isActive ? 'is-active' : ''}`}
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
            {/* Este enlace de Home solo se mostrará en el menú desplegable */}
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
        </div>
      </nav>
    );
  };
  
  export default Navbar;