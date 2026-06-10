import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLoggedIn from '../components/NavbarLoggedIn'; 
import '../css/style.css'; 

// Import gambar kost
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

export default function SearchKost() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('Semua harga');
  const [selectedTipe, setSelectedTipe] = useState('Semua tipe');
  const [activeFilters, setActiveFilters] = useState([]);
  
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // ── STATE UNTUK SMART MATCHING AI CHAT ──────────────────────────
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      text: 'Halo! Saya KostKu AI Assistant 👋\n\nCeritakan kebutuhan kostmu — lokasi, budget, tipe penghuni, atau fasilitas — dan saya akan langsung mencarikan rekomendasi terbaik dari database kami secara real-time! 😊',
      recommendations: []
    }
  ]);

  const messagesEndRef = useRef(null);

  // Auto-scroll ke pesan paling baru
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, isLoading]);

  useEffect(() => {
    if (isMobileFilterOpen || isAiModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileFilterOpen, isAiModalOpen]);

  const toggleFilter = (filterName) => {
    if (activeFilters.includes(filterName)) {
      setActiveFilters(activeFilters.filter((f) => f !== filterName));
    } else {
      setActiveFilters([...activeFilters, filterName]);
    }
  };

  const initialKostData = [
    { id: 1, image: img1, nama: "Kost Putri Melati", lokasi: "Cihampelas, Bandung", hargaNum: 1200000, harga: "Rp 1.200.000", tipe: "Putri", fasilitas: ["AC", "WiFi", "Kontrak Digital"], tags: ["Mahasiswa", "Putri", "AC", "WiFi", "Ada Kontrak Digital", "Terverifikasi"], rating: "4.8", ulasan: 24, scamScore: 92, badge: "Populer" },
    { id: 2, image: img2, nama: "Kost Putra Garuda", lokasi: "Dago, Bandung", hargaNum: 1500000, harga: "Rp 1.500.000", tipe: "Putra", fasilitas: ["AC", "WiFi", "Kontrak Digital"], tags: ["Pekerja", "Putra", "AC", "WiFi", "Ada Kontrak Digital"], rating: "4.6", ulasan: 18, scamScore: 87, badge: "Baru" },
    { id: 3, image: img3, nama: "Kost Campur Damai", lokasi: "Buah Batu, Bandung", hargaNum: 900000, harga: "Rp 900.000", tipe: "Campur", fasilitas: ["Kipas Angin", "WiFi", "Kontrak Digital"], tags: ["Mahasiswa", "Campur", "WiFi", "Ada Kontrak Digital"], rating: "4.5", ulasan: 31, scamScore: 80, badge: "Premium" },
    { id: 4, image: img4, nama: "Kost Putri Anggrek", lokasi: "Dipatiukur, Bandung", hargaNum: 1350000, harga: "Rp 1.350.000", tipe: "Putri", fasilitas: ["AC", "WiFi", "Kamar Mandi Dalam"], tags: ["Mahasiswa", "Putri", "AC", "WiFi", "Kamar Mandi Dalam", "Terverifikasi", "Scam Score Tinggi"], rating: "4.9", ulasan: 45, scamScore: 95, badge: "Populer" },
    { id: 5, image: img5, nama: "Kost Putra Rajawali", lokasi: "Setiabudi, Bandung", hargaNum: 1100000, harga: "Rp 1.100.000", tipe: "Putra", fasilitas: ["WiFi", "Parkir Luas", "Kamar Mandi Dalam"], tags: ["Mahasiswa", "Putra", "WiFi", "Kamar Mandi Dalam", "Terverifikasi"], rating: "4.4", ulasan: 12, scamScore: 85, badge: "Terverifikasi" },
    { id: 6, image: img6, nama: "Kost Campur Sejahtera", lokasi: "Ciumbuleuit, Bandung", hargaNum: 2000000, harga: "Rp 2.000.000", tipe: "Campur", fasilitas: ["AC", "WiFi", "Kamar Mandi Dalam"], tags: ["Ekspatriat", "Campur", "AC", "WiFi", "Kamar Mandi Dalam", "Ada Escrow", "Scam Score Tinggi"], rating: "4.9", ulasan: 50, scamScore: 98, badge: "Premium" },
    { id: 7, image: img7, nama: "Kost Putri Kenanga", lokasi: "Tubagus Ismail, Bandung", hargaNum: 850000, harga: "Rp 850.000", tipe: "Putri", fasilitas: ["WiFi", "Dapur Bersama"], tags: ["Mahasiswa", "Putri", "WiFi"], rating: "4.3", ulasan: 22, scamScore: 78, badge: "Hemat" }
  ];

  // ── LOGIKAI INTEGRASI CHAT GEMINI DENGAN ROTASI KEY ──────────────
  const handleSendChatMessage = async (presetText = '') => {
    const textToSend = presetText || chatInput.trim();
    if (!textToSend || isLoading) return;

    setChatInput('');
    setIsLoading(true);

    // Ambil history chat sebelumnya dalam format API Gemini
    const currentHistory = [...chatHistory, { role: 'user', text: textToSend }];
    setChatHistory(currentHistory);

    const systemPrompt = `Kamu adalah KostKu AI Assistant — asisten khusus untuk platform pencarian kost di Indonesia.

ATURAN WAJIB:
- HANYA jawab pertanyaan seputar kost, hunian, fasilitas, harga kost, tips memilih kost, dan kehidupan di kost.
- Jika pertanyaan di luar topik kost, tolak dengan sopan dan arahkan kembali.
- Gunakan bahasa Indonesia yang ramah, kasual tapi tetap informatif.
- JANGAN gunakan tanda bintang (**), markdown, atau simbol formatting apapun dalam teks biasa. Tampilkan teks polos yang bersih agar mudah dibaca oleh user.

Database kost terupdate yang tersedia pada sistem saat ini:
${JSON.stringify(initialKostData.map(k => ({ id: k.id, nama: k.nama, lokasi: k.lokasi, harga: k.hargaNum, tipe: k.tipe, fasilitas: k.fasilitas, rating: k.rating })), null, 2)}

Instruksi saat merekomendasikan kost:
1. Analisis kebutuhan user dari pesan mereka: lokasi, budget, tipe, fasilitas.
2. Rekomendasikan 1-3 kost yang paling relevan dari database di atas.
3. Berikan penjelasan singkat berparagraf polos (tanpa bintan-bintang markdown) kenapa kost tersebut cocok.
4. Tentukan nilai persentase kecocokan (%) untuk indikator kecocokan.

WAJIB: Di akhir respons text kamu, SELALU sertakan lampiran data JSON rekomendasi dalam tag khusus seperti ini tanpa merusak teks:
[REKOMENDASI_JSON]
[{"id": 1, "match": 95}, {"id": 2, "match": 87}]
[/REKOMENDASI_JSON]`;

    const geminiContents = currentHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const GEMINI_KEYS = [
      import.meta.env.VITE_GEMINI_KEY_1,
      import.meta.env.VITE_GEMINI_KEY_2,
      import.meta.env.VITE_GEMINI_KEY_3,
      import.meta.env.VITE_GEMINI_KEY_4,
      import.meta.env.VITE_GEMINI_KEY_5,
      import.meta.env.VITE_GEMINI_KEY_6,
    ].filter(Boolean);

    const requestBody = {
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: geminiContents,
      generationConfig: { maxOutputTokens: 2000, temperature: 0.7 }
    };

    let responseData = null;

    // Loop rotasi kunci API jika terkena batasan kuota / error
    for (let i = 0; i < GEMINI_KEYS.length; i++) {
      const key = GEMINI_KEYS[i];
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        const json = await res.json();

        if (json.error) {
          const { code, status } = json.error;
          if (code === 429 || code === 503 || status === 'RESOURCE_EXHAUSTED') {
            continue; // Coba key berikutnya jika limit tercapai
          }
          responseData = json;
          break;
        }

        responseData = json;
        break;
      } catch (err) {
        continue;
      }
    }

    setIsLoading(false);

    if (!responseData || responseData.error) {
      setChatHistory([...currentHistory, { role: 'assistant', text: 'Maaf, sistem kecerdasan buatan kami sedang padat antrean. Silakan coba kirim pesan kembali beberapa saat lagi ya!', recommendations: [] }]);
      return;
    }

    let rawText = responseData.candidates?.[0]?.content?.parts?.[0]?.text || 'Tidak ada tanggapan dari AI.';
    
    // Bersihkan sisa-sisa tanda bintang markdown jika AI tidak sengaja membuatnya
    rawText = rawText.replace(/\*\*/g, '');

    let recommendations = [];
    const jsonMatch = rawText.match(/\[REKOMENDASI_JSON\]([\s\S]*?)\[\/REKOMENDASI_JSON\]/);
    if (jsonMatch) {
      try {
        recommendations = JSON.parse(jsonMatch[1].trim());
      } catch (e) {
        console.error("Gagal memproses JSON Rekomendasi");
      }
      rawText = rawText.replace(/\[REKOMENDASI_JSON\][\s\S]*?\[\/REKOMENDASI_JSON\]/, '').trim();
    }

    setChatHistory([...currentHistory, { role: 'assistant', text: rawText, recommendations }]);
  };

  const filteredKostData = initialKostData.filter((kost) => {
    const matchSearch = kost.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        kost.lokasi.toLowerCase().includes(searchTerm.toLowerCase());

    let matchBudget = true;
    if (selectedBudget === 'Di bawah Rp 1 Juta') matchBudget = kost.hargaNum < 1000000;
    if (selectedBudget === 'Rp 1 Juta - Rp 2 Juta') matchBudget = kost.hargaNum >= 1000000 && kost.hargaNum <= 2000000;
    if (selectedBudget === 'Di atas Rp 2 Juta') matchBudget = kost.hargaNum > 2000000;

    let matchTipe = true;
    if (selectedTipe === 'Kost Putra') matchTipe = kost.tipe === 'Putra';
    if (selectedTipe === 'Kost Putri') matchTipe = kost.tipe === 'Putri';
    if (selectedTipe === 'Kost Campur') matchTipe = kost.tipe === 'Campur';

    const matchTags = activeFilters.every((filter) => kost.tags.includes(filter));

    return matchSearch && matchBudget && matchTipe && matchTags;
  });

  return (
    <>
      <NavbarLoggedIn />
      
      <main className="search-hero search-hero--compact">
        <div className="search-hero__inner">
          <h1>Temukan Kost Aman<br/>& Terlindungi Hukum</h1>
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

      <div className="filter-strip-wrapper">
        <div className="filter-strip">
          <button className={`filter-tag ${activeFilters.includes('Mahasiswa') ? 'active' : ''}`} onClick={() => toggleFilter('Mahasiswa')}>Mahasiswa</button>
          <button className={`filter-tag ${activeFilters.includes('Pekerja') ? 'active' : ''}`} onClick={() => toggleFilter('Pekerja')}>Pekerja</button>
          <button className={`filter-tag ${activeFilters.includes('Ekspatriat') ? 'active' : ''}`} onClick={() => toggleFilter('Ekspatriat')}>Ekspatriat</button>
          <button className={`filter-tag ${activeFilters.includes('Pasutri') ? 'active' : ''}`} onClick={() => toggleFilter('Pasutri')}>Pasutri</button>
          
          <div className="filter-divider"></div>
          
          <button className={`filter-tag ${activeFilters.includes('Terverifikasi') ? 'active' : ''}`} onClick={() => toggleFilter('Terverifikasi')}>Terverifikasi</button>
          <button className={`filter-tag ${activeFilters.includes('Ada Kontrak Digital') ? 'active' : ''}`} onClick={() => toggleFilter('Ada Kontrak Digital')}>Ada Kontrak Digital</button>
          <button className={`filter-tag ${activeFilters.includes('Ada Escrow') ? 'active' : ''}`} onClick={() => toggleFilter('Ada Escrow')}>Ada Escrow</button>
          <button className={`filter-tag ${activeFilters.includes('Scam Score Tinggi') ? 'active' : ''}`} onClick={() => toggleFilter('Scam Score Tinggi')}>Scam Score Tinggi</button>
          
          <div className="filter-divider"></div>

          <button className={`filter-tag ${activeFilters.includes('Kamar Mandi Dalam') ? 'active' : ''}`} onClick={() => toggleFilter('Kamar Mandi Dalam')}>Kamar Mandi Dalam</button>
          <button className={`filter-tag ${activeFilters.includes('AC') ? 'active' : ''}`} onClick={() => toggleFilter('AC')}>AC</button>
          <button className={`filter-tag ${activeFilters.includes('WiFi') ? 'active' : ''}`} onClick={() => toggleFilter('WiFi')}>WiFi</button>
        </div>
      </div>

      <section className="search-results-section bg-off-white">
        <div className="search-layout">
          
          <div 
            className={`mobile-filter-overlay ${isMobileFilterOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileFilterOpen(false)}
          ></div>

          <aside className={`sidebar-filter ${isMobileFilterOpen ? 'open' : ''}`}>
            
            <div className="mobile-filter-header">
              <h3 style={{ margin: 0, fontSize: '18px', color: '#111827' }}>Filter Pencarian</h3>
              <button 
                className="btn-close-filter" 
                onClick={() => setIsMobileFilterOpen(false)}
                aria-label="Tutup filter"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="ai-matching-card">
              <h4>Smart Matching</h4>
              <p>Mulai sesi konsultasi chat AI untuk temukan rekomendasi kost impianmu</p>
              <button className="btn-ai" onClick={() => setIsAiModalOpen(true)}>Hubungi AI</button>
            </div>

            <div className="filter-group">
              <h5 className="filter-title">TARGET PENGHUNI</h5>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('Mahasiswa')} onChange={() => toggleFilter('Mahasiswa')} /> <span>Mahasiswa</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('Pekerja')} onChange={() => toggleFilter('Pekerja')} /> <span>Pekerja</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('Ekspatriat')} onChange={() => toggleFilter('Ekspatriat')} /> <span>Ekspatriat</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('Pasutri')} onChange={() => toggleFilter('Pasutri')} /> <span>Pasutri</span>
              </label>
            </div>

            <div className="filter-group">
              <h5 className="filter-title">FITUR PERLINDUNGAN</h5>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('Terverifikasi')} onChange={() => toggleFilter('Terverifikasi')} /> <span>Listing Terverifikasi</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('Ada Kontrak Digital')} onChange={() => toggleFilter('Ada Kontrak Digital')} /> <span>Kontrak Digital</span>
              </label>
            </div>

            <div className="filter-group">
              <h5 className="filter-title">FASILITAS KAMAR</h5>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('AC')} onChange={() => toggleFilter('AC')} /> <span>AC</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('WiFi')} onChange={() => toggleFilter('WiFi')} /> <span>WiFi</span>
              </label>
              <label className="checkbox-item">
                <input type="checkbox" checked={activeFilters.includes('Kamar Mandi Dalam')} onChange={() => toggleFilter('Kamar Mandi Dalam')} /> <span>Kamar mandi dalam</span>
              </label>
            </div>
            
            {activeFilters.length > 0 && (
              <button className="btn-terapkan" onClick={() => setActiveFilters([])} style={{background: '#ef4444'}}>Reset Filter</button>
            )}

            <div className="mobile-filter-apply">
              <button className="btn-terapkan" onClick={() => setIsMobileFilterOpen(false)}>
                Tampilkan Hasil
              </button>
            </div>
          </aside>

          <div className="main-results">
            <div className="results-header">
              <span>Menampilkan <strong style={{color: '#111827'}}>{filteredKostData.length} kost</strong> yang sesuai kriteria</span>
              
              <div className="results-header__actions">
                <button 
                  className="btn-mobile-filter" 
                  onClick={() => setIsMobileFilterOpen(true)}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20M7 12H17M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

            {/* Grid Hasil Pencarian Reguler */}
            <div className="kost-grid">
              {filteredKostData.length > 0 ? (
                filteredKostData.map(kost => (
                  <div 
                    className="kost-card" 
                    key={kost.id} 
                    onClick={() => navigate(`/detail/${kost.id}`)} 
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="kost-card__image-area" style={{ padding: 0, overflow: 'hidden' }}>
                      <img 
                        src={kost.image} 
                        alt={kost.nama} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                      <span className={`badge badge-${kost.badge.toLowerCase()}`}>
                        {kost.badge}
                      </span>
                      <button 
                        className="btn-favorite" 
                        onClick={(e) => e.stopPropagation()} 
                      >
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
                        <strong style={{color: '#2d6b55', fontSize: '18px'}}>{kost.harga}</strong><span>/bulan</span>
                      </div>
                      
                      <div className="kost-facilities">
                        <span className="fac-item">
                          <img src={iconHome} alt="Tipe" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                          {kost.tipe}
                        </span>
                        {kost.fasilitas.map((f, i) => {
                          let iconSrc = null;
                          if (f === 'AC') iconSrc = iconAc;
                          if (f === 'WiFi') iconSrc = iconWifi;
                          if (f === 'Kamar Mandi Dalam') iconSrc = iconKamarMandi;
                          
                          return (
                            <span key={i} className="fac-item">
                              {iconSrc && <img src={iconSrc} alt={f} style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />}
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
                ))
              ) : (
                <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1 / -1', color: '#6b7280' }}>
                  <h3>Yah, kost yang kamu cari belum ketemu</h3>
                  <p>Coba kurangi filter atau ganti kata kunci pencarianmu.</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </section>

      {/* ── MODAL SMART MATCHING AI INTERAKTIF ────────────────────────── */}
      {isAiModalOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(13, 13, 15, 0.75)', 
          zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', padding: '16px'
        }}>
          <div style={{
            background: '#18181c', borderRadius: '24px', width: '100%', maxWidth: '640px', 
            height: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
          }}>
            
            {/* Header Chat */}
            <div style={{
              padding: '16px 24px', background: '#22222a', borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>🤖</span>
                <div>
                  <h3 style={{ margin: 0, color: '#f0ede8', fontSize: '16px', fontWeight: 600 }}>KostKu AI Assistant</h3>
                  <small style={{ color: '#3ecf8e', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '6px', height: '6px', background: '#3ecf8e', borderRadius: '50%' }}></span> ONLINE · Gemini 3.5 Flash
                  </small>
                </div>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                style={{
                  marginLeft: 'auto', background: 'transparent', border: 'none', color: 'rgba(240,237,232,0.5)',
                  fontSize: '20px', cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Area Pesan Chat */}
            <div style={{
              flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column',
              gap: '16px', background: '#0d0d0f'
            }}>
              {chatHistory.map((msg, index) => (
                <div key={index} style={{
                  display: 'flex', gap: '12px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-start'
                }}>
                  {msg.role === 'assistant' && <div style={{ fontSize: '18px', paddingTop: '4px' }}>🤖</div>}
                  <div style={{ maxWidth: '80%' }}>
                    {/* Bubble Teks */}
                    <div style={{
                      padding: '12px 16px', borderRadius: '16px', fontSize: '14px', lineHeight: '1.5',
                      whiteSpace: 'pre-line',
                      background: msg.role === 'user' ? '#2a2420' : '#22222a',
                      color: '#f0ede8',
                      border: msg.role === 'user' ? '1px solid rgba(212,168,84,0.25)' : '1px solid rgba(255,255,255,0.08)',
                      borderTopLeftRadius: msg.role === 'assistant' ? '4px' : '16px',
                      borderTopRightRadius: msg.role === 'user' ? '4px' : '16px',
                    }}>
                      {msg.text}
                    </div>

                    {/* Render Kartu Rekomendasi di Dalam Chat */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                        {msg.recommendations.map((rec) => {
                          const kost = initialKostData.find(k => k.id === rec.id);
                          if (!kost) return null;
                          return (
                            <div 
                              key={rec.id}
                              onClick={() => {
                                setIsAiModalOpen(false);
                                navigate(`/detail/${kost.id}`);
                              }}
                              style={{
                                display: 'flex', background: '#18181c', border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative',
                                transition: 'all 0.2s'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.borderColor = '#d4a854'}
                              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                            >
                              <img src={kost.image} alt={kost.nama} style={{ width: '90px', height: '90px', objectFit: 'cover' }} />
                              <div style={{ padding: '10px 14px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '4px' }}>
                                  <span style={{
                                    fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px',
                                    background: kost.tipe === 'Putri' ? 'rgba(244,114,182,0.15)' : kost.tipe === 'Putra' ? 'rgba(96,165,250,0.15)' : 'rgba(62,207,142,0.15)',
                                    color: kost.tipe === 'Putri' ? '#f472b6' : kost.tipe === 'Putra' ? '#60a5fa' : '#3ecf8e'
                                  }}>{kost.tipe}</span>
                                  <span style={{ fontSize: '10px', color: '#3ecf8e', background: 'rgba(62,207,142,0.1)', padding: '2px 6px', borderRadius: '4px' }}>✓ {rec.match}% cocok</span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#f0ede8' }}>{kost.nama}</div>
                                <div style={{ fontSize: '11px', color: 'rgba(240,237,232,0.5)' }}>📍 {kost.lokasi}</div>
                                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#d4a854', marginTop: '2px' }}>{kost.harga}<span style={{ fontSize: '10px', color: 'rgba(240,237,232,0.25)' }}> /bulan</span></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {msg.role === 'user' && <div style={{ fontSize: '18px', paddingTop: '4px' }}>👤</div>}
                </div>
              ))}

              {isLoading && (
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start' }}>
                  <div>🤖</div>
                  <div style={{ background: '#22222a', padding: '12px 18px', borderRadius: '16px', borderTopLeftRadius: '4px' }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center', height: '20px' }}>
                      <span className="dot-pulse" style={{ width: '6px', height: '6px', background: '#d4a854', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out' }}></span>
                      <span className="dot-pulse" style={{ width: '6px', height: '6px', background: '#d4a854', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.2s' }}></span>
                      <span className="dot-pulse" style={{ width: '6px', height: '6px', background: '#d4a854', borderRadius: '50%', animation: 'bounce 1.4s infinite ease-in-out', animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts Chip */}
            <div style={{
              display: 'flex', gap: '8px', padding: '10px 20px', background: '#18181c', 
              overflowX: 'auto', borderTop: '1px solid rgba(255,255,255,0.08)'
            }}>
              <button onClick={() => handleSendChatMessage('Cari kost dekat Dago Bandung budget maksimal 1.5 juta')} style={{ background: '#22222a', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,237,232,0.7)', borderRadius: '20px', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>🎓 Dekat Dago</button>
              <button onClick={() => handleSendChatMessage('Kost putri Cihampelas yang aman')} style={{ background: '#22222a', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,237,232,0.7)', borderRadius: '20px', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>👩 Khusus Putri</button>
              <button onClick={() => handleSendChatMessage('Kost premium budget 2 juta dengan AC dan WiFi')} style={{ background: '#22222a', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,237,232,0.7)', borderRadius: '20px', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>💎 Fasilitas Lengkap</button>
              <button onClick={() => handleSendChatMessage('Ada kost murah di bawah 1 juta?')} style={{ background: '#22222a', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(240,237,232,0.7)', borderRadius: '20px', padding: '6px 12px', fontSize: '11px', cursor: 'pointer', whiteSpace: 'nowrap' }}>💰 Budget Hemat</button>
            </div>

            {/* Input Bar */}
            <div style={{
              padding: '16px 20px', background: '#22222a', borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', gap: '12px', alignItems: 'center'
            }}>
              <input 
                type="text"
                placeholder="Tulis pesan ke KostKu AI (Contoh: Kost putri murah ada AC)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                style={{
                  flex: 1, background: '#0d0d0f', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '12px', padding: '12px 16px', color: '#f0ede8', fontSize: '13px', outline: 'none'
                }}
              />
              <button 
                onClick={() => handleSendChatMessage()}
                disabled={isLoading}
                style={{
                  background: 'linear-gradient(135deg, #b8860b, #d4a854)', border: 'none',
                  borderRadius: '12px', padding: '12px 20px', color: '#0d0d0f', fontWeight: 'bold',
                  fontSize: '13px', cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                Kirim
              </button>
            </div>

          </div>
        </div>
      )}

    </>
  );
}