import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLoggedIn from '../components/NavbarLoggedIn';
import '../css/style.css';

import img1 from '../assets/img/kost/kost-1/kamar-kost-1.jpeg';
import img2 from '../assets/img/kost/kost-2/kamar-kost-2.jpeg';
import img3 from '../assets/img/kost/kost-3/kamar-kost-3.jpg';
import img4 from '../assets/img/kost/kost-4/kamar-kost-4.jpg';
import img5 from '../assets/img/kost/kost-5/kamar-kost-1.png';
import img6 from '../assets/img/kost/kost-6/kamar-kost-6.jpeg';
import img7 from '../assets/img/kost/kost-7/kamar-kost-7.webp';

import iconAc from '../assets/icons/icons-details/ac.png';
import iconWifi from '../assets/icons/icons-details/wifi.png';
import iconLokasi from '../assets/icons/icons-details/lokasi.png';
import iconReview from '../assets/icons/icons-details/review.png';
import iconEscrow from '../assets/icons/icons-details/escrow.png';
import iconSimpan from '../assets/icons/icons-details/simpan.png';
import iconKamarMandi from '../assets/icons/icons-details/kamar-mandi.png';
import iconHome from '../assets/icons/icons-details/home.png';

const FASILITAS_OPTIONS = ['AC', 'WiFi', 'Kamar Mandi Dalam', 'Dapur Bersama', 'Parkir'];
const TIPE_OPTIONS = ['Campur', 'Putra', 'Putri'];

