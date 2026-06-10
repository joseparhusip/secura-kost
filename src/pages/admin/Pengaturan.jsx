import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import '../../css/dashboard.css';

export default function Pengaturan() {
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
          <button className="btn-switch-role" onClick={() => navigate('/search')}>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
            </svg>
            Ganti ke Pencari Kost
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

        <main className="admin-main">
          <div className="page-header-box">
            <h1 className="serif-heading">Pengaturan Akun</h1>
            <p className="text-muted">Kelola informasi profil dan keamanan akun Anda di sini.</p>
          </div>

          {/* Section Profil */}
          <div className="settings-section">
            <h3>Informasi Profil</h3>
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label>Nama Lengkap</label>
                  <input type="text" className="form-control" defaultValue="Bu Wati" placeholder="Masukkan nama lengkap" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" className="form-control" defaultValue="buwati@securakost.com" placeholder="Masukkan email" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nomor Telepon</label>
                  <input type="tel" className="form-control" defaultValue="081234567890" placeholder="Masukkan nomor telepon" />
                </div>
                <div className="form-group">
                  <label>Pekerjaan / Instansi</label>
                  <input type="text" className="form-control" defaultValue="Wiraswasta" placeholder="Pekerjaan Anda" />
                </div>
              </div>

              <div className="form-group">
                <label>Alamat Domisili</label>
                <textarea className="form-control" rows="3" placeholder="Masukkan alamat lengkap Anda">
                  Jl. Cihampelas No. 42, Bandung, Jawa Barat
                </textarea>
              </div>

              <div className="settings-actions">
                <button type="button" className="btn-action-outline">Batal</button>
                <button type="submit" className="btn-primary">Simpan Perubahan</button>
              </div>
            </form>
          </div>

          {/* Section Keamanan */}
          <div className="settings-section">
            <h3>Keamanan Kata Sandi</h3>
            <form>
              <div className="form-group">
                <label>Kata Sandi Saat Ini</label>
                <input type="password" className="form-control" placeholder="Masukkan kata sandi lama" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kata Sandi Baru</label>
                  <input type="password" className="form-control" placeholder="Masukkan kata sandi baru" />
                </div>
                <div className="form-group">
                  <label>Konfirmasi Kata Sandi Baru</label>
                  <input type="password" className="form-control" placeholder="Ketik ulang kata sandi baru" />
                </div>
              </div>

              <div className="settings-actions">
                <button type="submit" className="btn-primary">Perbarui Kata Sandi</button>
              </div>
            </form>
          </div>

        </main>
      </div>
    </div>
  );
}