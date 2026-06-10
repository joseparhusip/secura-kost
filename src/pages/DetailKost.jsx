import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/detail.css';

// ============================================================
// IMPORT GAMBAR KOST (Sesuai Struktur Folder)
// ============================================================
// Kost 1
import k1_utama from '../assets/img/kost/kost-1/kamar-kost-1.jpeg';
import k1_kamar1 from '../assets/img/kost/kost-1/kamar-1.jpeg';
import k1_kamar2 from '../assets/img/kost/kost-1/kamar-2.jpeg';
import k1_kamar3 from '../assets/img/kost/kost-1/kamar-3.jpeg';
import k1_mandi1 from '../assets/img/kost/kost-1/kamar-mandi-1.jpeg';
import k1_mandi2 from '../assets/img/kost/kost-1/kamar-mandi-2.jpeg';
import k1_mandi3 from '../assets/img/kost/kost-1/kamar-mandi-3.jpeg';
import k1_wastafel from '../assets/img/kost/kost-1/wastafel.jpeg';

// Kost 2
import k2_utama from '../assets/img/kost/kost-2/kamar-kost-2.jpeg';
import k2_mandi1 from '../assets/img/kost/kost-2/kamar-mandi-1.jpeg';
import k2_mandi2 from '../assets/img/kost/kost-2/kamar-mandi.jpeg';
import k2_parkir from '../assets/img/kost/kost-2/parkiran.png';

// Kost 3
import k3_utama from '../assets/img/kost/kost-3/kamar-kost-3.jpg';
import k3_kamar from '../assets/img/kost/kost-3/kamar-kost.png';
import k3_mandi1 from '../assets/img/kost/kost-3/kamar-mandi-1.png';
import k3_mandi2 from '../assets/img/kost/kost-3/kamar-mandi.png';
import k3_parkir from '../assets/img/kost/kost-3/parkir.png';

// Kost 4
import k4_utama from '../assets/img/kost/kost-4/kamar-kost-4.jpg';
import k4_kamar from '../assets/img/kost/kost-4/kamar-kost.png';
import k4_mandi1 from '../assets/img/kost/kost-4/kamar-mandi-1.png';
import k4_mandi2 from '../assets/img/kost/kost-4/kamar-mandi.png';
import k4_parkir from '../assets/img/kost/kost-4/parkiran.png';

// Kost 5
import k5_utama from '../assets/img/kost/kost-5/kamar-kost-1.png';
import k5_kamar from '../assets/img/kost/kost-5/kamar-kost.png';
import k5_mandi from '../assets/img/kost/kost-5/kamar-mandi.png';
import k5_parkir from '../assets/img/kost/kost-5/parkir.png';

// Kost 6
import k6_utama from '../assets/img/kost/kost-6/kamar-kost-6.jpeg';
import k6_kamar from '../assets/img/kost/kost-6/kamar-kost.png';
import k6_mandi from '../assets/img/kost/kost-6/kamar-mandi.png';
import k6_parkir from '../assets/img/kost/kost-6/parkir.png';

// Kost 7
import k7_utama from '../assets/img/kost/kost-7/kamar-kost-7.webp';
import k7_kamar from '../assets/img/kost/kost-7/kamar-kost.png';
import k7_mandi from '../assets/img/kost/kost-7/kamar-mandi.png';
import k7_parkir from '../assets/img/kost/kost-7/parkir.png';

