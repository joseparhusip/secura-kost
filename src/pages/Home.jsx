import { useState, useEffect } from 'react'

import carousel1 from '../assets/img/carousel/carousel-1.jpeg'
import carousel2 from '../assets/img/carousel/carousel-2.jpeg'
import carousel3 from '../assets/img/carousel/carousel-3.jpeg'
import carousel4 from '../assets/img/carousel/carousel-4.jpeg'

import fotoIcon from '../assets/icons/foto.png'
import contractIcon from '../assets/icons/contract.png'
import depositIcon from '../assets/icons/deposit.png'
import biayaIcon from '../assets/icons/biaya.png'
import penyewaIcon from '../assets/icons/penyewa.png'
import sengketaIcon from '../assets/icons/sengketa.png'

import verifikasiIcon from '../assets/icons/verifikasi-360.png'
import reviewIcon from '../assets/icons/review.png'
import smartMatchingIcon from '../assets/icons/smart-matching.png'
import escrowIcon from '../assets/icons/escrow-deposit.png'
import kontrakIcon from '../assets/icons/kontrak-digital.png'
import edukasiIcon from '../assets/icons/edukasi-hukum.png'
import mediasiIcon from '../assets/icons/mediasi-konflik.png'
import scamScoreIcon from '../assets/icons/scam-score.png'

import mahasiswaIcon from '../assets/icons/mahasiswa.png'
import pekerjaIcon from '../assets/icons/pekerja.png'
import ekspatriatIcon from '../assets/icons/ekspatriat.png'
import pasutriIcon from '../assets/icons/pasutrii.png'

import AuthCard from './AuthCard'
import TimKami from './TimKami'

const SLIDES = [
  { id: 1, src: carousel1 },
  { id: 2, src: carousel2 },
  { id: 3, src: carousel3 },
  { id: 4, src: carousel4 },
]

const FEATURES = [
  'Kontrak digital sah secara hukum (UU ITE)',
  'Escrow deposit — uang aman hingga syarat terpenuhi',
  'Listing terverifikasi, review berbasis bukti nyata',
  'Edukasi hak & kewajiban penyewa + mediasi konflik',
]

const STATS = [
  { number: '8.5Jt+', label: 'Mahasiswa' },
  { number: '2Jt+',   label: 'Kos Indonesia' },
  { number: '50K+',   label: 'Sengketa/Thn' },
]

const PROBLEMS = [
  { iconSrc: fotoIcon, text: 'Foto iklan tidak sesuai kondisi asli' },
  { iconSrc: contractIcon, text: 'Tidak ada kontrak sewa yang jelas' },
  { iconSrc: depositIcon, text: 'Deposit ditahan tanpa alasan' },
  { iconSrc: biayaIcon, text: 'Biaya tersembunyi & aturan mendadak' },
  { iconSrc: penyewaIcon, text: 'Penyewa muda dalam posisi rentan' },
  { iconSrc: sengketaIcon, text: '50.000+ sengketa kos per tahun' },
]

const SOLUTIONS = [
  {
    iconSrc: verifikasiIcon, 
    title: 'Verifikasi 360°',
    desc: 'Foto & video tur virtual terverifikasi langsung oleh tim kami. Nol foto bohong.'
  },
  {
    iconSrc: reviewIcon, 
    title: 'Review Berbasis Bukti',
    desc: 'Hanya penyewa terverifikasi yang bisa menulis review. Anti-hoax & anti-manipulasi.'
  },
  {
    iconSrc: smartMatchingIcon, 
    title: 'Smart Matching AI',
    desc: 'Rekomendasi kos personal berdasarkan budget, lokasi, gaya hidup & scam score.'
  },
  {
    iconSrc: escrowIcon, 
    title: 'Escrow Deposit',
    desc: 'Dana deposit aman di rekening escrow berlisensi OJK. Cair hanya jika syarat terpenuhi.'
  },
  {
    iconSrc: kontrakIcon, 
    title: 'Kontrak Digital Sah',
    desc: 'Perjanjian sewa sah hukum sesuai UU ITE, ditandatangani digital & tersimpan cloud.'
  },
  {
    iconSrc: edukasiIcon, 
    title: 'Edukasi Hukum',
    desc: 'Dashboard hak & kewajiban penyewa berdasarkan regulasi Indonesia terkini.'
  },
  {
    iconSrc: mediasiIcon, 
    title: 'Mediasi Konflik',
    desc: 'Platform netral sebagai mediator. Backup bukti digital semua transaksi & kontrak.'
  },
  {
    iconSrc: scamScoreIcon, 
    title: 'Scam Score',
    desc: 'Indikator keamanan listing berbasis data historis, verifikasi, dan feedback pengguna.'
  },
]

