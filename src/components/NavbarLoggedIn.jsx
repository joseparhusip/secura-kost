import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function NavbarLoggedIn() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState({ name: 'Tamu', initials: '?' });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const firstName = parsedUser.name.split(' ')[0];
      setUserData({
        name: firstName,
        initials: parsedUser.initials,
        fullName: parsedUser.name
      });
    }
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLogoClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCaraKerjaClick = () => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      const section = document.getElementById('cara-kerja');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#cara-kerja');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <>
      <nav className="navbar navbar--logged-in">
        
        <Link 
          to="/" 
          className="navbar__logo" 
          style={{ textDecoration: 'none' }}
          onClick={handleLogoClick}
        >
          Secura<span>Kost</span>
        </Link>

        <div className="navbar__center" style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-nav-outline" onClick={handleCaraKerjaClick}>
            Cara Kerja
          </button>
          <button className="btn-nav-outline" onClick={() => navigate('/edukasi')}>
            Edukasi Hukum
          </button>
        </div>

        <div className="navbar__actions navbar__actions--desktop">
          <button className="btn-nav-solid" onClick={handleLogout} title="Klik untuk keluar akun">
            Keluar
          </button>
          
          <div className="user-profile" title={userData.fullName}>
            <div className="user-avatar">{userData.initials}</div>
            <span className="user-name">{userData.name}</span>
          </div>
        </div>

        {/* Hamburger Mobile */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
        </button>
      </nav>

      {/* Drawer Overlay Mobile */}
      <div
        className={`mobile-overlay ${menuOpen ? 'mobile-overlay--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer Panel Mobile */}
      <div className={`mobile-drawer ${menuOpen ? 'mobile-drawer--open' : ''}`}>
        <div className="mobile-drawer__header">
          <Link
            to="/"
            className="navbar__logo"
            style={{ textDecoration: 'none', fontSize: '20px' }}
            onClick={handleLogoClick}
          >
            Secura<span>Kost</span>
          </Link>
          <button
            className="mobile-drawer__close"
            onClick={() => setMenuOpen(false)}
            aria-label="Tutup menu"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Profile Info Mobile */}
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div className="user-avatar" style={{ width: '48px', height: '48px', fontSize: '18px' }}>
            {userData.initials}
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>{userData.fullName}</div>
            <div style={{ color: '#a8c9bc', fontSize: '13px' }}>Pengguna Terverifikasi</div>
          </div>
        </div>

        <nav className="mobile-drawer__nav">
          <button className="mobile-drawer__link" onClick={handleCaraKerjaClick} style={{ background: 'transparent', border: 'none', textAlign: 'left', width: '100%', fontFamily: 'inherit' }}>Cara Kerja</button>
          <Link className="mobile-drawer__link" to="/edukasi" onClick={() => setMenuOpen(false)}>Edukasi Hukum</Link>
        </nav>

        <div className="mobile-drawer__actions">
          <button
            className="mobile-drawer__btn mobile-drawer__btn--outline"
            onClick={handleLogout}
            style={{ borderColor: '#ef4444', color: '#ef4444' }}
          >
            Keluar Akun
          </button>
        </div>
      </div>
    </>
  );
}