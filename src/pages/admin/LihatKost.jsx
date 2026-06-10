import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 1. Perbaiki path CSS (naik 2 tingkat)
import '../../css/detail.css';

// 2. Perbaiki path gambar kost 1 lengkap (naik 2 tingkat)
import imgUtama from '../../assets/img/kost/kost-1/kamar-kost-1.jpeg';
import imgKamar1 from '../../assets/img/kost/kost-1/kamar-1.jpeg';
import imgKamar2 from '../../assets/img/kost/kost-1/kamar-2.jpeg';
import imgKamar3 from '../../assets/img/kost/kost-1/kamar-3.jpeg';
import imgMandi1 from '../../assets/img/kost/kost-1/kamar-mandi-1.jpeg';
import imgMandi2 from '../../assets/img/kost/kost-1/kamar-mandi-2.jpeg';
import imgMandi3 from '../../assets/img/kost/kost-1/kamar-mandi-3.jpeg';
import imgWastafel from '../../assets/img/kost/kost-1/wastafel.jpeg';

// 3. Perbaiki path icons details (naik 2 tingkat)
import iconAc from '../../assets/icons/icons-details/ac.png';
import iconAngkot from '../../assets/icons/icons-details/angkot.png';
import iconAtm from '../../assets/icons/icons-details/atm.png';
import iconAturanTamu from '../../assets/icons/icons-details/aturan-tamu.png';
import iconBack from '../../assets/icons/icons-details/back.png';
import iconBackup from '../../assets/icons/icons-details/bakcup.png';
import iconCctv from '../../assets/icons/icons-details/cctv-camera.png';
import iconClinic from '../../assets/icons/icons-details/clinic.png';
import iconCoins from '../../assets/icons/icons-details/coins.png';
import iconDapur from '../../assets/icons/icons-details/dapur.png';
import iconEscrow from '../../assets/icons/icons-details/escrow.png';
import iconJamMalam from '../../assets/icons/icons-details/jam-malam.png';
import iconKamarMandi from '../../assets/icons/icons-details/kamar-mandi.png';
import iconKamarTidur from '../../assets/icons/icons-details/kamar-tidur.png';
import iconLatePayment from '../../assets/icons/icons-details/late-payment.png';
import iconLaundry from '../../assets/icons/icons-details/laundry-machine.png';
import iconLemari from '../../assets/icons/icons-details/lemari-baju.png';
import iconLokasi from '../../assets/icons/icons-details/lokasi.png';
import iconMedicine from '../../assets/icons/icons-details/medicine.png';
import iconMinimarket from '../../assets/icons/icons-details/minimarket.png';
import iconMosque from '../../assets/icons/icons-details/mosque.png';
import iconNoPets from '../../assets/icons/icons-details/no-pets_1027249.png';
import iconNoSmoke from '../../assets/icons/icons-details/no-smoke.png';
import iconNotification from '../../assets/icons/icons-details/notification.png';
import iconPaymentMethod from '../../assets/icons/icons-details/payment-method.png';
import iconRestaurant from '../../assets/icons/icons-details/restaurant.png';
import iconReview from '../../assets/icons/icons-details/review.png';
import iconRuangTamu from '../../assets/icons/icons-details/ruang-tamu.png';
import iconSchool from '../../assets/icons/icons-details/school.png';
import iconShare from '../../assets/icons/icons-details/share.png';
import iconSimpan from '../../assets/icons/icons-details/simpan.png';
import iconTable from '../../assets/icons/icons-details/table.png';
import iconTempatCuci from '../../assets/icons/icons-details/tempat-cuci-baju.png';
import iconTv from '../../assets/icons/icons-details/tv.png';
import iconVerifikasi from '../../assets/icons/icons-details/verifikasi.png';
import iconWhatsapp from '../../assets/icons/icons-details/whatsappp.png';
import iconWifi from '../../assets/icons/icons-details/wifi.png';

