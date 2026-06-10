import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import '../../css/dashboard.css';

export default function EscrowDeposit() {
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
            <h1 className="serif-heading">Escrow &amp; Deposit</h1>
            <p className="text-muted">Pantau dana jaminan penyewa yang diamankan di rekening pihak ketiga.</p>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <span className="summary-label">Total Dana Ditahan (Escrow)</span>
              <h2 className="serif-heading text-green">Rp 4.800.000</h2>
            </div>
            <div className="summary-card">
              <span className="summary-label">Deposit Aktif</span>
              <h2 className="serif-heading">4 Penyewa</h2>
            </div>
          </div>

          <div className="content-card">
            <div className="card-header-inner">
              <h3 className="serif-heading-small">Riwayat Deposit</h3>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama Penyewa</th>
                  <th>Kamar</th>
                  <th>Nominal</th>
                  <th>Status Dana</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Sari Andini</td>
                  <td>Kamar 3</td>
                  <td className="fw-600">Rp 1.200.000</td>
                  <td><span className="status-badge status-warning">Ditahan di Escrow</span></td>
                  <td><button className="btn-action-outline">Ajukan Klaim</button></td>
                </tr>
                <tr>
                  <td>Maya Kusuma</td>
                  <td>Kamar 5</td>
                  <td className="fw-600">Rp 1.200.000</td>
                  <td><span className="status-badge status-warning">Ditahan di Escrow</span></td>
                  <td><button className="btn-action-outline">Ajukan Klaim</button></td>
                </tr>
                <tr>
                  <td>Budi Santoso</td>
                  <td>Kamar 1</td>
                  <td className="fw-600">Rp 1.200.000</td>
                  <td><span className="status-badge status-warning">Ditahan di Escrow</span></td>
                  <td><button className="btn-action-outline">Ajukan Klaim</button></td>
                </tr>
                <tr>
                  <td>Rina Melati</td>
                  <td>Kamar 2</td>
                  <td className="fw-600">Rp 1.200.000</td>
                  <td><span className="status-badge status-warning">Ditahan di Escrow</span></td>
                  <td><button className="btn-action-outline">Ajukan Klaim</button></td>
                </tr>
                <tr>
                  <td>Dinda Rahma (Keluar)</td>
                  <td>Kamar 4</td>
                  <td className="fw-600">Rp 1.200.000</td>
                  <td><span className="status-badge status-success">Dikembalikan ke Penyewa</span></td>
                  <td><button className="btn-action disabled" disabled>Selesai</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}