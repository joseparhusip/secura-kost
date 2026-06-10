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

// ── KOMPONEN AUTO SCROLL (VERSI SUPER PINTAR) ──
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
      </Routes>
    </Router>
  )
}