const TARGET_AUDIENCE = [
  {
    id: 1,
    iconSrc: mahasiswaIcon,
    title: 'Mahasiswa',
    subtitle: '8.5 Juta Aktif di Indonesia',
    colorTheme: 'theme-green',
    tags: ['Dekat kampus', 'Budget hemat', 'Aman & legal']
  },
  {
    id: 2,
    iconSrc: pekerjaIcon,
    title: 'Pekerja Urban',
    subtitle: 'Jutaan Berpindah Tiap Tahun',
    colorTheme: 'theme-brown',
    tags: ['Dekat kantor', 'Kontrak formal', 'Nyaman']
  },
  {
    id: 3,
    iconSrc: ekspatriatIcon,
    title: 'Ekspatriat',
    subtitle: 'WNA Tinggal di Indonesia',
    colorTheme: 'theme-blue',
    tags: ['Legal protection', 'Transparan', 'English OK']
  },
  {
    id: 4,
    iconSrc: pasutriIcon,
    title: 'Pasangan / Pasutri',
    subtitle: 'Keluarga Muda Baru Menikah',
    colorTheme: 'theme-pink',
    tags: ['Keamanan utama', 'Fasilitas lengkap', 'Kontrak bulanan']
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1))
    }, 5000) 
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <section className="carousel-section">
        <div className="carousel__container">
          {SLIDES.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`carousel__slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={slide.src} alt={`Promo ${slide.id}`} />
            </div>
          ))}
        </div>
      </section>

      <section id="platform-kos" className="hero hero--section-2">
        <div className="hero__inner">

          <div className="hero__copy">
            <span className="hero__eyebrow">Platform Kos #1 Indonesia</span>

            <h1 className="hero__headline">Sewa Kos</h1>
            <h2 className="hero__subheadline">
              <em>Aman & Terlindungi</em> Hukum
            </h2>

            <p className="hero__desc">
              Platform marketplace kos pertama yang menggabungkan verifikasi,
              kontrak digital sah hukum, escrow deposit, dan edukasi hukum
              dalam satu ekosistem.
            </p>

            <ul className="hero__features">
              {FEATURES.map((f, i) => (
                <li key={i} className="feature-item">
                  <span className="feature-item__dot" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="hero__stats">
              {STATS.map((s, i) => (
                <div key={i} className="stat">
                  <span className="stat__number">{s.number}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__auth">
            <AuthCard />
          </div>

        </div>
      </section>

      <section id="masalah" className="section-padding bg-off-white problems">
        <div className="container-center">
          <span className="section-eyebrow">MENGAPA SECURAKOST?</span>
          <h2 className="section-title">Masalah Nyata di Pasar Kos Indonesia</h2>
          <p className="section-subtitle">
            Setiap tahun, jutaan penyewa kos menghadapi masalah yang sama. Sudah saatnya ada solusi yang nyata.
          </p>

          <div className="problems__pills">
            {PROBLEMS.map((problem, i) => (
              <div key={i} className="problem-pill">
                <span className="problem-pill__icon">
                  <img 
                    src={problem.iconSrc} 
                    alt="icon" 
                    style={{ width: '22px', height: '22px', objectFit: 'contain' }} 
                  />
                </span>
                <span className="problem-pill__text">{problem.text}</span>
              </div>
            ))}
          </div>

          <button className="btn-green">
            Temukan Solusinya
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </section>

      <section id="solusi" className="section-padding bg-white solutions">
        <div className="container-left">
          <span className="section-eyebrow">SOLUSI KAMI</span>
          <h2 className="section-title">Platform Legal Protection<br/>Pertama di Indonesia</h2>
          
          <div className="solutions__grid">
            {SOLUTIONS.map((solution, i) => (
              <div key={i} className="solution-card">
                <div className="solution-card__icon">
                  <img 
                    src={solution.iconSrc} 
                    alt={solution.title} 
                    style={{ width: '32px', height: '32px', objectFit: 'contain' }} 
                  />
                </div>
                <h4 className="solution-card__title">{solution.title}</h4>
                <p className="solution-card__desc">{solution.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="section-padding how-it-works">
        <div className="container-center" style={{ maxWidth: '1200px' }}>
          <span className="section-eyebrow eyebrow-orange">CARA KERJA PLATFORM</span>
          <h2 className="section-title text-white">Mudah, Aman, Terlindungi</h2>
          <p className="section-subtitle text-light">
            Dari daftar hingga huni — semua proses sewa terlindungi secara hukum di SecuraKost
          </p>

          <div className="timeline-grid">
            <div className="timeline-line"></div>

            <div className="timeline-step">
              <div className="timeline-number">1</div>
              <div className="timeline-card">
                <h4>Daftar & Pilih Peran</h4>
                <p>Pemilik daftar & verifikasi listing. Penyewa buat akun & atur preferensi kos.</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-number">2</div>
              <div className="timeline-card">
                <h4>Cari & Smart Match</h4>
                <p>AI merekomendasikan kos terbaik. Lihat tur 360°, baca review, cek scam score.</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-number">3</div>
              <div className="timeline-card">
                <h4>Ajukan & Kontrak Digital</h4>
                <p>Bayar via escrow, tanda tangani kontrak digital sah hukum secara online.</p>
              </div>
            </div>

            <div className="timeline-step">
              <div className="timeline-number">4</div>
              <div className="timeline-card">
                <h4>Huni dengan Tenang</h4>
                <p>Tinggal terlindungi. Mediasi tersedia jika ada masalah. Deposit kembali sesuai kontrak.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="edukasi" className="section-padding bg-off-white target-audience">
        <div className="container-left">
          <span className="section-eyebrow">DIRANCANG UNTUK KAMU</span>
          <h2 className="section-title">Melayani Semua Kebutuhan<br/>Hunian Sementara</h2>

          <div className="audience-grid">
            {TARGET_AUDIENCE.map((item) => (
              <div key={item.id} className={`audience-card ${item.colorTheme}`}>
                <div className="audience-emoji">
                  <img 
                    src={item.iconSrc} 
                    alt={item.title} 
                    style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
                  />
                </div>
                <h4 className="audience-title">{item.title}</h4>
                <p className="audience-subtitle">{item.subtitle}</p>
                
                <div className="audience-tags">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="audience-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Komponen TimKami dipanggil di sini */}
      <TimKami />
      
    </>
  )
}