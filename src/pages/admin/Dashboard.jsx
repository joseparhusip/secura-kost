import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logika logout bisa ditambahkan di sini
    navigate('/');
  };

  return (
    <div className="admin-layout">
      {/* NAVBAR: Sticky Top */}
      <nav className="admin-navbar">
        <div className="admin-navbar__brand" onClick={() => navigate('/')}>
          Secura<span>Kost</span>
        </div>
        <div className="admin-navbar__right">
          <button className="btn-switch-role" onClick={() => navigate('/search')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Lihat sebagai Penyewa
          </button>
          <div className="admin-profile">
            <div className="admin-avatar">WS</div>
            <span className="admin-name">Bu Wati</span>
          </div>
        </div>
      </nav>

      <div className="admin-container">
        {/* SIDEBAR */}
        <aside className="admin-sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-item active">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Overview
            </button>
            <button className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Kost Saya
            </button>
            <button className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Tambah Kost
            </button>
            <button className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              Penyewa Aktif
            </button>
            <button className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Kontrak Digital
            </button>
            <button className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              Escrow & Deposit
            </button>
            <button className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              Mediasi Konflik
            </button>
          </div>
          
          <hr className="sidebar-divider" />
          
          <div className="sidebar-menu">
            <button className="sidebar-item" onClick={() => navigate('/edukasi')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
              Edukasi Hukum
            </button>
            <button className="sidebar-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              Pengaturan
            </button>
            <button className="sidebar-item logout" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              Keluar
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="admin-main">
          <div className="admin-header">
            <h1>Selamat Datang, Bu Wati 👋</h1>
            <p>Kelola kost Anda dengan mudah dan aman di SecuraKost</p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <h3>3</h3>
              <p>Kamar Terisi</p>
              <span className="stat-trend">+1 bulan ini</span>
            </div>
            <div className="stat-card">
              <h3>Rp 3.6Jt</h3>
              <p>Pendapatan Bulan Ini</p>
              <span className="stat-trend">+Rp 500K</span>
            </div>
            <div className="stat-card">
              <h3>2</h3>
              <p>Pengajuan Pending</p>
              <span className="stat-trend neutral">Perlu ditinjau</span>
            </div>
            <div className="stat-card">
              <h3>4.8 ⭐</h3>
              <p>Rating Kost</p>
              <span className="stat-trend">Sangat Baik</span>
            </div>
          </div>

          <div className="content-grid">
            {/* Kolom Kiri: Pengajuan Terbaru */}
            <div className="dashboard-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2E504A" strokeWidth="2" width="20"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <h2>Pengajuan Terbaru</h2>
              </div>
              <div className="application-list">
                <div className="application-item">
                  <div className="app-info">
                    <h4>Sari Andini</h4>
                    <p>Kamar 3 · 1 bulan</p>
                  </div>
                  <div className="app-actions">
                    <button className="btn-accept">✓ Terima</button>
                    <button className="btn-reject">✕</button>
                  </div>
                </div>
                <div className="application-item">
                  <div className="app-info">
                    <h4>Maya Kusuma</h4>
                    <p>Kamar 5 · 3 bulan</p>
                  </div>
                  <div className="app-actions">
                    <button className="btn-accept">✓ Terima</button>
                    <button className="btn-reject">✕</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Kolom Kanan: Status Escrow */}
            <div className="dashboard-card">
              <div className="card-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="#2E504A" strokeWidth="2" width="20"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <h2>Status Escrow</h2>
              </div>
              <div className="escrow-box">
                <p className="escrow-label">Dana tersimpan</p>
                <h3 className="escrow-amount">Rp 3.600.000</h3>
                <p className="escrow-desc">3 deposit aktif</p>
              </div>
              <div className="escrow-notice">
                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" width="16"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <p>Semua deposit aman di rekening escrow berlisensi OJK. Dana cair otomatis sesuai jadwal kontrak.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}