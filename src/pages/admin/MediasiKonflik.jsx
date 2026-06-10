import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import '../../css/dashboard.css';

export default function MediasiKonflik() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  const [konfliks, setKonfliks] = useState([
    {
      id: 1,
      judul: 'Fasilitas AC Kamar 5 Rusak',
      pelapor: 'Maya Kusuma',
      waktu: '2 hari yang lalu',
      statusLabel: 'Dalam Proses Mediasi',
      statusClass: 'status-warning',
      isResolved: false,
      chat: [
        { sender: 'Maya Kusuma', date: '08 Jun 2026, 09:00', text: 'Permisi Bu, AC di kamar saya sejak semalam tidak dingin dan meneteskan air.', isAdmin: false },
        { sender: 'Bu Wati', date: '08 Jun 2026, 10:15', text: 'Baik Mba Maya, siang ini saya panggilkan tukang service AC ya.', isAdmin: true }
      ]
    },
    {
      id: 2,
      judul: 'Kebisingan Larut Malam',
      pelapor: 'Rina Melati',
      waktu: '5 hari yang lalu',
      statusLabel: 'Menunggu Tanggapan',
      statusClass: 'status-warning',
      isResolved: false,
      chat: [
        { sender: 'Rina Melati', date: '05 Jun 2026, 01:30', text: 'Bu, maaf mengganggu malam-malam. Penghuni kamar 3 menyalakan musik keras sekali.', isAdmin: false }
      ]
    },
    {
      id: 3,
      judul: 'Keterlambatan Pembayaran Air',
      pelapor: 'Anda',
      waktu: '1 bulan yang lalu',
      statusLabel: 'Selesai',
      statusClass: 'status-success',
      isResolved: true,
      chat: [
        { sender: 'Bu Wati', date: '10 Mei 2026, 08:00', text: 'Mengingatkan untuk pembayaran iuran air bulan ini ya.', isAdmin: true },
        { sender: 'Penyewa', date: '11 Mei 2026, 14:00', text: 'Sudah saya transfer ya Bu, mohon dicek. Maaf terlambat.', isAdmin: false }
      ]
    },
    {
      id: 4,
      judul: 'Kunci Kamar Patah',
      pelapor: 'Sari Andini',
      waktu: '1 minggu yang lalu',
      statusLabel: 'Selesai',
      statusClass: 'status-success',
      isResolved: true,
      chat: [
        { sender: 'Sari Andini', date: '03 Jun 2026, 16:20', text: 'Bu, kunci kamar saya patah di dalam lubang kunci.', isAdmin: false },
        { sender: 'Bu Wati', date: '03 Jun 2026, 16:30', text: 'Oke, saya minta tolong penjaga kos untuk membongkar dan mengganti silindernya ya.', isAdmin: true }
      ]
    },
    {
      id: 5,
      judul: 'Deposit Belum Cair',
      pelapor: 'Dinda Rahma',
      waktu: '2 minggu yang lalu',
      statusLabel: 'Selesai',
      statusClass: 'status-success',
      isResolved: true,
      chat: [
        { sender: 'Dinda Rahma', date: '27 Mei 2026, 10:00', text: 'Bu, saya sudah pindah sejak tanggal 25. Kapan deposit saya dikembalikan?', isAdmin: false },
        { sender: 'Bu Wati', date: '27 Mei 2026, 13:00', text: 'Deposit sudah ditransfer ke rekening BCA yang terdaftar ya Mba. Silakan dicek.', isAdmin: true }
      ]
    }
  ]);

  const [selectedConflict, setSelectedConflict] = useState(null);

  const handleOpenModal = (konflik) => {
    setSelectedConflict(konflik);
  };

  const closeModal = () => {
    setSelectedConflict(null);
    setNewMessage('');
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const timestamp = `${dateStr}, ${timeStr}`;

    const newChatObject = {
      sender: 'Bu Wati',
      date: timestamp,
      text: newMessage,
      isAdmin: true
    };

    const updatedConflict = {
      ...selectedConflict,
      chat: [...selectedConflict.chat, newChatObject]
    };
    setSelectedConflict(updatedConflict);
    setKonfliks(konfliks.map(k => k.id === updatedConflict.id ? updatedConflict : k));
    setNewMessage('');
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
            <div className="header-with-action">
              <div>
                <h1 className="serif-heading">Mediasi Konflik</h1>
                <p className="text-muted">Pusat resolusi sengketa dan laporan kendala penyewa.</p>
              </div>
              <button className="btn-primary">Buat Laporan Baru</button>
            </div>
          </div>

          <div className="conflict-list">
            {konfliks.map((konflik) => (
              <div key={konflik.id} className={`conflict-card ${konflik.isResolved ? 'resolved' : ''}`}>
                <div className="conflict-card-left">
                  <div className={konflik.isResolved ? 'icon-success' : 'icon-warning'}>
                    {konflik.isResolved ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    ) : (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    )}
                  </div>
                  <div className="conflict-info">
                    <h4>{konflik.judul}</h4>
                    <p>Dilaporkan oleh: {konflik.pelapor} · {konflik.waktu}</p>
                  </div>
                </div>
                <div className="conflict-card-right">
                  <span className={`status-badge ${konflik.statusClass}`}>{konflik.statusLabel}</span>
                  <button
                    className={konflik.isResolved ? 'btn-action-outline' : 'btn-action'}
                    onClick={() => handleOpenModal(konflik)}
                  >
                    {konflik.isResolved ? 'Riwayat' : 'Lihat Diskusi'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Modal Diskusi / Riwayat */}
      {selectedConflict && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="serif-heading-small">
                {selectedConflict.isResolved ? 'Riwayat Resolusi' : 'Ruang Diskusi'}
              </h2>
              <button className="btn-close-modal" onClick={closeModal}>&times;</button>
            </div>

            <div className="modal-body">
              <p><strong>Kasus:</strong> {selectedConflict.judul}</p>
              <p>
                <strong>Status:</strong>{' '}
                <span className={`status-badge ${selectedConflict.statusClass}`} style={{ marginLeft: '4px' }}>
                  {selectedConflict.statusLabel}
                </span>
              </p>

              <div className="chat-box">
                {selectedConflict.chat.map((msg, index) => (
                  <div key={index} className={`chat-bubble ${msg.isAdmin ? 'admin' : ''}`}>
                    <span className="chat-date">{msg.sender} · {msg.date}</span>
                    {msg.text}
                  </div>
                ))}
              </div>
            </div>

            {!selectedConflict.isResolved && (
              <div className="chat-input-container">
                <input
                  type="text"
                  className="chat-input"
                  placeholder="Ketik balasan untuk penyewa..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button className="btn-primary" onClick={handleSendMessage}>Kirim</button>
              </div>
            )}

            {selectedConflict.isResolved && (
              <div className="modal-footer">
                <button className="btn-action-outline" onClick={closeModal}>Tutup</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}