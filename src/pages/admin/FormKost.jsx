import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import '../../css/dashboard.css';
import '../../css/kost.css';

export default function KostSaya() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
      {/* NAVBAR */}
      <nav className="admin-navbar">
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
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
        <Sidebar
          isOpen={sidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* MAIN CONTENT */}
        <main className="admin-main">

          {/* HEADER KOST SAYA */}
          <div className="kost-page-header">
            <div className="header-icon-wrapper">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 10L12 3L21 10V21H3V10Z" fill="#e5ad8c" stroke="#c97a63" strokeWidth="2" strokeLinejoin="round" />
                <path d="M9 21V12H15V21" fill="#4a7c6f" stroke="#2e504a" strokeWidth="2" strokeLinejoin="round" />
                <rect x="15" y="14" width="4" height="3" fill="#8cb8a8" />
                <rect x="5" y="14" width="4" height="3" fill="#8cb8a8" />
              </svg>
            </div>
            <h1 className="serif-heading">Kost Saya</h1>
          </div>

          {/* CONTAINER PUTIH UTAMA */}
          <div className="kost-main-wrapper">

            {/* ITEM KOST */}
            <div className="kost-list-item">
              <div className="kost-item-left">
                <div className="kost-thumbnail">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 10L12 3L21 10V21H3V10Z" fill="#e5ad8c" stroke="#c97a63" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M9 21V12H15V21" fill="#4a7c6f" stroke="#2e504a" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="kost-info">
                  <h3>Kost Putri Melati</h3>
                  <p>Jl. Cihampelas No. 42, Bandung · 5 kamar</p>
                </div>
              </div>
              <div className="kost-item-right">
                <div className="badge-verified">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  Terverifikasi
                </div>
                <button className="btn-edit" onClick={() => navigate('/edit-kost/1')}>Edit</button>
                <button className="btn-view" onClick={() => navigate('/lihat-kost/1')}>Lihat</button>
              </div>
            </div>

            {/* TOMBOL TAMBAH KOST */}
            <button className="btn-tambah-kost" onClick={() => navigate('/tambah-kost')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Tambah Kost Baru
            </button>

          </div>
        </main>
      </div>
    </div>
  );
}