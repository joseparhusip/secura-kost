import { useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import '../css/edukasi.css'

import homeIcon from '../assets/icons/icons-details/home.png'
import depositIcon from '../assets/icons/deposit.png'
import contractIcon from '../assets/icons/contract.png'
import wifiIcon from '../assets/icons/icons-details/wifi.png'
import mediasiIcon from '../assets/icons/mediasi-konflik.png'

import coinsIcon from '../assets/icons/icons-details/coins.png'
import aturanTamuIcon from '../assets/icons/icons-details/aturan-tamu.png'
import verifikasiIcon from '../assets/icons/icons-details/verifikasi.png'

import edukasiHukumIcon from '../assets/icons/edukasi-hukum.png'
import kontrakDigitalIcon from '../assets/icons/kontrak-digital.png'

import sengketaIcon from '../assets/icons/sengketa.png'
import scamScoreIcon from '../assets/icons/scam-score.png'
import escrowDepositIcon from '../assets/icons/escrow-deposit.png'

import escrowIcon from '../assets/icons/icons-details/escrow.png'
import verifikasi360Icon from '../assets/icons/verifikasi-360.png'
import bakcupIcon from '../assets/icons/icons-details/bakcup.png'

const TABS = [
  { id: 'hak-penyewa',         label: 'Hak Penyewa' },
  { id: 'hak-pemilik',         label: 'Hak Pemilik' },
  { id: 'kontrak-digital',     label: 'Kontrak Digital' },
  { id: 'regulasi',            label: 'Regulasi' },
  { id: 'keamanan-transaksi',  label: 'Keamanan Transaksi' },
]

const HAK_PENYEWA = [
  {
    iconSrc: homeIcon,
    title: 'Hak atas Hunian Sesuai Perjanjian',
    color: '#f0f5ec',
    desc: 'Kamu berhak mendapatkan kamar dan fasilitas sesuai dengan yang dijanjikan dalam kontrak atau iklan listing yang terverifikasi.',
    points: [
      'Fasilitas sesuai deskripsi',
      'Kondisi kamar layak huni',
      'Akses sesuai perjanjian'
    ]
  },
  {
    iconSrc: depositIcon,
    title: 'Hak atas Pengembalian Deposit',
    color: '#fdf2eb',
    desc: 'Deposit harus dikembalikan sesuai perjanjian kontrak, dikurangi kerusakan yang terbukti. Escrow SecuraKost menjamin ini.',
    points: [
      'Dikembalikan tepat waktu',
      'Rincian potongan harus jelas',
      'Proses via escrow OJK'
    ]
  },
  {
    iconSrc: contractIcon,
    title: 'Hak atas Kontrak yang Jelas',
    color: '#f0f6ff',
    desc: 'Setiap penyewa berhak mendapatkan kontrak tertulis yang jelas sebelum menghuni. Kontrak digital SecuraKost sah secara hukum.',
    points: [
      'Kontrak jelas & transparan',
      'Salinan tersimpan cloud',
      'Bisa diakses kapan saja'
    ]
  },
  {
    iconSrc: mediasiIcon,
    title: 'Hak atas Mediasi Sengketa',
    color: '#fefbec',
    desc: 'Jika terjadi sengketa, kamu berhak mendapat mediasi yang adil dan netral melalui platform SecuraKost sebelum ke jalur hukum.',
    points: [
      'Mediasi netral & adil',
      'Bukti digital tersimpan',
      'Proses transparan'
    ]
  },
  {
    iconSrc: verifikasi360Icon,
    title: 'Hak atas Privasi & Data',
    color: '#fdf2f4',
    desc: 'Data pribadimu dilindungi oleh UU PDP No. 27/2022. SecuraKost wajib menjaga kerahasiaan data sesuai regulasi.',
    points: [
      'Data dienkripsi',
      'Informed consent wajib',
      'Hak hapus data'
    ]
  },
  {
    iconSrc: edukasiHukumIcon,
    title: 'Hak atas Informasi Transparan',
    color: '#f5f3ff',
    desc: 'Kamu berhak mendapat informasi lengkap tentang biaya, peraturan, dan kondisi kost sebelum memutuskan sewa. Tidak boleh ada biaya tersembunyi.',
    points: [
      'Rincian biaya lengkap',
      'Peraturan tertulis jelas',
      'Tidak ada info menyesatkan'
    ]
  },
]

const HAK_PEMILIK = [
  {
    iconSrc: coinsIcon,
    title: 'Hak Menerima Pembayaran',
    color: '#f0f5ec', 
    desc: 'Pemilik berhak menerima pembayaran sewa tepat waktu sesuai perjanjian kontrak. Sistem escrow menjamin keamanan transaksi.'
  },
  {
    iconSrc: homeIcon,
    title: 'Hak Menetapkan Peraturan',
    color: '#fdf2eb', 
    desc: 'Pemilik berhak menetapkan peraturan kost yang wajar dan tertulis dalam kontrak. Peraturan tidak boleh diskriminatif.'
  },
  {
    iconSrc: verifikasiIcon,
    title: 'Kewajiban Menjaga Hunian',
    color: '#f0f6ff', 
    desc: 'Pemilik wajib memastikan kondisi hunian layak sesuai deskripsi listing yang sudah terverifikasi SecuraKost.'
  },
]

const KONTRAK = [
  {
    iconSrc: contractIcon,
    title: 'Dasar Hukum Kontrak Digital',
    color: '#f0f5ec',
    desc: 'Kontrak digital sah berdasarkan:',
    points: [
      'UU ITE No. 11/2008 — mengakui dokumen elektronik sebagai alat bukti sah',
      'KUH Perdata — kontrak sah jika memenuhi syarat: sepakat, kecakapan, hal tertentu, dan sebab yang halal',
      'PP PSTE No. 71/2019 — sistem elektronik wajib terdaftar',
    ]
  },
  {
    iconSrc: kontrakDigitalIcon,
    title: 'Kekuatan Tanda Tangan Digital',
    color: '#f0f6ff', 
    desc: 'Tanda tangan digital di SecuraKost:',
    points: [
      'Sah secara hukum sesuai UU ITE',
      'Tidak bisa dipalsukan (enkripsi)',
      'Memiliki timestamp yang valid',
      'Tersimpan aman di cloud',
      'Bisa dijadikan bukti hukum'
    ]
  },
]

const REGULASI = [
  {
    iconSrc: contractIcon,
    tag: 'Kontrak Sewa',
    tagColor: '#2d6b55', 
    tagBg: '#eef7f3',
    title: 'KUH Perdata',
    desc: 'Dasar hukum perjanjian sewa antara penyewa dan pemilik. Mengatur hak, kewajiban, dan penyelesaian sengketa kontrak sewa.'
  },
  {
    iconSrc: verifikasiIcon,
    tag: 'Konsumen',
    tagColor: '#d97706', 
    tagBg: '#fef3c7',
    title: 'UU Perlindungan Konsumen No. 8/1999',
    desc: 'Melarang informasi menyesatkan dalam iklan. Mewajibkan transparansi informasi produk/layanan kepada konsumen.'
  },
  {
    iconSrc: kontrakDigitalIcon,
    tag: 'Digital Legal',
    tagColor: '#2563eb', 
    tagBg: '#eff6ff',
    title: 'UU ITE No. 11/2008 Jo. No. 19/2016',
    desc: 'Mengakui keabsahan dokumen elektronik dan tanda tangan digital sebagai alat bukti hukum yang sah di Indonesia.'
  },
  {
    iconSrc: wifiIcon,
    tag: 'Sistem Elektronik',
    tagColor: '#b45309', 
    tagBg: '#fffbeb',
    title: 'PP PSTE No. 71/2019',
    desc: 'Mewajibkan platform digital untuk mendaftar sebagai Penyelenggara Sistem Elektronik (PSE) di Kominfo sebelum beroperasi.'
  },
  {
    iconSrc: verifikasi360Icon,
    tag: 'Data Pribadi',
    tagColor: '#be123c', 
    tagBg: '#fff1f2',
    title: 'UU PDP No. 27/2022',
    desc: 'Perlindungan data pribadi pengguna. Mewajibkan enkripsi data, informed consent, dan hak pengguna atas datanya.'
  },
  {
    iconSrc: escrowDepositIcon,
    tag: 'Keuangan',
    tagColor: '#4338ca', 
    tagBg: '#eef2ff',
    title: 'Regulasi OJK — Fintech & Escrow',
    desc: 'Sistem escrow deposit harus berlisensi OJK atau bermitra dengan lembaga keuangan berizin. Menjamin keamanan dana penyewa.'
  },
]

const KEAMANAN = [
  {
    iconSrc: escrowIcon,
    title: 'Sistem Escrow Deposit',
    color: '#f0f5ec', 
    desc: 'Dana deposit tidak langsung ke pemilik. Tersimpan aman di rekening escrow berlisensi OJK hingga syarat kontrak terpenuhi. Penyewa terlindungi dari risiko deposit hilang.'
  },
  {
    iconSrc: verifikasi360Icon,
    title: 'Enkripsi End-to-End',
    color: '#f0f6ff',
    desc: 'Semua data dan transaksi dienkripsi menggunakan standar keamanan terkini. Data pribadimu tidak pernah dijual ke pihak ketiga.'
  },
  {
    iconSrc: bakcupIcon,
    title: 'Backup Bukti Digital',
    color: '#fdf2eb', 
    desc: 'Semua kontrak, bukti pembayaran, dan komunikasi tersimpan sebagai bukti digital yang dapat digunakan jika terjadi sengketa.'
  },
]

function HakPenyewaContent() {
  return (
    <div className="edu-content">
      <h2 className="edu-section-title">Hak-Hak Penyewa Kost</h2>
      <p className="edu-section-sub">Sebagai penyewa kost, kamu memiliki hak-hak yang dilindungi oleh hukum Indonesia</p>
      <div className="edu-cards-grid">
        {HAK_PENYEWA.map((item, i) => (
          <div key={i} className="edu-card edu-card--list" style={{ background: item.color }}>
            <div className="edu-card-icon">
              <img src={item.iconSrc} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <div className="edu-card-body">
              {item.desc && <p>{item.desc}</p>}
              {item.points && (
                <ul>
                  {item.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function HakPemilikContent() {
  return (
    <div className="edu-content">
      <h2 className="edu-section-title">Hak & Kewajiban Pemilik Kost</h2>
      <div className="edu-cards-grid edu-cards-grid--3" style={{ marginTop: '32px' }}>
        {HAK_PEMILIK.map((item, i) => (
          <div key={i} className="edu-card" style={{ background: item.color }}>
            <div className="edu-card-icon">
              <img src={item.iconSrc} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <div className="edu-card-body">
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KontrakDigitalContent() {
  return (
    <div className="edu-content">
      <h2 className="edu-section-title">Kontrak Digital & Tanda Tangan Digital</h2>
      <p className="edu-section-sub">Memahami legalitas kontrak digital dalam sewa kost</p>
      <div className="edu-cards-grid edu-cards-grid--3">
        {KONTRAK.map((item, i) => (
          <div key={i} className="edu-card edu-card--list" style={{ background: item.color }}>
            <div className="edu-card-icon">
              <img src={item.iconSrc} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <div className="edu-card-body">
              {item.desc && <p>{item.desc}</p>}
              {item.points && (
                <ul>
                  {item.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RegulasiContent() {
  return (
    <div className="edu-content">
      <h2 className="edu-section-title">Regulasi yang Melindungi Kamu</h2>
      <p className="edu-section-sub">Platform SecuraKost dibangun dengan pendekatan Legal by Design</p>
      <div className="edu-regulasi-list">
        {REGULASI.map((item, i) => (
          <div key={i} className="edu-regulasi-item">
            <div className="edu-regulasi-icon">
              <img src={item.iconSrc} alt={item.title} />
            </div>
            <div className="edu-regulasi-body">
              <strong style={{ fontWeight: 700 }}>{item.title}</strong>
              <p>{item.desc}</p>
            </div>
            <span className="edu-tag" style={{ color: item.tagColor, background: item.tagBg }}>{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function KeamananContent() {
  return (
    <div className="edu-content">
      <h2 className="edu-section-title">Keamanan Transaksi Digital</h2>
      <div className="edu-cards-grid edu-cards-grid--3" style={{ marginTop: '32px' }}>
        {KEAMANAN.map((item, i) => (
          <div key={i} className="edu-card" style={{ background: item.color }}>
            <div className="edu-card-icon">
              <img src={item.iconSrc} alt={item.title} />
            </div>
            <h4>{item.title}</h4>
            <div className="edu-card-body">
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const CONTENT_MAP = {
  'hak-penyewa':        <HakPenyewaContent />,
  'hak-pemilik':        <HakPemilikContent />,
  'kontrak-digital':    <KontrakDigitalContent />,
  'regulasi':           <RegulasiContent />,
  'keamanan-transaksi': <KeamananContent />,
}

export default function EdukasiHukum() {
  const [activeTab, setActiveTab] = useState('hak-penyewa')
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

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

  const handleNavigation = (path, state = null) => {
    setMenuOpen(false)
    navigate(path, { state })
  }

  return (
    <div className="edu-page">
      <nav className="navbar">
        <div
          className="navbar__logo"
          style={{ cursor: 'pointer' }}
          onClick={() => handleNavigation('/')}
        >
          Secura<span>Kost</span>
        </div>
        
        <ul className="navbar__links">
          <li><Link to="/#masalah">Masalah</Link></li>
          <li><Link to="/#solusi">Solusi</Link></li>
          <li><Link to="/#cara-kerja">Cara Kerja</Link></li>
          <li className="nav-active"><Link to="/edukasi">Edukasi Hukum</Link></li>
        </ul>

        <div className="navbar__actions navbar__actions--desktop">
          <button 
            className="btn-masuk"
            style={{ cursor: 'pointer', background: 'transparent', border: 'none', color: '#fff', fontSize: '14px', fontWeight: '600' }}
            onClick={() => handleNavigation('/', { scrollToAuth: true, tab: 'masuk' })}
          >
            Masuk
          </button>
          
          <button 
            className="btn-daftar"
            onClick={() => handleNavigation('/', { scrollToAuth: true, tab: 'daftar' })}
          >
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
          <div
            className="navbar__logo"
            style={{ cursor: 'pointer', fontSize: '20px' }}
            onClick={() => handleNavigation('/')}
          >
            Secura<span>Kost</span>
          </div>
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
          <Link className="mobile-drawer__link" to="/#masalah" onClick={() => setMenuOpen(false)}>Masalah</Link>
          <Link className="mobile-drawer__link" to="/#solusi" onClick={() => setMenuOpen(false)}>Solusi</Link>
          <Link className="mobile-drawer__link" to="/#cara-kerja" onClick={() => setMenuOpen(false)}>Cara Kerja</Link>
          <Link className="mobile-drawer__link" to="/edukasi" onClick={() => setMenuOpen(false)}>Edukasi Hukum</Link>
        </nav>

        <div className="mobile-drawer__actions">
          <button
            className="mobile-drawer__btn mobile-drawer__btn--outline"
            onClick={() => handleNavigation('/', { scrollToAuth: true, tab: 'masuk' })}
          >
            Masuk
          </button>
          <button
            className="mobile-drawer__btn mobile-drawer__btn--solid"
            onClick={() => handleNavigation('/', { scrollToAuth: true, tab: 'daftar' })}
          >
            Daftar Gratis
          </button>
        </div>
      </div>

      <section className="edu-hero">
        <span className="edu-hero__eyebrow">⚖️ EDUKASI HUKUM</span>
        <h1 className="edu-hero__title">
          Kenali Hak & Kewajibanmu<br />sebagai Penyewa Kost
        </h1>
        <p className="edu-hero__sub">
          Informasi hukum lengkap dan terpercaya untuk penyewa dan pemilik kost di Indonesia
        </p>

        <div className="edu-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`edu-tab ${activeTab === tab.id ? 'edu-tab--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <section className="edu-body">
        {CONTENT_MAP[activeTab]}
      </section>
    </div>
  )
}