export default function SearchKost() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('Semua harga');
  const [selectedTipe, setSelectedTipe] = useState('Semua tipe');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const [aiForm, setAiForm] = useState({
    target: '',
    budget: '',
    tipe: [],
    fasilitas: [],
  });

  useEffect(() => {
    document.body.style.overflow = (isMobileFilterOpen || isAiModalOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileFilterOpen, isAiModalOpen]);

  const toggleFilter = (filterName) => {
    setActiveFilters(prev =>
      prev.includes(filterName) ? prev.filter(f => f !== filterName) : [...prev, filterName]
    );
  };

  const toggleAiChip = (field, value) => {
    setAiForm(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleAiMatch = () => {
    let newFilters = [];
    if (aiForm.target) newFilters.push(aiForm.target);
    if (aiForm.fasilitas.length > 0) newFilters = [...newFilters, ...aiForm.fasilitas];
    setActiveFilters(newFilters);
    setSelectedBudget(aiForm.budget || 'Semua harga');
    if (aiForm.tipe.length === 1) {
      setSelectedTipe(`Kost ${aiForm.tipe[0]}`);
    } else {
      setSelectedTipe('Semua tipe');
    }
    setIsAiModalOpen(false);
    setAiForm({ target: '', budget: '', tipe: [], fasilitas: [] });
  };

  const initialKostData = [
    { id: 1, image: img1, nama: "Kost Putri Melati", lokasi: "Cihampelas, Bandung", hargaNum: 1200000, harga: "Rp 1.200.000", tipe: "Putri", fasilitas: ["AC", "WiFi", "Kontrak Digital"], tags: ["Mahasiswa", "Putri", "AC", "WiFi", "Ada Kontrak Digital", "Terverifikasi"], rating: "4.8", ulasan: 24, scamScore: 92, badge: "Populer" },
    { id: 2, image: img2, nama: "Kost Putra Garuda", lokasi: "Dago, Bandung", hargaNum: 1500000, harga: "Rp 1.500.000", tipe: "Putra", fasilitas: ["AC", "WiFi", "Kontrak Digital"], tags: ["Pekerja", "Putra", "AC", "WiFi", "Ada Kontrak Digital"], rating: "4.6", ulasan: 18, scamScore: 87, badge: "Baru" },
    { id: 3, image: img3, nama: "Kost Campur Damai", lokasi: "Buah Batu, Bandung", hargaNum: 900000, harga: "Rp 900.000", tipe: "Campur", fasilitas: ["Kipas Angin", "WiFi", "Kontrak Digital"], tags: ["Mahasiswa", "Campur", "WiFi", "Ada Kontrak Digital"], rating: "4.5", ulasan: 31, scamScore: 80, badge: "Premium" },
    { id: 4, image: img4, nama: "Kost Putri Anggrek", lokasi: "Dipatiukur, Bandung", hargaNum: 1350000, harga: "Rp 1.350.000", tipe: "Putri", fasilitas: ["AC", "WiFi", "Kamar Mandi Dalam"], tags: ["Mahasiswa", "Putri", "AC", "WiFi", "Kamar Mandi Dalam", "Terverifikasi", "Scam Score Tinggi"], rating: "4.9", ulasan: 45, scamScore: 95, badge: "Populer" },
    { id: 5, image: img5, nama: "Kost Putra Rajawali", lokasi: "Setiabudi, Bandung", hargaNum: 1100000, harga: "Rp 1.100.000", tipe: "Putra", fasilitas: ["WiFi", "Parkir Luas", "Kamar Mandi Dalam"], tags: ["Mahasiswa", "Putra", "WiFi", "Kamar Mandi Dalam", "Terverifikasi"], rating: "4.4", ulasan: 12, scamScore: 85, badge: "Terverifikasi" },
    { id: 6, image: img6, nama: "Kost Campur Sejahtera", lokasi: "Ciumbuleuit, Bandung", hargaNum: 2000000, harga: "Rp 2.000.000", tipe: "Campur", fasilitas: ["AC", "WiFi", "Kamar Mandi Dalam"], tags: ["Ekspatriat", "Campur", "AC", "WiFi", "Kamar Mandi Dalam", "Ada Escrow", "Scam Score Tinggi"], rating: "4.9", ulasan: 50, scamScore: 98, badge: "Premium" },
    { id: 7, image: img7, nama: "Kost Putri Kenanga", lokasi: "Tubagus Ismail, Bandung", hargaNum: 850000, harga: "Rp 850.000", tipe: "Putri", fasilitas: ["WiFi", "Dapur Bersama"], tags: ["Mahasiswa", "Putri", "WiFi"], rating: "4.3", ulasan: 22, scamScore: 78, badge: "Hemat" },
  ];

  const filteredKostData = initialKostData.filter((kost) => {
    const matchSearch =
      kost.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kost.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    let matchBudget = true;
    if (selectedBudget === 'Di bawah Rp 1 Juta') matchBudget = kost.hargaNum < 1000000;
    if (selectedBudget === 'Rp 1 Juta - Rp 2 Juta') matchBudget = kost.hargaNum >= 1000000 && kost.hargaNum <= 2000000;
    if (selectedBudget === 'Di atas Rp 2 Juta') matchBudget = kost.hargaNum > 2000000;
    let matchTipe = true;
    if (selectedTipe === 'Kost Putra') matchTipe = kost.tipe === 'Putra';
    if (selectedTipe === 'Kost Putri') matchTipe = kost.tipe === 'Putri';
    if (selectedTipe === 'Kost Campur') matchTipe = kost.tipe === 'Campur';
    const matchTags = activeFilters.every(f => kost.tags.includes(f));
    return matchSearch && matchBudget && matchTipe && matchTags;
  });

  // ── Inline styles untuk modal ──
  const S = {
    overlay: {
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.45)',
      backdropFilter: 'blur(6px)',
      zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '16px',
    },
    modal: {
      background: '#fff',
      borderRadius: '20px',
      width: '100%', maxWidth: '480px',
      boxShadow: '0 24px 60px rgba(0,0,0,0.15)',
      overflow: 'hidden',
    },
    modalTop: {
      padding: '28px 28px 20px',
      borderBottom: '1px solid #f0f0f0',
    },
    eyebrow: {
      fontSize: '11px', fontWeight: 600,
      letterSpacing: '.08em', color: '#2d6b55',
      textTransform: 'uppercase', marginBottom: '6px',
    },
    title: {
      fontSize: '20px', fontWeight: 700,
      color: '#111827', marginBottom: '6px', lineHeight: 1.2,
    },
    sub: {
      fontSize: '13px', color: '#6b7280', lineHeight: 1.6,
    },
    body: { padding: '24px 28px' },
    row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' },
    fieldGroup: { marginBottom: '20px' },
    label: {
      display: 'block', fontSize: '11.5px', fontWeight: 600,
      color: '#374151', letterSpacing: '.05em',
      textTransform: 'uppercase', marginBottom: '8px',
    },
    select: {
      width: '100%', padding: '10px 12px',
      border: '1.5px solid #e5e7eb', borderRadius: '10px',
      fontSize: '14px', color: '#111827',
      background: '#fafafa', outline: 'none',
      fontFamily: 'inherit',
      appearance: 'none', WebkitAppearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%236b7280' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
      backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center',
      paddingRight: '32px',
    },
    chipGroup: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    footer: {
      padding: '16px 28px',
      borderTop: '1px solid #f0f0f0',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: '12px',
    },
    btnCancel: {
      background: 'none', border: 'none',
      fontSize: '13.5px', color: '#6b7280',
      cursor: 'pointer', fontFamily: 'inherit', padding: '8px 4px',
    },
    btnApply: {
      background: '#2d6b55', color: '#fff', border: 'none',
      padding: '11px 24px', borderRadius: '50px',
      fontSize: '13.5px', fontWeight: 600,
      cursor: 'pointer', fontFamily: 'inherit',
      letterSpacing: '.01em',
    },
  };

  const chipStyle = (active) => ({
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '7px 14px', borderRadius: '20px',
    border: active ? '1.5px solid #2d6b55' : '1.5px solid #e5e7eb',
    fontSize: '13px',
    color: active ? '#2d6b55' : '#6b7280',
    background: active ? '#edf5f0' : '#fafafa',
    cursor: 'pointer', userSelect: 'none',
    fontWeight: active ? 600 : 400,
    transition: 'all .15s',
  });

  return (
    <>
      <NavbarLoggedIn />

      {/* ── Hero & Search Box ── */}
      <main className="search-hero search-hero--compact">
        <div className="search-hero__inner">
          <h1>Temukan Kost Aman<br />& Terlindungi Hukum</h1>
          <p>Smart matching AI membantu kamu menemukan kost terbaik sesuai kebutuhan</p>
          <div className="search-box">
            <div className="search-field">
              <label>LOKASI / NAMA KOST</label>
              <input
                type="text"
                placeholder="Kota, kecamatan, nama..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="search-field">
              <label>BUDGET</label>
              <select value={selectedBudget} onChange={(e) => setSelectedBudget(e.target.value)}>
                <option>Semua harga</option>
                <option>Di bawah Rp 1 Juta</option>
                <option>Rp 1 Juta - Rp 2 Juta</option>
                <option>Di atas Rp 2 Juta</option>
              </select>
            </div>
            <div className="search-field" style={{ borderRight: 'none' }}>
              <label>TIPE</label>
              <select value={selectedTipe} onChange={(e) => setSelectedTipe(e.target.value)}>
                <option>Semua tipe</option>
                <option>Kost Putra</option>
                <option>Kost Putri</option>
                <option>Kost Campur</option>
              </select>
            </div>
            <button className="btn-search">Cari Kost</button>
          </div>
        </div>
      </main>

      <div className="scroll-blocker"></div>

      {/* ── Filter Strip ── */}
      <div className="filter-strip-wrapper">
        <div className="filter-strip">
          {['Mahasiswa','Pekerja','Ekspatriat','Pasutri'].map(f => (
            <button key={f} className={`filter-tag ${activeFilters.includes(f) ? 'active' : ''}`} onClick={() => toggleFilter(f)}>{f}</button>
          ))}
          <div className="filter-divider"></div>
          {['Terverifikasi','Ada Kontrak Digital','Ada Escrow','Scam Score Tinggi'].map(f => (
            <button key={f} className={`filter-tag ${activeFilters.includes(f) ? 'active' : ''}`} onClick={() => toggleFilter(f)}>{f}</button>
          ))}
          <div className="filter-divider"></div>
          {['Kamar Mandi Dalam','AC','WiFi'].map(f => (
            <button key={f} className={`filter-tag ${activeFilters.includes(f) ? 'active' : ''}`} onClick={() => toggleFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* ── Search Results Layout ── */}
      <section className="search-results-section bg-off-white">
        <div className="search-layout">

          <div
            className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`}
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>

          <aside className={`sidebar-filter ${isMobileFilterOpen ? 'open' : ''}`}>
            <div className="mobile-filter-header">
              <h3 style={{ margin: 0, fontSize: '18px', color: '#111827' }}>Filter Pencarian</h3>
              <button className="btn-close-filter" onClick={() => setIsMobileFilterOpen(false)} aria-label="Tutup filter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Smart Matching Card */}
            <div className="ai-matching-card">
              <h4>Smart Matching</h4>
              <p>Aktifkan rekomendasi AI untuk kost yang paling sesuai dengan profilmu</p>
              <button className="btn-ai" onClick={() => setIsAiModalOpen(true)}>Aktifkan</button>
            </div>

            <div className="filter-group">
              <h5 className="filter-title">TARGET PENGHUNI</h5>
              {['Mahasiswa','Pekerja','Ekspatriat','Pasutri'].map(f => (
                <label key={f} className="checkbox-item">
                  <input type="checkbox" checked={activeFilters.includes(f)} onChange={() => toggleFilter(f)} />
                  <span>{f}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h5 className="filter-title">FITUR PERLINDUNGAN</h5>
              {[['Terverifikasi','Listing Terverifikasi'],['Ada Kontrak Digital','Kontrak Digital']].map(([val, label]) => (
                <label key={val} className="checkbox-item">
                  <input type="checkbox" checked={activeFilters.includes(val)} onChange={() => toggleFilter(val)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            <div className="filter-group">
              <h5 className="filter-title">FASILITAS KAMAR</h5>
              {[['AC','AC'],['WiFi','WiFi'],['Kamar Mandi Dalam','Kamar mandi dalam']].map(([val, label]) => (
                <label key={val} className="checkbox-item">
                  <input type="checkbox" checked={activeFilters.includes(val)} onChange={() => toggleFilter(val)} />
                  <span>{label}</span>
                </label>
              ))}
            </div>

            {activeFilters.length > 0 && (
              <button className="btn-terapkan" onClick={() => setActiveFilters([])} style={{ background: '#ef4444' }}>Reset Filter</button>
            )}
            <div className="mobile-filter-apply">
              <button className="btn-terapkan" onClick={() => setIsMobileFilterOpen(false)}>Tampilkan Hasil</button>
            </div>
          </aside>

          {/* ── Kost Cards ── */}
          <div className="main-results">
            <div className="results-header">
              <span>Menampilkan <strong style={{ color: '#111827' }}>{filteredKostData.length} kost</strong> yang sesuai kriteria</span>
              <div className="results-header__actions">
                <button className="btn-mobile-filter" onClick={() => setIsMobileFilterOpen(true)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Filter {activeFilters.length > 0 && `(${activeFilters.length})`}
                </button>
                <select className="sort-dropdown">
                  <option>Relevansi</option>
                  <option>Harga Terendah</option>
                  <option>Harga Tertinggi</option>
                  <option>Rating Terbaik</option>
                </select>
              </div>
            </div>

            <div className="kost-grid">
              {filteredKostData.length > 0 ? filteredKostData.map(kost => (
                <div className="kost-card" key={kost.id} onClick={() => navigate(`/detail/${kost.id}`)} style={{ cursor: 'pointer' }}>
                  <div className="kost-card__image-area" style={{ padding: 0, overflow: 'hidden' }}>
                    <img src={kost.image} alt={kost.nama} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <span className={`badge badge-${kost.badge.toLowerCase()}`}>{kost.badge}</span>
                    <button className="btn-favorite" onClick={(e) => e.stopPropagation()}>
                      <img src={iconSimpan} alt="Simpan" style={{ width: '14px' }} />
                    </button>
                  </div>
                  <div className="kost-card__content">
                    <h3 className="kost-name">{kost.nama}</h3>
                    <p className="kost-location">
                      <img src={iconLokasi} alt="Lokasi" style={{ width: '12px', verticalAlign: 'middle', marginRight: '4px' }} />
                      {kost.lokasi}
                    </p>
                    <div className="kost-price">
                      <strong style={{ color: '#2d6b55', fontSize: '18px' }}>{kost.harga}</strong>
                      <span>/bulan</span>
                    </div>
                    <div className="kost-facilities">
                      <span className="fac-item">
                        <img src={iconHome} alt="Tipe" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                        {kost.tipe}
                      </span>
                      {kost.fasilitas.map((f, i) => {
                        const iconMap = { AC: iconAc, WiFi: iconWifi, 'Kamar Mandi Dalam': iconKamarMandi };
                        return (
                          <span key={i} className="fac-item">
                            {iconMap[f] && <img src={iconMap[f]} alt={f} style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />}
                            {f}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <div className="kost-card__footer">
                    <div className="kost-rating">
                      <img src={iconReview} alt="Rating" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                      {kost.rating} <span>({kost.ulasan} ulasan)</span>
                    </div>
                    <div className="kost-scamscore">
                      <img src={iconEscrow} alt="Aman" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                      <strong style={{ fontWeight: 700 }}>{kost.scamScore}</strong>/100
                    </div>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: '#6b7280' }}>
                  <h3>Yah, kost yang kamu cari belum ketemu</h3>
                  <p>Coba kurangi filter atau ganti kata kunci pencarianmu.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ── MODAL SMART MATCHING ── */}
      {isAiModalOpen && (
        <div style={S.overlay} onClick={() => setIsAiModalOpen(false)}>
          <div style={S.modal} onClick={(e) => e.stopPropagation()}>

            {/* Header */}
            <div style={S.modalTop}>
              <div style={S.eyebrow}>Smart Matching</div>
              <div style={S.title}>Temukan kost yang tepat</div>
              <p style={S.sub}>Isi profil singkat di bawah, sistem akan menyaring kost yang paling sesuai untukmu.</p>
            </div>

            {/* Body */}
            <div style={S.body}>

              {/* Profil + Budget — 2 kolom */}
              <div style={S.row2}>
                <div>
                  <label style={S.label}>Profil penghuni</label>
                  <select
                    style={S.select}
                    value={aiForm.target}
                    onChange={(e) => setAiForm({ ...aiForm, target: e.target.value })}
                  >
                    <option value="">Pilih profil</option>
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Pekerja">Pekerja</option>
                    <option value="Ekspatriat">Ekspatriat</option>
                    <option value="Pasutri">Pasutri</option>
                  </select>
                </div>
                <div>
                  <label style={S.label}>Budget maksimal</label>
                  <select
                    style={S.select}
                    value={aiForm.budget}
                    onChange={(e) => setAiForm({ ...aiForm, budget: e.target.value })}
                  >
                    <option value="">Semua budget</option>
                    <option value="Di bawah Rp 1 Juta">Di bawah Rp 1 Juta</option>
                    <option value="Rp 1 Juta - Rp 2 Juta">Rp 1 – 2 Juta</option>
                    <option value="Di atas Rp 2 Juta">Di atas Rp 2 Juta</option>
                  </select>
                </div>
              </div>

              {/* Tipe Kamar — chips */}
              <div style={S.fieldGroup}>
                <label style={S.label}>Tipe kamar</label>
                <div style={S.chipGroup}>
                  {TIPE_OPTIONS.map(t => (
                    <span
                      key={t}
                      style={chipStyle(aiForm.tipe.includes(t))}
                      onClick={() => toggleAiChip('tipe', t)}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Fasilitas — chips */}
              <div style={{ ...S.fieldGroup, marginBottom: 0 }}>
                <label style={S.label}>Fasilitas yang diinginkan</label>
                <div style={S.chipGroup}>
                  {FASILITAS_OPTIONS.map(f => (
                    <span
                      key={f}
                      style={chipStyle(aiForm.fasilitas.includes(f))}
                      onClick={() => toggleAiChip('fasilitas', f)}
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={S.footer}>
              <button style={S.btnCancel} onClick={() => setIsAiModalOpen(false)}>Batal</button>
              <button style={S.btnApply} onClick={handleAiMatch}>Terapkan filter</button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}