// ============================================================
// KOMPONEN DRAG-TO-ROTATE MULTI-PHOTO VIEWER
// ============================================================
function PannellumViewer({ images, isActive }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const autoRotateRef = useRef(null);
  const DRAG_THRESHOLD = 60;

  const total = images.length;

  useEffect(() => {
    if (!isActive) return;
    autoRotateRef.current = setInterval(() => {
      if (!isDragging) {
        goTo((prev) => (prev + 1) % total);
      }
    }, 3500);
    return () => clearInterval(autoRotateRef.current);
  }, [isActive, isDragging, total]);

  const goTo = (idxOrFn) => {
    setIsTransitioning(true);
    setCurrentIdx(idxOrFn);
    setOffset(0);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleDragStart = (clientX) => {
    clearInterval(autoRotateRef.current);
    setDragStartX(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || dragStartX === null) return;
    setOffset(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (offset < -DRAG_THRESHOLD) {
      goTo((currentIdx + 1) % total);
    } else if (offset > DRAG_THRESHOLD) {
      goTo((currentIdx - 1 + total) % total);
    } else {
      setOffset(0);
    }
    setDragStartX(null);
  };

  const onMouseDown = (e) => handleDragStart(e.clientX);
  const onMouseMove = (e) => { if (isDragging) handleDragMove(e.clientX); };
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };

  const onTouchStart = (e) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();

  if (!images || images.length === 0) {
    return (
      <div style={{
        width: '100%', height: '420px', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#1a1a2e', borderRadius: '12px', color: '#9ca3af'
      }}>
        Foto tidak tersedia
      </div>
    );
  }

  const prevIdx = (currentIdx - 1 + total) % total;
  const nextIdx = (currentIdx + 1) % total;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '420px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#111',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {[
        { src: images[prevIdx],    tx: `calc(-100% + ${offset}px)` },
        { src: images[currentIdx], tx: `${offset}px`               },
        { src: images[nextIdx],    tx: `calc(100% + ${offset}px)`  },
      ].map(({ src, tx }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            transform: `translateX(${tx})`,
            transition: isTransitioning ? 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)' : 'none',
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <img
            src={src}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-10%', left: '-10%',
              width: '120%', height: '120%',
              objectFit: 'cover',
              filter: 'blur(18px) brightness(0.55) saturate(1.2)',
              transform: 'scale(1.05)',
              pointerEvents: 'none',
            }}
          />
          <img
            src={src}
            alt={`Sudut ${i + 1}`}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'contain',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </div>
      ))}

      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.3) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
        borderRadius: '12px',
        zIndex: 2,
      }} />

      <button
        onClick={(e) => { e.stopPropagation(); goTo((currentIdx - 1 + total) % total); }}
        style={{
          position: 'absolute', left: '12px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.55)', border: 'none',
          borderRadius: '50%', width: '40px', height: '40px',
          color: '#fff', fontSize: '18px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', zIndex: 10,
          transition: 'background 0.2s',
        }}
      >‹</button>

      <button
        onClick={(e) => { e.stopPropagation(); goTo((currentIdx + 1) % total); }}
        style={{
          position: 'absolute', right: '12px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.55)', border: 'none',
          borderRadius: '50%', width: '40px', height: '40px',
          color: '#fff', fontSize: '18px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', zIndex: 10,
          transition: 'background 0.2s',
        }}
      >›</button>

      <div style={{
        position: 'absolute', top: '14px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.6)',
        color: '#fff', fontSize: '12px', padding: '4px 12px',
        borderRadius: '20px', backdropFilter: 'blur(6px)',
        pointerEvents: 'none', whiteSpace: 'nowrap',
        fontWeight: 500, letterSpacing: '0.3px',
        zIndex: 10,
      }}>
        📷 Sudut {currentIdx + 1} / {total}
      </div>

      <div style={{
        position: 'absolute', bottom: '14px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '8px', pointerEvents: 'none',
        zIndex: 10,
      }}>
        {images.map((_, i) => (
          <div key={i} style={{
            width: i === currentIdx ? '24px' : '8px',
            height: '8px',
            borderRadius: '4px',
            background: i === currentIdx ? '#fff' : 'rgba(255,255,255,0.45)',
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: '36px', left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.7)', fontSize: '11px',
        pointerEvents: 'none', whiteSpace: 'nowrap',
        zIndex: 10,
      }}>
        ← Seret untuk memutar →
      </div>
    </div>
  );
}

