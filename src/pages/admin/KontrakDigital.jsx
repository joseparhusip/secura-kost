import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import '../../css/dashboard.css';

export default function KontrakDigital() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-layout">
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
        <main className="admin-main">
          <div className="page-header-box">
            <h1 className="serif-heading">Kontrak Digital</h1>
            <p className="text-muted">Arsip dokumen perjanjian sewa sah hukum sesuai UU ITE.</p>
          </div>

          <div className="content-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID Kontrak</th>
                  <th>Penyewa</th>
                  <th>Properti</th>
                  <th>Tanggal TTD</th>
                  <th>Status</th>
                  <th>Dokumen</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="fw-600">#CTR-9921</td>
                  <td>Sari Andini</td>
                  <td>Kost Putri Melati - Kmr 3</td>
                  <td>28 Apr 2026</td>
                  <td><span className="status-badge status-success">Aktif</span></td>
                  <td>
                    <button className="btn-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Unduh PDF
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="fw-600">#CTR-9804</td>
                  <td>Maya Kusuma</td>
                  <td>Kost Putri Melati - Kmr 5</td>
                  <td>12 Apr 2026</td>
                  <td><span className="status-badge status-success">Aktif</span></td>
                  <td>
                    <button className="btn-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Unduh PDF
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="fw-600">#CTR-9102</td>
                  <td>Budi Santoso</td>
                  <td>Kost Putri Melati - Kmr 1</td>
                  <td>08 Jan 2026</td>
                  <td><span className="status-badge status-success">Aktif</span></td>
                  <td>
                    <button className="btn-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Unduh PDF
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="fw-600">#CTR-9945</td>
                  <td>Rina Melati</td>
                  <td>Kost Putri Melati - Kmr 2</td>
                  <td>02 Jun 2026</td>
                  <td><span className="status-badge status-success">Aktif</span></td>
                  <td>
                    <button className="btn-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Unduh PDF
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="fw-600">#CTR-8832</td>
                  <td>Dinda Rahma</td>
                  <td>Kost Putri Melati - Kmr 4</td>
                  <td>18 Mar 2026</td>
                  <td><span className="status-badge status-warning">Berakhir</span></td>
                  <td>
                    <button className="btn-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
                      </svg>
                      Unduh PDF
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}