'use client'; 
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './navbar.css'; // Your existing CSS

const MoveNavbar: React.FC = () => {
  const pathname = usePathname(); // Get current path
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link href="/">
          <img src="/Logo4.png" alt="Logo" />
        </Link>
      </div>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="navbar"
      >
        {isMenuOpen ? (
          <span className="cross">✖</span>
        ) : (
          <>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </>
        )}
      </button>

      <nav id="navbar" className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <Link href="/" className={pathname === '/' ? 'active' : ''} onClick={toggleMenu}>
          Home
        </Link>
        <Link
          href="/subcontractform"
          className={pathname === '/subcontractform' ? 'active' : ''}
          onClick={toggleMenu}
        >
          Get A Quote
        </Link>
        <Link href="/recovery" className={pathname === '/recovery' ? 'active' : ''} onClick={toggleMenu}>
          Recover Your Car
        </Link>
        <Link
          href="/becomeadriver"
          className={pathname === '/becomeadriver' ? 'active' : ''}
          onClick={toggleMenu}
        >
          Drive For Us
        </Link>
        <Link href="/services" className={pathname === '/services' ? 'active' : ''} onClick={toggleMenu}>
          Our Services
        </Link>
        <Link
          href="/contactus"
          className={pathname === '/contactus' ? 'active' : ''}
          onClick={toggleMenu}
        >
          Contact Us
        </Link>
      </nav>
    </header>
  );
};

export default MoveNavbar;