// ============================================================
// IMPORT ICONS DETAIL
// ============================================================
import iconAc from '../assets/icons/icons-details/ac.png';
import iconAngkot from '../assets/icons/icons-details/angkot.png';
import iconAtm from '../assets/icons/icons-details/atm.png';
import iconAturanTamu from '../assets/icons/icons-details/aturan-tamu.png';
import iconBack from '../assets/icons/icons-details/back.png';
import iconBackup from '../assets/icons/icons-details/bakcup.png';
import iconCctv from '../assets/icons/icons-details/cctv-camera.png';
import iconClinic from '../assets/icons/icons-details/clinic.png';
import iconCoins from '../assets/icons/icons-details/coins.png';
import iconDapur from '../assets/icons/icons-details/dapur.png';
import iconEscrow from '../assets/icons/icons-details/escrow.png';
import iconJamMalam from '../assets/icons/icons-details/jam-malam.png';
import iconKamarMandi from '../assets/icons/icons-details/kamar-mandi.png';
import iconKamarTidur from '../assets/icons/icons-details/kamar-tidur.png';
import iconLatePayment from '../assets/icons/icons-details/late-payment.png';
import iconLaundry from '../assets/icons/icons-details/laundry-machine.png';
import iconLemari from '../assets/icons/icons-details/lemari-baju.png';
import iconLokasi from '../assets/icons/icons-details/lokasi.png';
import iconMedicine from '../assets/icons/icons-details/medicine.png';
import iconMinimarket from '../assets/icons/icons-details/minimarket.png';
import iconMosque from '../assets/icons/icons-details/mosque.png';
import iconNoPets from '../assets/icons/icons-details/no-pets_1027249.png';
import iconNoSmoke from '../assets/icons/icons-details/no-smoke.png';
import iconNotification from '../assets/icons/icons-details/notification.png';
import iconPaymentMethod from '../assets/icons/icons-details/payment-method.png';
import iconRestaurant from '../assets/icons/icons-details/restaurant.png';
import iconReview from '../assets/icons/icons-details/review.png';
import iconRuangTamu from '../assets/icons/icons-details/ruang-tamu.png';
import iconSchool from '../assets/icons/icons-details/school.png';
import iconShare from '../assets/icons/icons-details/share.png';
import iconSimpan from '../assets/icons/icons-details/simpan.png';
import iconTable from '../assets/icons/icons-details/table.png';
import iconTempatCuci from '../assets/icons/icons-details/tempat-cuci-baju.png';
import iconTv from '../assets/icons/icons-details/tv.png';
import iconVerifikasi from '../assets/icons/icons-details/verifikasi.png';
import iconWhatsapp from '../assets/icons/icons-details/whatsappp.png';
import iconWifi from '../assets/icons/icons-details/wifi.png';

