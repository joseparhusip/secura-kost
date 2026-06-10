import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import '../../css/dashboard.css';

export default function PenyewaAktif() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPenyewa, setSelectedPenyewa] = useState(null);

  const penyewaData = [
    {
      id: 1,
      inisial: 'SA',
      nama: 'Sari Andini',
      kamar: 'Kamar 3',
      mulai: '01 Mei 2026',
      akhir: '01 Nov 2026',
      statusLabel: 'Lunas',
      statusClass: 'status-success',
      noHp: '0812-3456-7890',
      kontakDarurat: 'Budi (Ayah) - 0812-9876-5432'
    },
    {
      id: 2,
      inisial: 'MK',
      nama: 'Maya Kusuma',
      kamar: 'Kamar 5',
      mulai: '15 Apr 2026',
      akhir: '15 Jul 2026',
      statusLabel: 'Lunas',
      statusClass: 'status-success',
      noHp: '0857-1122-3344',
      kontakDarurat: 'Sinta (Ibu) - 0857-4433-2211'
    },
    {
      id: 3,
      inisial: 'BS',
      nama: 'Budi Santoso',
      kamar: 'Kamar 1',
      mulai: '10 Jan 2026',
      akhir: '10 Jan 2027',
      statusLabel: 'Menunggu Tagihan',
      statusClass: 'status-warning',
      noHp: '0821-5566-7788',
      kontakDarurat: 'Dewi (Istri) - 0821-8877-6655'
    },
    {
      id: 4,
      inisial: 'RM',
      nama: 'Rina Melati',
      kamar: 'Kamar 2',
      mulai: '05 Jun 2026',
      akhir: '05 Des 2026',
      statusLabel: 'Lunas',
      statusClass: 'status-success',
      noHp: '0813-9900-1122',
      kontakDarurat: 'Anton (Kakak) - 0813-2211-0099'
    },
    {
      id: 5,
      inisial: 'DR',
      nama: 'Dinda Rahma',
      kamar: 'Kamar 4',
      mulai: '20 Mar 2026',
      akhir: '20 Sep 2026',
      statusLabel: 'Telat Bayar',
      statusClass: 'status-danger',
      noHp: '0819-3344-5566',
      kontakDarurat: 'Joko (Ayah) - 0819-6655-4433'
    }
  ];

  const handleDetailClick = (penyewa) => {
    setSelectedPenyewa(penyewa);
  };

  const closeModal = () => {
    setSelectedPenyewa(null);
  };

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
            <h1 className="serif-heading">Penyewa Aktif</h1>
            <p className="text-muted">Kelola data penyewa yang sedang menyewa di properti Anda.</p>
          </div>

          <div className="content-card">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Nama Penyewa</th>
                  <th>Kamar</th>
                  <th>Mulai Sewa</th>
                  <th>Berakhir Pada</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {penyewaData.map((penyewa) => (
                  <tr key={penyewa.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-initial">{penyewa.inisial}</div>
                        <span>{penyewa.nama}</span>
                      </div>
                    </td>
                    <td>{penyewa.kamar}</td>
                    <td>{penyewa.mulai}</td>
                    <td>{penyewa.akhir}</td>
                    <td><span className={`status-badge ${penyewa.statusClass}`}>{penyewa.statusLabel}</span></td>
                    <td>
                      <button
                        className="btn-action"
                        onClick={() => handleDetailClick(penyewa)}
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal Detail Penyewa */}
      {selectedPenyewa && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="serif-heading-small">Detail Penyewa</h2>
              <button className="btn-close-modal" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <p><strong>Nama Lengkap:</strong> {selectedPenyewa.nama}</p>
              <p><strong>Nomor Kamar:</strong> {selectedPenyewa.kamar}</p>
              <p><strong>Periode Sewa:</strong> {selectedPenyewa.mulai} - {selectedPenyewa.akhir}</p>
              <p><strong>Nomor HP:</strong> {selectedPenyewa.noHp}</p>
              <p><strong>Kontak Darurat:</strong> {selectedPenyewa.kontakDarurat}</p>
              <p>
                <strong>Status Pembayaran:</strong>{' '}
                <span className={`status-badge ${selectedPenyewa.statusClass}`} style={{ marginLeft: '8px' }}>
                  {selectedPenyewa.statusLabel}
                </span>
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-action-outline" onClick={closeModal}>Tutup</button>
              <button className="btn-primary">Hubungi Penyewa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}