// ============================================================
// KOMPONEN MODAL 360 VIRTUAL TOUR
// ============================================================
function VirtualTourModal({ show, onClose, tour360Data }) {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (show) setActiveTab(0);
  }, [show]);

  if (!show) return null;

  const currentTour = tour360Data[activeTab];

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="viewer-360-container" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-lightbox" onClick={onClose}>✕</button>

        <h3 className="title-360">Tur Virtual 360°</h3>

        <div className="tabs-360">
          {tour360Data.map((tour, index) => (
            <button
              key={tour.id}
              className={`tab-360 ${activeTab === index ? 'active' : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {tour.title}
            </button>
          ))}
        </div>

        {currentTour ? (
          <PannellumViewer
            key={activeTab}
            images={currentTour.images}
            isActive={show}
          />
        ) : (
          <div style={{
            width: '100%', height: '420px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            background: '#1a1a2e', borderRadius: '12px', color: '#9ca3af'
          }}>
            Foto tidak tersedia
          </div>
        )}

        <div className="tour-360-info">
          <p className="hint-360">
            🖱️ Klik dan seret ke kiri/kanan untuk memutar pandangan · Atau gunakan tombol panah · Auto-rotate aktif saat idle
          </p>
          <div className="foto-360-notice">
            <span>📸</span>
            <span>
              Menampilkan foto kamar dari 3 sudut berbeda. Seret untuk menjelajahi setiap sudut ruangan.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// KOMPONEN UTAMA LIHAT KOST (PREVIEW PEMILIK)
// ============================================================
export default function LihatKost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [show360Modal, setShow360Modal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Memaksa menggunakan data Kost 1 untuk Preview sesuai permintaan
  const baseHarga = 1200000;
  
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const kostData = {
    nama: "Kost Putri Melati",
    hargaStr: formatRupiah(baseHarga),
    lokasi: "Jl. Cihampelas No. 42, Bandung Utara · 800m dari UNPAD",
    rating: "4.8",
    images: [imgUtama, imgKamar1, imgMandi1, imgWastafel, imgKamar2],
    kategoriGaleri: [
      { nama: "Tampilan Utama", foto: [imgUtama] },
      { nama: "Kamar Tidur", foto: [imgKamar1, imgKamar2, imgKamar3] },
      { nama: "Kamar Mandi", foto: [imgMandi1, imgMandi2, imgMandi3] },
      { nama: "Fasilitas Lainnya", foto: [imgWastafel] }
    ]
  };

  const tour360Data = [
    { id: 0, title: "Kamar Tidur", images: [imgKamar1, imgKamar2, imgKamar3] },
    { id: 1, title: "Kamar Mandi", images: [imgMandi1, imgMandi2, imgMandi3] },
    { id: 2, title: "Area Lainnya", images: [imgWastafel, imgUtama] }
  ];

  // Kalkulasi Harga Dinamis
  const biayaKebersihanPerBulan = 50000;
  const deposit = baseHarga;
  const totalSewa = baseHarga * selectedDuration;
  const totalKebersihan = biayaKebersihanPerBulan * selectedDuration;
  const totalAwal = totalSewa + deposit + totalKebersihan;

  return (
    <div className="detail-page-wrapper">
      <header className="detail-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <img src={iconBack} alt="Kembali" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} />
          Kembali ke Dashboard
        </button>
        <div className="header-actions">
          <span style={{ 
            background: '#fef3c7', color: '#b45309', padding: '8px 16px', 
            borderRadius: '50px', fontSize: '13px', fontWeight: 'bold' 
          }}>
            👁️ Mode Preview Pemilik
          </span>
        </div>
      </header>

      <main className="detail-container">
        <div className="detail-title-area">
          <div className="breadcrumb">Dashboard &gt; Kost Saya &gt; {kostData.nama}</div>
          <div className="title-row">
            <div className="title-left">
              <h1>{kostData.nama}</h1>
              <div className="tags-row">
                <span className="tag-green">
                  <img src={iconVerifikasi} alt="Verified" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                  Terverifikasi
                </span>
                <span className="tag-blue">Kontrak Digital</span>
                <span className="tag-blue">
                  <img src={iconEscrow} alt="Escrow" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                  Escrow
                </span>
                <span className="tag-yellow">
                  <img src={iconReview} alt="Rating" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                  {kostData.rating}/5
                </span>
              </div>
              <p className="location-text">
                <img src={iconLokasi} alt="Lokasi" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                {kostData.lokasi}
              </p>
            </div>
            <div className="title-right">
              <h2>{kostData.hargaStr}</h2>
              <p>/bulan · Deposit {kostData.hargaStr}</p>
            </div>
          </div>
        </div>

        <div className="image-gallery">
          <div className="img-main mobile-img-trigger" onClick={() => setShowGalleryModal(true)}>
            {kostData.images[0]
              ? <img src={kostData.images[0]} alt="Kamar Utama" />
              : <div className="img-placeholder">Gambar Utama Kost</div>
            }

            {tour360Data.length > 0 && (
              <button className="btn-360" onClick={(e) => { e.stopPropagation(); setShow360Modal(true); }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z"></path>
                  <path d="M12 22c-3.314 0-6-4.477-6-10S8.686 2 12 2s6 4.477 6 10-2.686 10-6 10z"></path>
                  <path d="M2 12h20"></path>
                </svg>
                Lihat 360°
              </button>
            )}
            <div className="mobile-gallery-badge">
              Lihat Semua Foto
            </div>
          </div>

          <div className="img-grid-small">
            <div className="img-item">
              {kostData.images[1] ? <img src={kostData.images[1]} alt="Kamar" /> : <div className="img-placeholder"></div>}
            </div>
            <div className="img-item">
              {kostData.images[2] ? <img src={kostData.images[2]} alt="Kamar Mandi" /> : <div className="img-placeholder"></div>}
            </div>
            <div className="img-item">
              {kostData.images[3] ? <img src={kostData.images[3]} alt="Wastafel" /> : <div className="img-placeholder"></div>}
            </div>
            <div className="img-item img-more" onClick={() => setShowGalleryModal(true)}>
              {kostData.images[4] ? <img src={kostData.images[4]} alt="Lainnya" /> : <div className="img-placeholder"></div>}
              <div className="img-overlay">+8 Foto</div>
            </div>
          </div>
        </div>

        <div className="detail-content-split">
          <div className="left-content">

            <div className="content-card scam-score-card">
              <div className="card-header">Scam Score & Keamanan Listing</div>
              <div className="scam-score-body">
                <div className="score-circle">
                  <span className="score-number">92</span>
                </div>
                <div className="score-info">
                  <h4>SANGAT AMAN</h4>
                  <p>Berdasarkan faktor verifikasi</p>
                </div>
                <div className="score-bars">
                  <div className="bar-item"><span>Foto terverifikasi</span><div className="bar full"></div></div>
                  <div className="bar-item"><span>Identitas pemilik</span><div className="bar full"></div></div>
                  <div className="bar-item"><span>Riwayat listing</span><div className="bar full"></div></div>
                  <div className="bar-item"><span>Review penyewa</span><div className="bar full"></div></div>
                  <div className="bar-item"><span>Konsistensi info</span><div className="bar full"></div></div>
                </div>
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">Tentang Kost Ini</div>
              <p className="desc-text">
                Kost Putri Melati adalah hunian khusus wanita yang nyaman, bersih, dan aman di kawasan strategis Bandung Utara. Berlokasi dekat dengan UNPAD, UNPAR, dan berbagai pusat perbelanjaan.
              </p>
              <div className="info-boxes">
                <div className="info-box"><span>Jenis</span><strong>Putri</strong></div>
                <div className="info-box"><span>Kapasitas</span><strong>1 Orang</strong></div>
                <div className="info-box"><span>Ukuran</span><strong>3 × 4 m²</strong></div>
                <div className="info-box"><span>Kamar Tersedia</span><strong>3 kamar</strong></div>
                <div className="info-box"><span>Kamar Mandi</span><strong>Dalam</strong></div>
                <div className="info-box"><span>Listrik</span><strong>Token</strong></div>
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">Fasilitas Kamar</div>
              <div className="facility-grid">
                <div className="fac-badge"><img src={iconKamarTidur} alt="Kasur" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Kasur</div>
                <div className="fac-badge"><img src={iconLemari} alt="Lemari" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Lemari</div>
                <div className="fac-badge"><img src={iconTable} alt="Meja Kursi" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Meja & Kursi</div>
                <div className="fac-badge"><img src={iconAc} alt="AC" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> AC</div>
                <div className="fac-badge"><img src={iconWifi} alt="WiFi" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> WiFi</div>
                <div className="fac-badge"><img src={iconKamarMandi} alt="Kamar Mandi" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Kamar Mandi Dalam</div>
                <div className="fac-badge disabled"><img src={iconTv} alt="TV" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px', filter: 'grayscale(100%)' }} /> TV (Tidak ada)</div>
              </div>
              <div className="card-header" style={{ marginTop: '24px' }}>Fasilitas Umum</div>
              <div className="facility-grid">
                <div className="fac-badge"><img src={iconDapur} alt="Dapur" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Dapur Bersama</div>
                <div className="fac-badge"><img src={iconRuangTamu} alt="Ruang Tamu" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Ruang Tamu</div>
                <div className="fac-badge"><img src={iconTempatCuci} alt="Tempat Cuci" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Tempat Cuci</div>
                <div className="fac-badge"><img src={iconCctv} alt="CCTV" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> CCTV</div>
                <div className="fac-badge">Parkir Motor</div>
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">
                <img src={iconCoins} alt="Biaya" style={{ width: '20px', verticalAlign: 'middle', marginRight: '8px' }} />
                Rincian Biaya (Transparan)
              </div>
              <div className="cost-list">
                <div className="cost-item"><span>Sewa kamar</span><strong>{kostData.hargaStr}/bln</strong></div>
                <div className="cost-item"><span>Listrik</span><strong>Token (bayar sendiri)</strong></div>
                <div className="cost-item"><span>Air</span><strong>Sudah termasuk</strong></div>
                <div className="cost-item"><span>WiFi</span><strong>Sudah termasuk</strong></div>
                <div className="cost-item"><span>Parkir motor</span><strong>Gratis</strong></div>
                <div className="cost-item"><span>Kebersihan</span><strong>Rp 50.000/bln</strong></div>
              </div>
              <div className="alert-green">
                <img src={iconVerifikasi} alt="Aman" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} />
                Tidak ada biaya tersembunyi. Semua biaya sudah tercantum di kontrak digital.
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">Peraturan Kost</div>
              <div className="rules-list">
                <div className="rule-item"><img src={iconJamMalam} alt="Jam Malam" style={{ width: '20px', flexShrink: 0 }} /> Jam malam pukul 23:00 WIB. Pemberitahuan wajib jika akan pulang terlambat</div>
                <div className="rule-item"><img src={iconAturanTamu} alt="Aturan Tamu" style={{ width: '20px', flexShrink: 0 }} /> Tamu hanya boleh di ruang tamu, tidak boleh masuk kamar</div>
                <div className="rule-item"><img src={iconNoSmoke} alt="Dilarang Merokok" style={{ width: '20px', flexShrink: 0 }} /> Dilarang merokok di dalam kamar dan area kost</div>
                <div className="rule-item"><img src={iconNoPets} alt="Dilarang Hewan" style={{ width: '20px', flexShrink: 0 }} /> Dilarang membawa hewan peliharaan</div>
                <div className="rule-item"><img src={iconPaymentMethod} alt="Pembayaran" style={{ width: '20px', flexShrink: 0 }} /> Pembayaran paling lambat tanggal 5 setiap bulan</div>
                <div className="rule-item"><img src={iconLatePayment} alt="Denda" style={{ width: '20px', flexShrink: 0 }} /> Denda keterlambatan Rp 10.000/hari setelah tanggal 5</div>
                <div className="rule-item"><img src={iconNotification} alt="Pindah" style={{ width: '20px', flexShrink: 0 }} /> Pemberitahuan pindah minimal 30 hari sebelumnya</div>
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">
                <img src={iconLokasi} alt="Lokasi" style={{ width: '20px', verticalAlign: 'middle', marginRight: '8px' }} />
                Informasi Lingkungan Sekitar
              </div>
              <div className="environment-grid">
                <div className="env-item"><span><img src={iconSchool} alt="Kampus" style={{ width: '16px', marginRight: '6px' }} /> UNPAD</span><strong>800m</strong></div>
                <div className="env-item"><span><img src={iconMinimarket} alt="Minimarket" style={{ width: '16px', marginRight: '6px' }} /> Indomaret</span><strong>150m</strong></div>
                <div className="env-item"><span><img src={iconRestaurant} alt="Makan" style={{ width: '16px', marginRight: '6px' }} /> Warteg/Warung</span><strong>100m</strong></div>
                <div className="env-item"><span><img src={iconClinic} alt="Klinik" style={{ width: '16px', marginRight: '6px' }} /> Klinik Cihampelas</span><strong>500m</strong></div>
                <div className="env-item"><span><img src={iconMedicine} alt="Apotek" style={{ width: '16px', marginRight: '6px' }} /> Apotek K-24</span><strong>300m</strong></div>
                <div className="env-item"><span><img src={iconMosque} alt="Masjid" style={{ width: '16px', marginRight: '6px' }} /> Masjid</span><strong>200m</strong></div>
                <div className="env-item"><span><img src={iconLaundry} alt="Laundry" style={{ width: '16px', marginRight: '6px' }} /> Laundry</span><strong>120m</strong></div>
                <div className="env-item"><span><img src={iconAtm} alt="ATM" style={{ width: '16px', marginRight: '6px' }} /> ATM BCA</span><strong>350m</strong></div>
                <div className="env-item"><span><img src={iconAngkot} alt="Angkot" style={{ width: '16px', marginRight: '6px' }} /> Angkot</span><strong>50m</strong></div>
                <div className="env-item"><span><img src={iconMinimarket} alt="Minimarket" style={{ width: '16px', marginRight: '6px' }} /> Alfamart</span><strong>250m</strong></div>
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">
                <img src={iconReview} alt="Review" style={{ width: '20px', verticalAlign: 'middle', marginRight: '8px' }} />
                Review Penyewa
              </div>
              <div className="review-summary">
                <div className="rating-score">
                  <h2>4.8</h2>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={iconReview} alt="Star" style={{ width: '16px' }} />
                    ))}
                  </div>
                  <p>dari 24 ulasan terverifikasi</p>
                </div>
                <div className="rating-bars">
                  <div className="rate-bar-item"><span>Fasilitas</span><div className="r-bar"><div className="r-fill" style={{ width: '95%' }}></div></div></div>
                  <div className="rate-bar-item"><span>Kebersihan</span><div className="r-bar"><div className="r-fill" style={{ width: '98%' }}></div></div></div>
                  <div className="rate-bar-item"><span>Keamanan</span><div className="r-bar"><div className="r-fill" style={{ width: '90%' }}></div></div></div>
                  <div className="rate-bar-item"><span>Kenyamanan</span><div className="r-bar"><div className="r-fill" style={{ width: '92%' }}></div></div></div>
                  <div className="rate-bar-item"><span>Kesesuaian foto</span><div className="r-bar"><div className="r-fill" style={{ width: '96%' }}></div></div></div>
                </div>
              </div>
              <div className="review-list">
                <div className="review-item">
                  <div className="rev-header">
                    <div className="rev-avatar" style={{ backgroundColor: '#c77a63' }}>R</div>
                    <div className="rev-info">
                      <strong>Rizky Amalia</strong>
                      <span>Penyewa terverifikasi · Maret 2026</span>
                    </div>
                    <div className="rev-stars">
                      {[...Array(5)].map((_, i) => <img key={i} src={iconReview} alt="Star" style={{ width: '14px' }} />)}
                    </div>
                  </div>
                  <p className="rev-text">"Kost yang sangat aman dan nyaman. Kontrak digital SecuraKost bikin saya tenang karena semua tertulis jelas. Deposit juga dikembalikan tepat waktu via escrow!"</p>
                  <div className="rev-tags">
                    <span>Fasilitas ✓</span><span>Bersih ✓</span><span>Aman ✓</span>
                  </div>
                  <div className="rev-verified">
                    <img src={iconVerifikasi} alt="Verified" style={{ width: '14px', marginRight: '4px' }} />
                    Review dari penyewa terverifikasi
                  </div>
                </div>
                <div className="review-item">
                  <div className="rev-header">
                    <div className="rev-avatar" style={{ backgroundColor: '#1a2b4c' }}>D</div>
                    <div className="rev-info">
                      <strong>Dewi Kusuma</strong>
                      <span>Penyewa terverifikasi · Januari 2026</span>
                    </div>
                    <div className="rev-stars">
                      {[...Array(4)].map((_, i) => <img key={i} src={iconReview} alt="Star" style={{ width: '14px' }} />)}
                    </div>
                  </div>
                  <p className="rev-text">"Sesuai foto, pemilik responsif. Saya suka fitur kontrak digital — jelas hitam di atas putih. Lokasi strategis banget dekat UNPAD."</p>
                  <div className="rev-tags">
                    <span>Kenyamanan ✓</span><span>Lokasi ✓</span>
                  </div>
                  <div className="rev-verified">
                    <img src={iconVerifikasi} alt="Verified" style={{ width: '14px', marginRight: '4px' }} />
                    Review dari penyewa terverifikasi
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="right-sidebar">
            <div className="checkout-card">
              <div className="checkout-header">
                <span className="mulai-dari">Simulasi Tampilan Harga</span>
                <h3>{kostData.hargaStr}</h3>
                <span className="per-bulan">/bulan · Escrow Protected</span>
              </div>
              
              <div className="rent-tabs">
                {[
                  { label: '1 Bln', value: 1 },
                  { label: '3 Bln', value: 3 },
                  { label: '6 Bln', value: 6 },
                  { label: '1 Thn', value: 12 }
                ].map((tab) => (
                  <div
                    key={tab.value}
                    className={`rent-tab ${selectedDuration === tab.value ? 'active' : ''}`}
                    onClick={() => setSelectedDuration(tab.value)}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>
              
              <div className="checkout-calc">
                <div className="calc-row">
                  <span>Sewa {selectedDuration} bulan</span>
                  <span>{formatRupiah(totalSewa)}</span>
                </div>
                <div className="calc-row">
                  <span>Deposit (escrow)</span>
                  <span>{formatRupiah(deposit)}</span>
                </div>
                <div className="calc-row">
                  <span>Kebersihan ({selectedDuration} bln)</span>
                  <span>{formatRupiah(totalKebersihan)}</span>
                </div>
                <div className="calc-row total">
                  <span>Total Awal</span>
                  <span>{formatRupiah(totalAwal)}</span>
                </div>
              </div>
              
              <div className="escrow-notice">
                <img src={iconEscrow} alt="Escrow" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} />
                Tampilan info ke penyewa: Deposit akan disimpan oleh SecuraKost Escrow.
              </div>
              
              <button 
                className="btn-ajukan hide-on-mobile-action" 
                onClick={() => navigate(`/edit-kost/${id || '1'}`)}
                style={{ backgroundColor: '#2e504a' }}
              >
                ✏️ Edit Listing Kost
              </button>
              <button className="btn-chat" onClick={() => navigate('/dashboard')}>
                Kembali ke Dashboard
              </button>
            </div>

            <div className="protection-card">
              <h4>Perlindungan Pemilik</h4>
              <ul>
                <li><img src={iconVerifikasi} alt="Hukum" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Kontrak digital mengikat penyewa (UU ITE)</li>
                <li><img src={iconEscrow} alt="OJK" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Jaminan denda terpotong dari deposit</li>
                <li><img src={iconLokasi} alt="Mediasi" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Verifikasi ketat KTP calon penyewa</li>
                <li><img src={iconBackup} alt="Backup" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Riwayat bayar otomatis tercatat sistem</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM BAR KHUSUS MOBILE */}
      <div className="mobile-sticky-bottom">
        <div className="mobile-price-area">
          <span className="label-mulai">Mode Preview Aktif</span>
          <span className="label-harga" style={{ fontSize: '14px' }}>Tampilan Penyewa</span>
        </div>
        <button 
          className="btn-ajukan-mobile"
          style={{ backgroundColor: '#2e504a' }}
          onClick={() => navigate(`/edit-kost/${id || '1'}`)}
        >
          Edit Kost
        </button>
      </div>

      {showGalleryModal && (
        <div className="modal-overlay" onClick={() => setShowGalleryModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-sticky">
              <h3>Galeri Foto Kost</h3>
              <button className="btn-close-modal" onClick={() => setShowGalleryModal(false)}>✕</button>
            </div>
            <div className="modal-gallery-container">
              {kostData.kategoriGaleri.length > 0 ? (
                kostData.kategoriGaleri.map((kategori, index) => (
                  <div key={index} className="gallery-category-section">
                    <h4 className="category-title">{kategori.nama}</h4>
                    <div className="category-grid">
                      {kategori.foto.map((img, imgIdx) => (
                        <div key={imgIdx} className="modal-img-wrapper">
                          <img
                            src={img}
                            alt={`${kategori.nama} ${imgIdx + 1}`}
                            loading="lazy"
                            onClick={() => setSelectedImage(img)}
                            style={{ cursor: 'zoom-in' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="img-placeholder" style={{ height: '200px' }}>Foto belum tersedia</div>
              )}
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <button className="btn-close-lightbox" onClick={() => setSelectedImage(null)}>✕</button>
          <img
            src={selectedImage}
            alt="Gambar Diperbesar"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <VirtualTourModal
        show={show360Modal}
        onClose={() => setShow360Modal(false)}
        tour360Data={tour360Data}
      />

    </div>
  );
}