// ============================================================
// KOMPONEN DRAG-TO-ROTATE MULTI-PHOTO VIEWER (WIDE + SWIPE)
// ============================================================
function PannellumViewer({ images, isActive }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [dragStartX, setDragStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const autoRotateRef = useRef(null);
  const lastXRef = useRef(null);
  const lastTimeRef = useRef(null);
  // Threshold swipe lebih kecil agar feel-nya lebih ringan/natural
  const DRAG_THRESHOLD = 40;

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
    setVelocity(0);
    setTimeout(() => setIsTransitioning(false), 380);
  };

  const handleDragStart = (clientX) => {
    clearInterval(autoRotateRef.current);
    setDragStartX(clientX);
    setIsDragging(true);
    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
    setVelocity(0);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging || dragStartX === null) return;
    // Hitung velocity untuk momentum
    const now = Date.now();
    const dt = now - (lastTimeRef.current || now);
    if (dt > 0) {
      const dx = clientX - (lastXRef.current || clientX);
      setVelocity(dx / dt); // px per ms
    }
    lastXRef.current = clientX;
    lastTimeRef.current = Date.now();
    setOffset(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    // Momentum: jika velocity cukup tinggi, langsung pindah
    const shouldSwipeNext = offset < -DRAG_THRESHOLD || velocity < -0.4;
    const shouldSwipePrev = offset > DRAG_THRESHOLD  || velocity >  0.4;
    if (shouldSwipeNext) {
      goTo((currentIdx + 1) % total);
    } else if (shouldSwipePrev) {
      goTo((currentIdx - 1 + total) % total);
    } else {
      setOffset(0);
    }
    setDragStartX(null);
  };

  const onMouseDown  = (e) => handleDragStart(e.clientX);
  const onMouseMove  = (e) => { if (isDragging) handleDragMove(e.clientX); };
  const onMouseUp    = () => handleDragEnd();
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };

  const onTouchStart = (e) => { e.preventDefault(); handleDragStart(e.touches[0].clientX); };
  const onTouchMove  = (e) => { e.preventDefault(); handleDragMove(e.touches[0].clientX); };
  const onTouchEnd   = () => handleDragEnd();

  if (!images || images.length === 0) {
    return (
      <div style={{
        width: '100%', aspectRatio: '16/9', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: '#1a1a2e', borderRadius: '12px', color: '#9ca3af'
      }}>
        Foto tidak tersedia
      </div>
    );
  }

  const prevIdx = (currentIdx - 1 + total) % total;
  const nextIdx = (currentIdx + 1) % total;

  // Efek parallax ringan: slide aktif bergerak penuh, tetangga sedikit lebih lambat
  const PARALLAX = 0.12;
  const parallaxOffset = offset * PARALLAX;

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        // Wide: pakai aspect-ratio 16:9 agar responsif di semua ukuran layar
        aspectRatio: '16 / 9',
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#0d0d0d',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        touchAction: 'none',
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
        { src: images[prevIdx],    tx: `calc(-100% + ${offset + parallaxOffset}px)` },
        { src: images[currentIdx], tx: `${offset}px`                                 },
        { src: images[nextIdx],    tx: `calc(100% + ${offset - parallaxOffset}px)`  },
      ].map(({ src, tx }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            transform: `translateX(${tx})`,
            transition: isTransitioning ? 'transform 0.38s cubic-bezier(0.22,0.61,0.36,1)' : 'none',
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          {/* Background blur untuk area kosong */}
          <img
            src={src}
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-8%', left: '-8%',
              width: '116%', height: '116%',
              objectFit: 'cover',
              filter: 'blur(22px) brightness(0.45) saturate(1.3)',
              transform: 'scale(1.04)',
              pointerEvents: 'none',
            }}
          />
          {/* Foto utama: cover agar wide dan memenuhi area */}
          <img
            src={src}
            alt={`Sudut ${i + 1}`}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
        </div>
      ))}

      {/* Gradient edge kiri-kanan untuk feel immersive */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.35) 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Gradient bawah untuk legibility teks */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />

      {/* Tombol panah kiri */}
      <button
        onClick={(e) => { e.stopPropagation(); goTo((currentIdx - 1 + total) % total); }}
        style={{
          position: 'absolute', left: '16px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%', width: '44px', height: '44px',
          color: '#fff', fontSize: '20px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', zIndex: 10,
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.85)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)';  e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
      >‹</button>

      {/* Tombol panah kanan */}
      <button
        onClick={(e) => { e.stopPropagation(); goTo((currentIdx + 1) % total); }}
        style={{
          position: 'absolute', right: '16px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%', width: '44px', height: '44px',
          color: '#fff', fontSize: '20px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', zIndex: 10,
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.85)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.5)';  e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
      >›</button>

      {/* Label sudut (kiri atas) */}
      <div style={{
        position: 'absolute', top: '14px', left: '16px',
        background: 'rgba(0,0,0,0.55)',
        color: '#fff', fontSize: '12px', padding: '4px 12px',
        borderRadius: '20px', backdropFilter: 'blur(8px)',
        pointerEvents: 'none', whiteSpace: 'nowrap',
        fontWeight: 600, letterSpacing: '0.4px',
        zIndex: 10,
      }}>
        📷 {currentIdx + 1} / {total}
      </div>

      {/* Hint swipe (kanan atas) — hanya muncul saat tidak drag */}
      {!isDragging && (
        <div style={{
          position: 'absolute', top: '14px', right: '16px',
          color: 'rgba(255,255,255,0.6)', fontSize: '11px',
          pointerEvents: 'none', whiteSpace: 'nowrap',
          zIndex: 10, display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          ← swipe →
        </div>
      )}

      {/* Dot indicator (bawah tengah) */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', gap: '7px', pointerEvents: 'none',
        zIndex: 10,
      }}>
        {images.map((_, i) => (
          <div key={i} style={{
            width: i === currentIdx ? '28px' : '8px',
            height: '4px',
            borderRadius: '2px',
            background: i === currentIdx ? '#10b981' : 'rgba(255,255,255,0.4)',
            transition: 'all 0.3s ease',
          }} />
        ))}
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
              Menampilkan foto kamar dari sudut berbeda. Seret untuk menjelajah.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

// ============================================================
// DATABASE LOKAL KOST 1 S/D 7
// ============================================================
const semuaDataKost = [
  {
    id: 1,
    nama: "Kost Putri Melati",
    lokasiLengkap: "Jl. Cihampelas No. 42, Bandung Utara · 800m dari UNPAD",
    hargaNum: 1200000,
    tipe: "Putri",
    rating: "4.8",
    ulasan: 24,
    scamScore: 92,
    deskripsi: "Kost Putri Melati adalah hunian khusus wanita yang nyaman, bersih, dan aman di kawasan strategis Bandung Utara. Berlokasi dekat dengan UNPAD, UNPAR, dan berbagai pusat perbelanjaan. Memiliki standar keamanan tinggi dan pengawasan CCTV 24 Jam.",
    images: [k1_utama, k1_kamar1, k1_mandi1, k1_wastafel, k1_kamar2],
    kategoriGaleri: [
      { nama: "Tampilan Utama", foto: [k1_utama] },
      { nama: "Kamar Tidur", foto: [k1_kamar1, k1_kamar2, k1_kamar3] },
      { nama: "Kamar Mandi", foto: [k1_mandi1, k1_mandi2, k1_mandi3] },
      { nama: "Fasilitas Lainnya", foto: [k1_wastafel] }
    ],
    tour360Data: [
      { id: 0, title: "Kamar Tidur", images: [k1_kamar1, k1_kamar2, k1_kamar3] },
      { id: 1, title: "Kamar Mandi", images: [k1_mandi1, k1_mandi2, k1_mandi3] }
    ]
  },
  {
    id: 2,
    nama: "Kost Putra Garuda",
    lokasiLengkap: "Jl. Dago Asri No. 15, Dago, Bandung · 1.2km dari ITB",
    hargaNum: 1500000,
    tipe: "Putra",
    rating: "4.6",
    ulasan: 18,
    scamScore: 87,
    deskripsi: "Kost Putra Garuda berlokasi strategis di Dago, Bandung. Sangat cocok bagi mahasiswa maupun pekerja yang mencari kenyamanan dan akses mudah ke kampus ITB atau pusat kota. Fasilitas super lengkap, lahan parkir luas, dan sistem keamanan terjamin.",
    images: [k2_utama, k2_mandi1, k2_mandi2, k2_parkir],
    kategoriGaleri: [
      { nama: "Kamar & Fasilitas", foto: [k2_utama, k2_mandi1, k2_mandi2] },
      { nama: "Area Luar", foto: [k2_parkir] }
    ],
    tour360Data: [
      { id: 0, title: "Fasilitas Kamar", images: [k2_utama, k2_mandi1, k2_mandi2] }
    ]
  },
  {
    id: 3,
    nama: "Kost Campur Damai",
    lokasiLengkap: "Jl. Mengger Girang, Buah Batu, Bandung · Dekat Telkom University",
    hargaNum: 900000,
    tipe: "Campur",
    rating: "4.5",
    ulasan: 31,
    scamScore: 80,
    deskripsi: "Menawarkan hunian nyaman dan tenang di area Buah Batu. Akses sangat dekat ke Telkom University dan pintu gerbang tol Buah Batu. Tersedia fasilitas memadai dan lingkungan yang ramah untuk dihuni baik pria maupun wanita.",
    images: [k3_utama, k3_kamar, k3_mandi1, k3_mandi2, k3_parkir],
    kategoriGaleri: [
      { nama: "Kamar", foto: [k3_utama, k3_kamar] },
      { nama: "Kamar Mandi", foto: [k3_mandi1, k3_mandi2] },
      { nama: "Parkiran", foto: [k3_parkir] }
    ],
    tour360Data: [
      { id: 0, title: "Interior Kamar", images: [k3_utama, k3_kamar] }
    ]
  },
  {
    id: 4,
    nama: "Kost Putri Anggrek",
    lokasiLengkap: "Jl. Dipatiukur No. 80, Coblong, Bandung · 300m dari UNPAD DU",
    hargaNum: 1350000,
    tipe: "Putri",
    rating: "4.9",
    ulasan: 45,
    scamScore: 95,
    deskripsi: "Pilihan paling tepat untuk mahasiswi Unpad Dipatiukur atau ITHB. Kost Putri Anggrek menawarkan fasilitas kamar mandi dalam, furnitur lengkap, WiFi kencang, dan lingkungan yang sangat aman untuk mendukung fokus belajar.",
    images: [k4_utama, k4_kamar, k4_mandi1, k4_mandi2, k4_parkir],
    kategoriGaleri: [
      { nama: "Kamar", foto: [k4_utama, k4_kamar] },
      { nama: "Kamar Mandi", foto: [k4_mandi1, k4_mandi2] },
      { nama: "Fasilitas Luar", foto: [k4_parkir] }
    ],
    tour360Data: [
      { id: 0, title: "Kamar", images: [k4_utama, k4_kamar] },
      { id: 1, title: "Kamar Mandi", images: [k4_mandi1, k4_mandi2] }
    ]
  },
  {
    id: 5,
    nama: "Kost Putra Rajawali",
    lokasiLengkap: "Jl. Gegerkalong Hilir, Setiabudi, Bandung · 500m dari UPI",
    hargaNum: 1100000,
    tipe: "Putra",
    rating: "4.4",
    ulasan: 12,
    scamScore: 85,
    deskripsi: "Kost khusus pria di kawasan Setiabudi dengan udara yang sejuk. Sangat ideal untuk mahasiswa UPI atau Enhaii. Kost ini memiliki tempat parkir yang lapang, kebersihan yang terjaga, serta WiFi gratis.",
    images: [k5_utama, k5_kamar, k5_mandi, k5_parkir],
    kategoriGaleri: [
      { nama: "Kamar & Toilet", foto: [k5_utama, k5_kamar, k5_mandi] },
      { nama: "Parkiran", foto: [k5_parkir] }
    ],
    tour360Data: [
      { id: 0, title: "Review Ruangan", images: [k5_utama, k5_kamar, k5_mandi] }
    ]
  },
  {
    id: 6,
    nama: "Kost Campur Sejahtera",
    lokasiLengkap: "Jl. Ciumbuleuit Raya, Bandung · 400m dari UNPAR",
    hargaNum: 2000000,
    tipe: "Campur",
    rating: "4.9",
    ulasan: 50,
    scamScore: 98,
    deskripsi: "Hunian berkelas dan eksklusif di Ciumbuleuit, selangkah menuju Universitas Katolik Parahyangan (Unpar). Direkomendasikan untuk mahasiswa maupun ekspatriat yang menginginkan fasilitas premium, kenyamanan ekstra, dan kemudahan akses ke berbagai cafe hits.",
    images: [k6_utama, k6_kamar, k6_mandi, k6_parkir],
    kategoriGaleri: [
      { nama: "Area Kamar", foto: [k6_utama, k6_kamar] },
      { nama: "Toilet & Luar", foto: [k6_mandi, k6_parkir] }
    ],
    tour360Data: [
      { id: 0, title: "Ruang Kamar", images: [k6_utama, k6_kamar] }
    ]
  },
  {
    id: 7,
    nama: "Kost Putri Kenanga",
    lokasiLengkap: "Jl. Tubagus Ismail Dalam, Bandung · Dekat Pasar Simpang",
    hargaNum: 850000,
    tipe: "Putri",
    rating: "4.3",
    ulasan: 22,
    scamScore: 78,
    deskripsi: "Kost putri dengan harga bersahabat di kawasan Tubagus Ismail. Menyediakan fasilitas dapur bersama, area cuci, dan akses WiFi yang stabil. Suasana di dalam kost sangat tenang dan kondusif untuk beristirahat setelah beraktivitas seharian.",
    images: [k7_utama, k7_kamar, k7_mandi, k7_parkir],
    kategoriGaleri: [
      { nama: "Kamar", foto: [k7_utama, k7_kamar] },
      { nama: "Kamar Mandi", foto: [k7_mandi] },
      { nama: "Area Kost", foto: [k7_parkir] }
    ],
    tour360Data: [
      { id: 0, title: "Review Ruangan", images: [k7_utama, k7_kamar, k7_mandi] }
    ]
  }
];

// ============================================================
// KOMPONEN UTAMA DETAIL KOST
// ============================================================
export default function DetailKost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [show360Modal, setShow360Modal] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Cari data kost berdasarkan ID dari URL
  const kostTerpilih = semuaDataKost.find(k => k.id === parseInt(id));

  // Jika ID tidak ditemukan (misal user masuk ke url /detail/99)
  if (!kostTerpilih) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Yah, Data Kost Tidak Ditemukan</h2>
        <p>Kost dengan ID {id} tidak ada dalam database kami.</p>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', background: '#2d6b55', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}>
          Kembali
        </button>
      </div>
    );
  }

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  const hargaStr = formatRupiah(kostTerpilih.hargaNum);

  // Kalkulasi Harga Dinamis
  const biayaKebersihanPerBulan = 50000;
  const deposit = kostTerpilih.hargaNum;
  const totalSewa = kostTerpilih.hargaNum * selectedDuration;
  const totalKebersihan = biayaKebersihanPerBulan * selectedDuration;
  const totalAwal = totalSewa + deposit + totalKebersihan;

  return (
    <div className="detail-page-wrapper">
      <header className="detail-header">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <img src={iconBack} alt="Kembali" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} />
          Kembali
        </button>
        <div className="header-actions">
          <button className="btn-action">
            <img src={iconSimpan} alt="Simpan" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} />
            Simpan
          </button>
          <button className="btn-action">
            <img src={iconShare} alt="Bagikan" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} />
            Bagikan
          </button>
        </div>
      </header>

      <main className="detail-container">
        <div className="detail-title-area">
          <div className="breadcrumb">Beranda &gt; Cari Kost &gt; {kostTerpilih.nama}</div>
          <div className="title-row">
            <div className="title-left">
              <h1>{kostTerpilih.nama}</h1>
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
                  {kostTerpilih.rating}/5
                </span>
              </div>
              <p className="location-text">
                <img src={iconLokasi} alt="Lokasi" style={{ width: '14px', verticalAlign: 'middle', marginRight: '4px' }} />
                {kostTerpilih.lokasiLengkap}
              </p>
            </div>
            <div className="title-right">
              <h2>{hargaStr}</h2>
              <p>/bulan · Deposit {hargaStr}</p>
            </div>
          </div>
        </div>

        <div className="image-gallery">
          <div className="img-main mobile-img-trigger" onClick={() => setShowGalleryModal(true)}>
            {kostTerpilih.images[0]
              ? <img src={kostTerpilih.images[0]} alt="Kamar Utama" />
              : <div className="img-placeholder">Gambar Utama Kost {id}</div>
            }

            {kostTerpilih.tour360Data && kostTerpilih.tour360Data.length > 0 && (
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
              {kostTerpilih.images[1] ? <img src={kostTerpilih.images[1]} alt="Kamar" /> : <div className="img-placeholder"></div>}
            </div>
            <div className="img-item">
              {kostTerpilih.images[2] ? <img src={kostTerpilih.images[2]} alt="Kamar Mandi" /> : <div className="img-placeholder"></div>}
            </div>
            <div className="img-item">
              {kostTerpilih.images[3] ? <img src={kostTerpilih.images[3]} alt="Fasilitas" /> : <div className="img-placeholder"></div>}
            </div>
            <div className="img-item img-more" onClick={() => setShowGalleryModal(true)}>
              {kostTerpilih.images[4] ? <img src={kostTerpilih.images[4]} alt="Lainnya" /> : <div className="img-placeholder">Lebih Lengkap</div>}
              <div className="img-overlay">+ Lihat Semua Foto</div>
            </div>
          </div>
        </div>

        <div className="detail-content-split">
          <div className="left-content">

            <div className="content-card scam-score-card">
              <div className="card-header">Scam Score & Keamanan Listing</div>
              <div className="scam-score-body">
                <div className="score-circle">
                  <span className="score-number">{kostTerpilih.scamScore}</span>
                </div>
                <div className="score-info">
                  <h4>{kostTerpilih.scamScore > 85 ? "SANGAT AMAN" : "AMAN"}</h4>
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
                {kostTerpilih.deskripsi}
              </p>
              <div className="info-boxes">
                <div className="info-box"><span>Jenis</span><strong>{kostTerpilih.tipe}</strong></div>
                <div className="info-box"><span>Kapasitas</span><strong>1 Orang</strong></div>
                <div className="info-box"><span>Ukuran</span><strong>3 × 4 m²</strong></div>
                <div className="info-box"><span>Kamar Tersedia</span><strong>Tersedia</strong></div>
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
                {kostTerpilih.hargaNum > 1000000 && (
                  <div className="fac-badge"><img src={iconAc} alt="AC" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> AC</div>
                )}
                <div className="fac-badge"><img src={iconWifi} alt="WiFi" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> WiFi</div>
                <div className="fac-badge"><img src={iconKamarMandi} alt="Kamar Mandi" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Kamar Mandi Dalam</div>
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
                <div className="cost-item"><span>Sewa kamar</span><strong>{hargaStr}/bln</strong></div>
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
                <div className="env-item"><span><img src={iconSchool} alt="Kampus" style={{ width: '16px', marginRight: '6px' }} /> Area Kampus</span><strong>± 1km</strong></div>
                <div className="env-item"><span><img src={iconMinimarket} alt="Minimarket" style={{ width: '16px', marginRight: '6px' }} /> Indomaret</span><strong>150m</strong></div>
                <div className="env-item"><span><img src={iconRestaurant} alt="Makan" style={{ width: '16px', marginRight: '6px' }} /> Warteg/Warung</span><strong>100m</strong></div>
                <div className="env-item"><span><img src={iconClinic} alt="Klinik" style={{ width: '16px', marginRight: '6px' }} /> Klinik Terdekat</span><strong>500m</strong></div>
                <div className="env-item"><span><img src={iconMedicine} alt="Apotek" style={{ width: '16px', marginRight: '6px' }} /> Apotek K-24</span><strong>300m</strong></div>
                <div className="env-item"><span><img src={iconMosque} alt="Masjid" style={{ width: '16px', marginRight: '6px' }} /> Masjid</span><strong>200m</strong></div>
                <div className="env-item"><span><img src={iconLaundry} alt="Laundry" style={{ width: '16px', marginRight: '6px' }} /> Laundry</span><strong>120m</strong></div>
                <div className="env-item"><span><img src={iconAtm} alt="ATM" style={{ width: '16px', marginRight: '6px' }} /> ATM Center</span><strong>350m</strong></div>
              </div>
            </div>

            <div className="content-card">
              <div className="card-header">
                <img src={iconReview} alt="Review" style={{ width: '20px', verticalAlign: 'middle', marginRight: '8px' }} />
                Review Penyewa
              </div>
              <div className="review-summary">
                <div className="rating-score">
                  <h2>{kostTerpilih.rating}</h2>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <img key={i} src={iconReview} alt="Star" style={{ width: '16px' }} />
                    ))}
                  </div>
                  <p>dari {kostTerpilih.ulasan} ulasan terverifikasi</p>
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
                      <span>Penyewa terverifikasi · Baru saja</span>
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
                      <span>Penyewa terverifikasi · Bulan lalu</span>
                    </div>
                    <div className="rev-stars">
                      {[...Array(4)].map((_, i) => <img key={i} src={iconReview} alt="Star" style={{ width: '14px' }} />)}
                    </div>
                  </div>
                  <p className="rev-text">"Sesuai foto, pemilik responsif. Saya suka fitur kontrak digital — jelas hitam di atas putih."</p>
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
                <span className="mulai-dari">Mulai dari</span>
                <h3>{hargaStr}</h3>
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
                Deposit {hargaStr} akan disimpan aman oleh SecuraKost Escrow. Dikembalikan otomatis jika kontrak berakhir normal.
              </div>
              <div className="owner-profile">
                <div className="owner-avatar">PM</div>
                <div className="owner-info">
                  <strong>Pemilik {kostTerpilih.nama}</strong>
                  <span>
                    <img src={iconVerifikasi} alt="Verified" style={{ width: '12px', verticalAlign: 'middle', marginRight: '4px' }} />
                    Pemilik Terverifikasi · 4 thn bergabung
                  </span>
                </div>
              </div>
              <button 
                className="btn-ajukan hide-on-mobile-action" 
                onClick={() => navigate(`/pengajuan/${id}`, { state: { durasiAwal: selectedDuration } })}
              >
                Ajukan Sewa
              </button>
              <button className="btn-chat">
                <img src={iconWhatsapp} alt="Chat" style={{ width: '16px', verticalAlign: 'middle', marginRight: '8px' }} />
                Chat Pemilik
              </button>
            </div>

            <div className="protection-card">
              <h4>Perlindungan Kamu</h4>
              <ul>
                <li><img src={iconVerifikasi} alt="Hukum" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Kontrak digital sah hukum (UU ITE)</li>
                <li><img src={iconEscrow} alt="OJK" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Deposit via escrow berlisensi OJK</li>
                <li><img src={iconLokasi} alt="Mediasi" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Mediasi tersedia jika ada sengketa</li>
                <li><img src={iconBackup} alt="Backup" style={{ width: '16px', verticalAlign: 'middle', marginRight: '6px' }} /> Backup bukti digital semua transaksi</li>
              </ul>
              <button className="btn-pelajari" onClick={() => navigate("/edukasi")}>Pelajari Hak Kamu</button>
            </div>
          </div>
        </div>
      </main>

      {/* STICKY BOTTOM BAR KHUSUS MOBILE */}
      <div className="mobile-sticky-bottom">
        <div className="mobile-price-area">
          <span className="label-mulai">Total Awal (Sewa + Deposit)</span>
          <span className="label-harga">{formatRupiah(totalAwal)}</span>
        </div>
        <button 
          className="btn-ajukan-mobile"
          onClick={() => navigate(`/pengajuan/${id}`, { state: { durasiAwal: selectedDuration } })}
        >
          Ajukan Sewa
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
              {kostTerpilih.kategoriGaleri.length > 0 ? (
                kostTerpilih.kategoriGaleri.map((kategori, index) => (
                  <div key={index} className="gallery-category-section">
                    <h4 className="category-title">{kategori.nama}</h4>
                    <div className="category-grid">
                      {kategori.foto.map((img, imgIdx) => (
                        img && (
                          <div key={imgIdx} className="modal-img-wrapper">
                            <img
                              src={img}
                              alt={`${kategori.nama} ${imgIdx + 1}`}
                              loading="lazy"
                              onClick={() => setSelectedImage(img)}
                              style={{ cursor: 'zoom-in' }}
                            />
                          </div>
                        )
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
        tour360Data={kostTerpilih.tour360Data || []}
      />

    </div>
  );
}