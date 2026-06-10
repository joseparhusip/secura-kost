import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import '../../css/dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* NAVBAR */}
      <nav className="admin-navbar">
        {/* Hamburger — hanya tampil di mobile via CSS */}
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Buka menu"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

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
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* MAIN CONTENT */}
        <main className="admin-main">
          <div className="admin-header">
            <h1 className="serif-heading">Selamat Datang, Bu Wati 👋</h1>
            <p>Kelola kost Anda dengan mudah dan aman di SecuraKost</p>
          </div>

          {/* STATS GRID */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="serif-text text-green">3</h3>
              <p>Kamar Terisi</p>
              <span className="stat-trend">+1 bulan ini</span>
            </div>
            <div className="stat-card">
              <h3 className="serif-text text-orange">Rp 3.6Jt</h3>
              <p>Pendapatan Bulan Ini</p>
              <span className="stat-trend">+Rp 500K</span>
            </div>
            <div className="stat-card">
              <h3 className="serif-text text-blue">2</h3>
              <p>Pengajuan Pending</p>
              <span className="stat-trend neutral">Perlu ditinjau</span>
            </div>
            <div className="stat-card">
              <h3 className="serif-text text-gold">4.8 ⭐</h3>
              <p>Rating Kost</p>
              <span className="stat-trend text-green">Sangat Baik</span>
            </div>
          </div>

          {/* CONTENT GRID */}
          <div className="content-grid">

            {/* KARTU KIRI: PENGAJUAN TERBARU */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="serif-heading">📋 Pengajuan Terbaru</h2>
              </div>
              <div className="application-list">
                <div className="application-item">
                  <div className="app-info">
                    <h4>Sari Andini</h4>
                    <p>Kamar 3 - 1 bulan</p>
                  </div>
                  <div className="app-actions">
                    <button className="btn-accept">✓ Terima</button>
                    <button className="btn-reject">✕</button>
                  </div>
                </div>
                <div className="application-item">
                  <div className="app-info">
                    <h4>Maya Kusuma</h4>
                    <p>Kamar 5 - 3 bulan</p>
                  </div>
                  <div className="app-actions">
                    <button className="btn-accept">✓ Terima</button>
                    <button className="btn-reject">✕</button>
                  </div>
                </div>
              </div>
            </div>

            {/* KARTU KANAN: STATUS ESCROW */}
            <div className="dashboard-card">
              <div className="card-header">
                <h2 className="serif-heading">🏛️ Status Escrow</h2>
              </div>
              <div className="escrow-box">
                <div className="escrow-label">Dana tersimpan</div>
                <div className="escrow-amount serif-text text-green">Rp 3.600.000</div>
                <div className="escrow-desc">3 deposit aktif</div>
              </div>
              <div className="escrow-notice">
                <span className="notice-icon">✅</span>
                <p>Semua deposit aman di rekening escrow berlisensi OJK. Dana cair otomatis sesuai jadwal kontrak.</p>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}