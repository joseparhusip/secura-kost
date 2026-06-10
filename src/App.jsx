import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import '../src/css/style.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import SearchKost from './pages/SearchKost'
import DetailKost from './pages/DetailKost'
import EdukasiHukum from './pages/EdukasiHukum'
import PengajuanSewa from './pages/PengajuanSewa'

// Import halaman admin
import Dashboard from './pages/admin/Dashboard'
import KostSaya from './pages/admin/KostSaya'
import FormKost from './pages/admin/FormKost'
import PenyewaAktif from './pages/admin/PenyewaAktif'
import KontrakDigital from './pages/admin/KontrakDigital'
import EscrowDeposit from './pages/admin/EscrowDeposit'
import MediasiKonflik from './pages/admin/MediasiKonflik'
import Pengaturan from './pages/admin/Pengaturan'

// IMPORT HALAMAN LIHAT KOST BARU
// (Asumsi kamu menyimpan LihatKost.jsx di dalam folder admin)
import LihatKost from './pages/admin/LihatKost'

// KOMPONEN AUTO SCROLL (VERSI SUPER PINTAR)
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // 1. JIKA ada titipan pesan untuk form Auth (Masuk/Daftar), hentikan scroll!
    if (location.state && location.state.scrollToAuth) {
      return; 
    }

    // 2. JIKA URL memiliki hash (misal /#solusi atau /#cara-kerja)
    if (location.hash) {
      // Ambil nama ID-nya (hilangkan tanda '#', jadi 'solusi')
      const id = location.hash.replace('#', '');
      
      // Beri jeda 100ms agar halaman Home selesai di-render, lalu scroll halus!
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // 3. Kalau navigasi pindah page biasa, baru tarik layar ke paling atas (Carousel)
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.state, location.hash]);

  return null;
}

export default function App() {
  return (
    <Router>
      {/* Pasang ScrollToTop pintar kita di sini */}
      <ScrollToTop />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main><Home /></main>
              <Footer />
            </>
          }
        />
        <Route
          path="/search"
          element={<main><SearchKost /></main>}
        />
        <Route
          path="/detail/:id"
          element={<main><DetailKost /></main>}
        />
        <Route
          path="/edukasi"
          element={<EdukasiHukum />}
        />
        <Route
          path="/pengajuan/:id"
          element={<PengajuanSewa />}
        />
        
        {/* ROUTE KHUSUS DASHBOARD PEMILIK KOST */}
        {/* Rute ini tidak memakai Navbar & Footer umum karena sudah punya layout mandiri */}
        <Route
          path="/pemilik-kost"
          element={<Dashboard />}
        />
        <Route
          path="/kost-saya"
          element={<KostSaya />}
        />

        {/* ROUTE LIHAT KOST YANG BARU DITAMBAHKAN */}
        <Route
          path="/lihat-kost/:id"
          element={<LihatKost />}
        />

        <Route
          path="/tambah-kost"
          element={<FormKost isEdit={false} />}
        />
        <Route
          path="/edit-kost/:id"
          element={<FormKost isEdit={true} />}
        />
        <Route
          path="/penyewa-aktif"
          element={<PenyewaAktif />}
        />
        <Route
          path="/kontrak-digital"
          element={<KontrakDigital />}
        />
        <Route
          path="/escrow-deposit"
          element={<EscrowDeposit />}
        />
        <Route
          path="/mediasi-konflik"
          element={<MediasiKonflik />}
        />
        
        {/* TAMBAHKAN ROUTE PENGATURAN DI SINI */}
        <Route
          path="/pengaturan"
          element={<Pengaturan />}
        />
      </Routes>
    </Router>
  )
}