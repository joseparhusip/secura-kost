import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../css/AuthCard.css'

import googleIcon from '../assets/icons/google.png'
import waIcon from '../assets/icons/whatsappp.png'

const DUMMY_USERS = [
  { email: 'marsha@email.com', password: 'password123', name: 'Marsha Faris', initials: 'MF' },
  { email: 'raghib@email.com', password: 'password123', name: 'Raghib Nazhif', initials: 'RN' },
  { email: 'cynara@email.com', password: 'password123', name: 'Cynara Delysia Emry', initials: 'CD' },
  { email: 'budi@email.com', password: 'password123', name: 'Budi Santoso', initials: 'BS' },
  { email: 'ayu@email.com', password: 'password123', name: 'Ayu Lestari', initials: 'AL' },
]

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function AuthCard() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('masuk')
  const [activeRole, setActiveRole] = useState('penyewa')
  const [formMasuk, setFormMasuk] = useState({ email: '', password: '' })
  const [formDaftar, setFormDaftar] = useState({ nama: '', email: '', phone: '' })

  // ── FIX: listener dipasang sekali saat mount, tanpa dependency location.state
  //    agar tidak pernah terlewat eventnya ──
  useEffect(() => {
    const handleSwitch = (event) => {
      if (event.detail) {
        setActiveTab(event.detail)
      }
    }
    window.addEventListener('switchAuthTab', handleSwitch)
    return () => window.removeEventListener('switchAuthTab', handleSwitch)
  }, []) // dependency array kosong = listener selalu aktif selama komponen hidup

  // Handle scroll ke section saat masuk dari page lain
  useEffect(() => {
    if (location.state?.scrollToAuth) {
      if (location.state.tab) {
        setActiveTab(location.state.tab)
      }
      setTimeout(() => {
        const section = document.getElementById('platform-kos')
        if (section) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 300)
    }
  }, [location.state])

  const handleLogin = (e) => {
    e.preventDefault()
    const user = DUMMY_USERS.find(
      (u) => u.email === formMasuk.email && u.password === formMasuk.password
    )
    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user))
      navigate('/search')
    } else {
      alert('Email atau password salah! Gunakan data dummy yang tersedia.')
    }
  }

  return (
    <div className="auth-wrapper">
      {/* Tab Toggle */}
      <div className="auth-tabs">
        <div className="auth-tabs__track">
          <div className={`auth-tabs__indicator ${activeTab === 'daftar' ? 'right' : 'left'}`} />
          <button
            className={`auth-tabs__btn ${activeTab === 'masuk' ? 'active' : ''}`}
            onClick={() => setActiveTab('masuk')}
          >
            Masuk
          </button>
          <button
            className={`auth-tabs__btn ${activeTab === 'daftar' ? 'active' : ''}`}
            onClick={() => setActiveTab('daftar')}
          >
            Daftar
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="auth-card">

        {/* MASUK PANEL */}
        <div className={`auth-panel ${activeTab === 'masuk' ? 'auth-panel--visible' : 'auth-panel--hidden'}`}>
          <div className="auth-panel__head">
            <h2 className="auth-title">Selamat Datang Kembali</h2>
            <p className="auth-subtitle">Masuk untuk melanjutkan pencarian kos aman kamu</p>
          </div>

          <div className="auth-social">
            <button className="auth-social__btn auth-social__btn--google">
              <img src={googleIcon} alt="Google" className="auth-social__icon" /> Google
            </button>
            <button className="auth-social__btn auth-social__btn--wa">
              <img src={waIcon} alt="WhatsApp" className="auth-social__icon" /> WhatsApp
            </button>
          </div>

          <div className="auth-divider"><span>atau dengan email</span></div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="masuk-email">Email</label>
            <input
              id="masuk-email"
              type="email"
              className="auth-input"
              placeholder="marsha@email.com"
              value={formMasuk.email}
              onChange={(e) => setFormMasuk({ ...formMasuk, email: e.target.value })}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="masuk-password">Password</label>
            <input
              id="masuk-password"
              type="password"
              className="auth-input"
              placeholder="password123"
              value={formMasuk.password}
              onChange={(e) => setFormMasuk({ ...formMasuk, password: e.target.value })}
            />
          </div>

          <div className="auth-forgot">
            <a href="#">Lupa password?</a>
          </div>

          <button className="auth-submit auth-submit--green" onClick={handleLogin}>
            Masuk <ArrowIcon />
          </button>

          <p className="auth-switch">
            Belum punya akun?{' '}
            <button className="auth-switch__link" onClick={() => setActiveTab('daftar')}>
              Daftar sekarang
            </button>
          </p>
        </div>

        {/* DAFTAR PANEL */}
        <div className={`auth-panel ${activeTab === 'daftar' ? 'auth-panel--visible' : 'auth-panel--hidden'}`}>
          <div className="auth-panel__head">
            <h2 className="auth-title">Bergabung Gratis</h2>
            <p className="auth-subtitle">Buat akun dan pilih peranmu di SecuraKost</p>
          </div>

          <p className="auth-label" style={{ marginBottom: '10px' }}>Kamu adalah...</p>
          <div className="auth-roles">
            <div
              className={`auth-role ${activeRole === 'penyewa' ? 'active' : ''}`}
              onClick={() => setActiveRole('penyewa')}
            >
              <div className="auth-role__emoji">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <div className="auth-role__name">Penyewa</div>
              <div className="auth-role__desc">Cari kos aman & terlindungi</div>
            </div>
            <div
              className={`auth-role ${activeRole === 'pemilik' ? 'active' : ''}`}
              onClick={() => setActiveRole('pemilik')}
            >
              <div className="auth-role__emoji">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/><circle cx="12" cy="7" r="1" fill="currentColor"/>
                </svg>
              </div>
              <div className="auth-role__name">Pemilik Kos</div>
              <div className="auth-role__desc">Daftarkan & kelola kostmu</div>
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="daftar-nama">Nama Lengkap</label>
            <input
              id="daftar-nama"
              type="text"
              className="auth-input"
              placeholder="Masukkan nama lengkap"
              value={formDaftar.nama}
              onChange={(e) => setFormDaftar({ ...formDaftar, nama: e.target.value })}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="daftar-email">Email</label>
            <input
              id="daftar-email"
              type="email"
              className="auth-input"
              placeholder="kamu@email.com"
              value={formDaftar.email}
              onChange={(e) => setFormDaftar({ ...formDaftar, email: e.target.value })}
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="daftar-phone">Nomor HP / WhatsApp</label>
            <input
              id="daftar-phone"
              type="tel"
              className="auth-input"
              placeholder="+62 812 xxxx xxxx"
              value={formDaftar.phone}
              onChange={(e) => setFormDaftar({ ...formDaftar, phone: e.target.value })}
            />
          </div>

          <button className="auth-submit auth-submit--orange" onClick={() => navigate('/search')}>
            Buat Akun <ArrowIcon />
          </button>

          <p className="auth-switch">
            Sudah punya akun?{' '}
            <button className="auth-switch__link" onClick={() => setActiveTab('masuk')}>
              Masuk
            </button>
          </p>
        </div>

      </div>
    </div>
  )
}