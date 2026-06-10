import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import '../css/pengajuan.css';

function SignaturePadModal({ onClose, onConfirm }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const lastPos = useRef(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const [canvasSize, setCanvasSize] = useState({ width: 680, height: 260 });

  useEffect(() => {
    if (wrapperRef.current) {
      setCanvasSize({
        width: wrapperRef.current.offsetWidth,
        height: wrapperRef.current.offsetHeight
      });
    }
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if (e.touches) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = useCallback((e) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getPos(e, canvasRef.current);
  }, []);

  const draw = useCallback((e) => {
    e.preventDefault();
    if (!isDrawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = '#1A2B4C';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    lastPos.current = pos;
    setIsEmpty(false);
  }, []);

  const stopDraw = useCallback(() => {
    isDrawing.current = false;
    lastPos.current = null;
  }, []);

  const handleClear = () => {
    const canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
  };

  const handleConfirm = () => {
    onConfirm(canvasRef.current.toDataURL('image/png'));
  };

  return (
    <div className="sig-overlay" onClick={onClose}>
      <div className="sig-modal" onClick={e => e.stopPropagation()}>
        <div className="sig-modal-header">
          <div>
            <div className="sig-modal-title">Tanda Tangan Digital</div>
            <div className="sig-modal-sub">Gunakan mouse di laptop, atau jari di HP / tablet</div>
          </div>
          <button className="sig-close-btn" onClick={onClose}>
            X
          </button>
        </div>

        <div className="sig-canvas-wrapper" ref={wrapperRef}>
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="sig-canvas"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
          {isEmpty && (
            <div className="sig-placeholder">
              <span>Tanda tangan di sini</span>
            </div>
          )}
        </div>

        <div className="sig-modal-footer">
          <button className="sig-btn-clear" onClick={handleClear}>Hapus</button>
          <button className="sig-btn-confirm" onClick={handleConfirm} disabled={isEmpty}>
            Konfirmasi Tanda Tangan
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PengajuanSewa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const durasiDariDetail = location.state?.durasiAwal || 1;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    nama: '',
    nik: '',
    email: '',
    hp: '',
    pekerjaan: 'Mahasiswa',
    asalKota: '',
    alasanMenyewa: '',
    durasi: durasiDariDetail,
    tanggalMulai: '',
    setujuKontrak: false,
    metodeBayar: 'Manual'
  });

  const [showSigModal, setShowSigModal] = useState(false);
  const [signatureImg, setSignatureImg] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  const baseHarga = 1200000;
  const biayaKebersihanPerBulan = 50000;
  const deposit = baseHarga;
  const totalSewa = baseHarga * formData.durasi;
  const totalKebersihan = biayaKebersihanPerBulan * formData.durasi;
  const totalBayar = totalSewa + deposit + totalKebersihan;

  const formatRupiah = (number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const nextStep = () => { if (currentStep < 4) setCurrentStep(s => s + 1); };
  const prevStep = () => { if (currentStep > 1) setCurrentStep(s => s - 1); else navigate(-1); };

  const handleSubmit = () => {
    setShowSuccessModal(true);
  };

  const handleKembaliPencarian = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const steps = [
    { id: 1, label: 'Data Penyewa',    sub: 'Identitas diri' },
    { id: 2, label: 'Durasi & Harga',  sub: 'Pilih periode sewa' },
    { id: 3, label: 'Kontrak Digital', sub: 'Tanda tangan sah' },
    { id: 4, label: 'Pembayaran',      sub: 'Via escrow aman' }
  ];

  return (
    <div className="pengajuan-page">
      {showSigModal && (
        <SignaturePadModal
          onClose={() => setShowSigModal(false)}
          onConfirm={(img) => { setSignatureImg(img); setShowSigModal(false); }}
        />
      )}

      {showSuccessModal && (
        <div className="sig-overlay" style={{ zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="sig-modal" style={{ maxWidth: '450px', padding: '30px', textAlign: 'center', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>Pengajuan Berhasil!</h3>
              <button onClick={() => setShowSuccessModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                X
              </button>
            </div>
            
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>Sewa Diajukan!</h2>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
              Kontrak digital telah dikirim ke kedua pihak. Pembayaran akan diproses melalui escrow SecuraKost yang aman.
            </p>

            <div style={{ background: '#F4F7F4', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Langkah Selanjutnya:</h4>
              <ol style={{ margin: 0, paddingLeft: '18px', color: '#444', fontSize: '13px', lineHeight: '1.8' }}>
                <li>Kontrak digital dikirim ke WhatsApp & email kamu</li>
                <li>Lakukan pembayaran via Virtual Account dalam 1x24 jam</li>
                <li>Pemilik akan mengkonfirmasi setelah pembayaran diterima escrow</li>
                <li>Selamat datang di Kost Putri Melati!</li>
              </ol>
            </div>

            <button 
              onClick={handleKembaliPencarian}
              style={{ width: '100%', padding: '14px', background: '#3D7B5C', color: '#FFF', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Kembali ke Pencarian
            </button>
          </div>
        </div>
      )}

      <div className="pengajuan-header-top">
        Pengajuan Sewa · Kost Putri Melati · SecuraKost Platform
      </div>

      <div className="pengajuan-container">
        <div className="pengajuan-title">
          <h1>Ajukan Sewa Kost</h1>
          <p>Proses dilindungi kontrak digital &amp; escrow deposit SecuraKost</p>
        </div>

        <div className="stepper-container">
          {steps.map((step) => {
            const isActive    = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            return (
              <div key={step.id} className={`stepper-item${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}>
                <div className="step-circle">
                  {isCompleted ? '✓' : step.id}
                </div>
                <div className="step-text">
                  <div className="step-label">{step.label}</div>
                  <div className="step-sublabel">{step.sub}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pengajuan-content-split">
          <div className="form-section">

            {currentStep === 1 && (
              <div className="form-card">
                <div className="card-heading">Data Penyewa</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Nama Lengkap (sesuai KTP)</label>
                    <input type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="Misal: Sari Andini" />
                  </div>
                  <div className="form-group">
                    <label>NIK / Nomor KTP</label>
                    <input type="text" name="nik" value={formData.nik} onChange={handleInputChange} placeholder="3201xxxxxxxxxxxx" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="sari@email.com" />
                  </div>
                  <div className="form-group">
                    <label>Nomor HP / WhatsApp</label>
                    <input type="text" name="hp" value={formData.hp} onChange={handleInputChange} placeholder="+62 812 3456 789" />
                  </div>
                  <div className="form-group">
                    <label>Pekerjaan</label>
                    <select name="pekerjaan" value={formData.pekerjaan} onChange={handleInputChange}>
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Karyawan">Karyawan</option>
                      <option value="Wirausaha">Wirausaha</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Asal Kota</label>
                    <input type="text" name="asalKota" value={formData.asalKota} onChange={handleInputChange} placeholder="Jakarta, Bandung..." />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: '16px' }}>
                  <label style={{ color: '#2b3f6c' }}>Alasan Menyewa (opsional)</label>
                  <textarea 
                    name="alasanMenyewa" 
                    value={formData.alasanMenyewa} 
                    onChange={handleInputChange} 
                    placeholder="Ceritakan keperluan pindah kost kamu..."
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-action flex-between">
                  <div></div>
                  <button className="btn-next" onClick={nextStep}>
                    Lanjut: Durasi &amp; Harga
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="form-card">
                <div className="card-heading">Durasi &amp; Rincian Harga</div>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Tanggal Mulai Sewa</label>
                    <input type="date" name="tanggalMulai" value={formData.tanggalMulai} onChange={handleInputChange} />
                  </div>
                  <div className="form-group">
                    <label>Durasi Sewa</label>
                    <select name="durasi" value={formData.durasi} onChange={handleInputChange}>
                      <option value={1}>1 bulan — Rp 1.200.000</option>
                      <option value={3}>3 bulan — Rp 3.600.000</option>
                      <option value={6}>6 bulan — Rp 7.200.000</option>
                      <option value={12}>1 Tahun — Rp 14.400.000</option>
                    </select>
                  </div>
                </div>
                <div className="rincian-box">
                  <div className="rincian-title">Rincian Pembayaran</div>
                  <div className="r-row"><span>Sewa {formData.durasi} bulan</span><span>{formatRupiah(totalSewa)}</span></div>
                  <div className="r-row"><span>Deposit (escrow, bisa diklaim kembali)</span><span>{formatRupiah(deposit)}</span></div>
                  <div className="r-row"><span>Biaya kebersihan</span><span>{formatRupiah(totalKebersihan)}</span></div>
                  <div className="r-divider" />
                  <div className="r-row r-total"><span>Total Bayar</span><span>{formatRupiah(totalBayar)}</span></div>
                </div>
                <div className="info-escrow-box">
                  <strong style={{ fontWeight: 'bold' }}>Sistem Escrow:</strong> Deposit {formatRupiah(deposit)} disimpan aman oleh SecuraKost Escrow (mitra OJK). Pemilik hanya menerima dana setelah kontrak normal berakhir dan tidak ada klaim kerusakan.
                </div>
                <div className="form-action flex-between">
                  <button className="btn-prev" onClick={prevStep}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
                    Kembali
                  </button>
                  <button className="btn-next" onClick={nextStep}>
                    Lanjut: Kontrak Digital
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="form-card">
                <div className="card-heading">Kontrak Digital Sah Hukum</div>

                <div className="legal-notice">
                  Kontrak ini sah secara hukum berdasarkan <i>UU ITE No. 11/2008 Jo. No. 19/2016</i> dan <i>KUH Perdata</i>. Tanda tangan digital Anda memiliki kekuatan hukum yang sama dengan tanda tangan basah.
                </div>

                <div className="contract-box">
                  <div className="contract-header">
                    PERJANJIAN SEWA KOST
                    <span>No. SKT/2026/BDG/00342 — SecuraKost Platform</span>
                  </div>
                  <div className="contract-body">
                    <h4>Pihak-Pihak yang Terlibat</h4>
                    <p><b style={{ fontWeight: 'bold' }}>Pihak Pertama (Pemilik):</b> Wati Santoso (ID Terverifikasi: OWN-0023), pemilik sah Kost Putri Melati, Jl. Cihampelas No. 42, Bandung.</p>
                    <p><b style={{ fontWeight: 'bold' }}>Pihak Kedua (Penyewa):</b> {formData.nama || '[Nama Penyewa]'}, penyewa yang telah terverifikasi identitasnya oleh SecuraKost.</p>
                    
                    <h4>Objek Sewa</h4>
                    <p>Kamar kost di Kost Putri Melati, Jl. Cihampelas No. 42, Bandung Utara. Tipe kamar: Standard, ukuran 3×4m², kamar mandi dalam, AC, WiFi.</p>
                    
                    <h4>Ketentuan Sewa</h4>
                    <p>1. Durasi sewa: {formData.durasi} bulan, dimulai tanggal {formData.tanggalMulai || '[TANGGAL_MULAI]'} hingga masa sewa berakhir. Dapat diperpanjang dengan pemberitahuan minimum 7 hari sebelum berakhir.</p>
                    <p>2. Harga sewa: {formatRupiah(baseHarga)} per bulan, dibayar paling lambat tanggal 5 setiap bulannya.</p>
                    <p>3. Deposit: {formatRupiah(deposit)} disimpan melalui sistem Escrow SecuraKost dan dikembalikan maksimal 14 hari setelah masa sewa berakhir, dikurangi denda kerusakan jika ada.</p>

                    <h4>Hak dan Kewajiban Penyewa</h4>
                    <p>Penyewa berhak mendapat hunian sesuai deskripsi, menggunakan fasilitas yang tersedia, dan mendapat perlindungan hukum melalui mediasi SecuraKost.</p>

                    <h4>Hak dan Kewajiban Pemilik</h4>
                    <p>Pemilik wajib menyediakan hunian sesuai deskripsi yang terverifikasi, menjaga fasilitas dalam kondisi baik, dan mengembalikan deposit sesuai ketentuan.</p>

                    <h4>Penyelesaian Sengketa</h4>
                    <p>Segala sengketa diselesaikan melalui mediasi SecuraKost terlebih dahulu. Jika tidak tercapai kesepakatan dalam 14 hari, dapat dibawa ke jalur hukum sesuai hukum yang berlaku di Indonesia.</p>
                  </div>

                  <div className="signature-area">
                    <p>Tanda tangan digital Penyewa:</p>
                    {signatureImg ? (
                      <div className="sign-preview-wrapper">
                        <img src={signatureImg} alt="Tanda Tangan" className="sign-preview-img" />
                        <div className="sign-preview-label">
                          <span className="sign-verified-badge">Tanda tangan tersimpan</span>
                          <button className="sign-redo-btn" onClick={() => setSignatureImg(null)}>Ulangi</button>
                        </div>
                      </div>
                    ) : (
                      <div className="sign-box" onClick={() => setShowSigModal(true)}>
                        <div className="sign-box-text">Klik untuk menandatangani secara digital</div>
                        <div className="sign-box-hint">Mouse di laptop &nbsp;·&nbsp; Jari di HP</div>
                      </div>
                    )}

                    <label className="checkbox-container" style={{ marginTop: '16px' }}>
                      <input
                        type="checkbox"
                        name="setujuKontrak"
                        checked={formData.setujuKontrak}
                        onChange={handleInputChange}
                      />
                      <span>Saya telah membaca, memahami, dan menyetujui seluruh isi kontrak ini</span>
                    </label>
                  </div>
                </div>

                <div className="form-action flex-between">
                  <button className="btn-prev" onClick={prevStep}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
                    Kembali
                  </button>
                  <button className="btn-next" onClick={nextStep} disabled={!formData.setujuKontrak || !signatureImg}>
                    Lanjut: Pembayaran
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="form-card">
                <div className="card-heading">Pembayaran via Escrow</div>

                <div className="payment-total-box">
                  <div className="p-text">
                    Total Pembayaran
                    <span>Sewa {formData.durasi} bulan + Deposit (Escrow)</span>
                  </div>
                  <div className="p-amount">{formatRupiah(totalBayar)}</div>
                </div>

                <div className="form-group mt-4">
                  <label>Penyedia Pembayaran</label>
                  <select name="metodeBayar" value={formData.metodeBayar} onChange={handleInputChange}>
                    <option value="Manual">Transfer Manual / Virtual Account</option>
                  </select>
                </div>

                <div className="security-notice">
                  <strong style={{ fontWeight: 'bold' }}>Keamanan Transaksi:</strong> Pembayaran kamu akan langsung masuk ke rekening <i>SecuraKost Escrow</i>, bukan langsung ke pemilik. Dana aman hingga kamu check-in dan semua syarat kontrak terpenuhi. Dilindungi regulasi OJK.
                </div>

                <div className="form-action flex-between">
                  <button className="btn-prev" onClick={prevStep}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><path d="M12 19l-7-7 7-7"></path></svg>
                    Kembali
                  </button>
                  <button className="btn-submit" onClick={handleSubmit}>
                    Selesaikan Pengajuan Sewa
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"></path></svg>
                  </button>
                </div>
              </div>
            )}

          </div>

          <div className="summary-section">
            <div className="summary-card">
              <div className="sum-header">
                <h3>Kost Putri Melati</h3>
                <p>Jl. Cihampelas No. 42, Bandung</p>
              </div>
              <div className="sum-body">
                <div className="s-row"><span>Sewa {formData.durasi} bulan</span><span>{formatRupiah(totalSewa)}</span></div>
                <div className="s-row"><span>Deposit (escrow)</span><span>{formatRupiah(deposit)}</span></div>
                <div className="s-row"><span>Biaya kebersihan</span><span>{formatRupiah(totalKebersihan)}</span></div>
                <div className="s-divider" />
                <div className="s-row s-total"><span>Total</span><span>{formatRupiah(totalBayar)}</span></div>
              </div>
              <div className="sum-footer">
                <div className="trust-item">Listing terverifikasi SecuraKost</div>
                <div className="trust-item">Kontrak digital sah hukum</div>
                <div className="trust-item">Deposit terlindungi escrow</div>
                <div className="trust-item">Mediasi konflik tersedia</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}