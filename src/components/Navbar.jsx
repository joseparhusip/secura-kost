import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLogoClick = () => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Scroll ke section dengan offset agar tidak tertutup navbar fixed
  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) return
    const navbar = document.querySelector('.navbar')
    const navbarHeight = navbar ? navbar.offsetHeight : 70
    // top navbar ada di 24px dari atas (lihat CSS: top: 24px)
    const navbarBottom = 24 + navbarHeight
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({
      top: sectionTop - navbarBottom - 16, // 16px breathing room
      behavior: 'smooth'
    })
  }

  const handleAuthAction = (e, tabName) => {
    e.preventDefault()

    // 1. Tutup drawer dulu (animasi 350ms)
    setMenuOpen(false)

    // 2. Tunggu drawer selesai, baru scroll + dispatch event
    setTimeout(() => {
      scrollToSection('platform-kos')

      // 3. Sedikit delay lagi baru switch tab supaya AuthCard sudah visible
      setTimeout(() => {
        const event = new CustomEvent('switchAuthTab', { detail: tabName })
        window.dispatchEvent(event)
      }, 150)
    }, 380)
  }

  const handleNavLink = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (location.pathname !== '/') {
      window.location.href = '/' + href
      return
    }
    const id = href.replace('#', '')
    setTimeout(() => {
      scrollToSection(id)
    }, 380)
  }

  return (
    <>
      <nav className="navbar">
        <Link
          to="/"
          className="navbar__logo"
          style={{ textDecoration: 'none' }}
          onClick={handleLogoClick}
        >
          Secura<span>Kost</span>
        </Link>

        <ul className="navbar__links">
          <li><a href="#masalah" onClick={(e) => handleNavLink(e, '#masalah')}>Masalah</a></li>
          <li><a href="#solusi" onClick={(e) => handleNavLink(e, '#solusi')}>Solusi</a></li>
          <li><a href="#cara-kerja" onClick={(e) => handleNavLink(e, '#cara-kerja')}>Cara Kerja</a></li>
          <li><Link to="/edukasi">Edukasi Hukum</Link></li>
          <li><a href="#tim-kami" onClick={(e) => handleNavLink(e, '#tim-kami')}>Tim Kami</a></li>
        </ul>

        <div className="navbar__actions navbar__actions--desktop">
          <a
            href="#platform-kos"
            className="btn-masuk"
            onClick={(e) => handleAuthAction(e, 'masuk')}
            style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}
          >
            Masuk
          </a>
          <button className="btn-daftar" onClick={(e) => handleAuthAction(e, 'daftar')}>
            Daftar Gratis
          </button>
        </div>

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

      <div
        className={`mobile-overlay ${menuOpen ? 'mobile-overlay--visible' : ''}`}
        onClick={() => setMenuOpen(false)}
      />

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

        <nav className="mobile-drawer__nav">
          <a className="mobile-drawer__link" href="#masalah" onClick={(e) => handleNavLink(e, '#masalah')}>Masalah</a>
          <a className="mobile-drawer__link" href="#solusi" onClick={(e) => handleNavLink(e, '#solusi')}>Solusi</a>
          <a className="mobile-drawer__link" href="#cara-kerja" onClick={(e) => handleNavLink(e, '#cara-kerja')}>Cara Kerja</a>
          <Link className="mobile-drawer__link" to="/edukasi" onClick={() => setMenuOpen(false)}>Edukasi Hukum</Link>
          <a className="mobile-drawer__link" href="#tim-kami" onClick={(e) => handleNavLink(e, '#tim-kami')}>Tim Kami</a>
        </nav>

        <div className="mobile-drawer__actions">
          <a
            href="#platform-kos"
            className="mobile-drawer__btn mobile-drawer__btn--outline"
            onClick={(e) => handleAuthAction(e, 'masuk')}
          >
            Masuk
          </a>
          <button
            className="mobile-drawer__btn mobile-drawer__btn--solid"
            onClick={(e) => handleAuthAction(e, 'daftar')}
          >
            Daftar Gratis
          </button>
        </div>
      </div>
    </>
  )
}