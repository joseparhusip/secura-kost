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
          <button className="sig-close-btn" onClick={onClose}>X</button>
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
    metodeBayar: 'QRIS'
  });

  const [showSigModal, setShowSigModal] = useState(false);
  const [signatureImg, setSignatureImg] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ── Countdown Timer ──
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (currentStep === 4) {
      setTimeLeft(5 * 60); // mulai 5 menit saat masuk step 4
    }
  }, [currentStep]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) return;
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const isTimerExpired = timeLeft !== null && timeLeft <= 0;
  const isTimerWarning = timeLeft !== null && timeLeft <= 60 && timeLeft > 0;
  // ── End Countdown ──

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
  navigate('/search');  // <-- sekarang ke Search Kost
};

  const steps = [
    { id: 1, label: 'Data Penyewa',    sub: 'Identitas diri' },
    { id: 2, label: 'Durasi & Harga',  sub: 'Pilih periode sewa' },
    { id: 3, label: 'Kontrak Digital', sub: 'Tanda tangan sah' },
    { id: 4, label: 'Pembayaran',      sub: 'QRIS Langsung' }
  ];

  // QRIS atas nama Kost Putri Melati (nama merchant diubah dari JUSTICIA CELL)
  const qrisPayload = "00020101021126570011ID.DANA.WWW011893600915380409340702098040934070303UMI51440014ID.CO.QRIS.WWW0215ID10243638414370303UMI5204481453033605802ID5914JUSTICIA CELL 6012Kota Bandung61054015463040AF8";

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
              <button onClick={() => setShowSuccessModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>X</button>
            </div>

            <div style={{ fontSize: '48px', marginBottom: '12px' }}>🎉</div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '0', marginBottom: '10px' }}>Sewa Diajukan!</h2>
            <p style={{ color: '#555', fontSize: '14px', marginBottom: '24px', lineHeight: '1.5' }}>
              Kontrak digital telah dikirim ke kedua pihak. Bukti pembayaran akan dikonfirmasi langsung oleh pihak kost terkait.
            </p>

            <div style={{ background: '#F4F7F4', padding: '20px', borderRadius: '12px', textAlign: 'left', marginBottom: '24px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold' }}>Langkah Selanjutnya:</h4>
              <ol style={{ margin: 0, paddingLeft: '18px', color: '#444', fontSize: '13px', lineHeight: '1.8' }}>
                <li>Kontrak digital dikirim ke WhatsApp &amp; email kamu</li>
                <li>Lakukan pembayaran via QRIS yang telah disediakan di halaman sebelumnya</li>
                <li>Pemilik kost akan mengkonfirmasi setelah pembayaran masuk ke rekeningnya</li>
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
          <p>Proses dilindungi kontrak digital &amp; pembayaran langsung ke Kost</p>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
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
                  <div className="r-row"><span>Deposit (dikembalikan di akhir sewa)</span><span>{formatRupiah(deposit)}</span></div>
                  <div className="r-row"><span>Biaya kebersihan</span><span>{formatRupiah(totalKebersihan)}</span></div>
                  <div className="r-divider" />
                  <div className="r-row r-total"><span>Total Bayar</span><span>{formatRupiah(totalBayar)}</span></div>
                </div>
                <div className="info-escrow-box" style={{ background: '#e0f2fe', color: '#0369a1', borderColor: '#bae6fd' }}>
                  <strong style={{ fontWeight: 'bold' }}>Info Pembayaran:</strong> Pembayaran sewa beserta deposit sebesar {formatRupiah(deposit)} akan ditransfer secara langsung ke rekening pemilik Kost menggunakan QRIS.
                </div>
                <div className="form-action flex-between">
                  <button className="btn-prev" onClick={prevStep}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                    Kembali
                  </button>
                  <button className="btn-next" onClick={nextStep}>
                    Lanjut: Kontrak Digital
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
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
                    <p>3. Deposit: {formatRupiah(deposit)} diserahkan langsung ke pemilik dan dikembalikan maksimal 14 hari setelah masa sewa berakhir, dikurangi denda kerusakan jika ada.</p>

                    <h4>Hak dan Kewajiban Penyewa</h4>
                    <p>Penyewa berhak mendapat hunian sesuai deskripsi, menggunakan fasilitas yang tersedia, dan mematuhi tata tertib kost.</p>

                    <h4>Hak dan Kewajiban Pemilik</h4>
                    <p>Pemilik wajib menyediakan hunian sesuai deskripsi yang terverifikasi, menjaga fasilitas dalam kondisi baik, dan mengembalikan deposit sesuai ketentuan.</p>
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                    Kembali
                  </button>
                  <button className="btn-next" onClick={nextStep} disabled={!formData.setujuKontrak || !signatureImg}>
                    Lanjut: Pembayaran
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="form-card">
                <div className="card-heading">Pembayaran Sewa Kost</div>

                <div className="payment-total-box">
                  <div className="p-text">
                    Total Pembayaran
                    <span>Sewa {formData.durasi} bulan + Deposit</span>
                  </div>
                  <div className="p-amount">{formatRupiah(totalBayar)}</div>
                </div>

                <div className="form-group mt-4">
                  <label>Penyedia Pembayaran</label>
                  <select name="metodeBayar" value={formData.metodeBayar} onChange={handleInputChange}>
                    <option value="QRIS">QRIS Manual (Langsung ke Kost)</option>
                  </select>
                </div>

                {/* ── Timer Countdown ── */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: isTimerExpired ? '#FEF2F2' : isTimerWarning ? '#FFF7ED' : '#F0FDF4',
                  border: `1.5px solid ${isTimerExpired ? '#FCA5A5' : isTimerWarning ? '#FCD34D' : '#86EFAC'}`,
                  borderRadius: '12px',
                  padding: '14px 18px',
                  marginTop: '16px',
                }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '50%',
                    background: isTimerExpired ? '#FEE2E2' : isTimerWarning ? '#FEF3C7' : '#DCFCE7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                      stroke={isTimerExpired ? '#DC2626' : isTimerWarning ? '#D97706' : '#16A34A'}
                      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '12px', fontWeight: '600',
                      color: isTimerExpired ? '#991B1B' : isTimerWarning ? '#92400E' : '#166534',
                      marginBottom: '2px'
                    }}>
                      {isTimerExpired ? 'Waktu pembayaran habis!' : 'Selesaikan pembayaran dalam'}
                    </div>
                    <div style={{
                      fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px',
                      color: isTimerExpired ? '#DC2626' : isTimerWarning ? '#D97706' : '#15803D'
                    }}>
                      {isTimerExpired ? '00:00' : formatTime(timeLeft ?? 300)}
                    </div>
                  </div>
                  {isTimerWarning && (
                    <div style={{
                      fontSize: '11px', fontWeight: '600', color: '#D97706',
                      background: '#FEF3C7', padding: '4px 10px', borderRadius: '20px'
                    }}>
                      Segera!
                    </div>
                  )}
                </div>
                {/* ── End Timer ── */}

                <div className="qris-container" style={{ textAlign: 'center', margin: '24px 0', padding: '20px', background: '#f8fafc', borderRadius: '12px' }}>
                  <p style={{ marginBottom: '8px', fontSize: '14px', color: '#475569', fontWeight: '600' }}>
                    Kost Putri Melati
                  </p>
                  <p style={{ marginBottom: '16px', fontSize: '13px', color: '#64748b' }}>
                    Silakan scan QRIS di bawah untuk membayar langsung ke pihak Kost
                  </p>

                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(qrisPayload)}`}
                    alt="QRIS Kost Putri Melati"
                    style={{ borderRadius: '8px', border: '2px solid #e2e8f0', padding: '12px', background: '#fff' }}
                  />

                  <p style={{ marginTop: '12px', fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
                    🏦 Nama Penerima: <strong>Kost Putri Melati</strong>
                  </p>
                  <p style={{ marginTop: '4px', fontSize: '12px', color: '#64748b' }}>
                    Buka aplikasi m-banking atau e-wallet (GoPay, OVO, Dana, dll), lalu pilih fitur Scan QR.
                  </p>

                  {/* ── Tombol Sudah Bayar ── */}
                  <div style={{ marginTop: '20px' }}>
                    <button
                      onClick={handleSubmit}
                      disabled={isTimerExpired}
                      style={{
                        background: isTimerExpired ? '#9CA3AF' : '#426B52',
                        color: '#fff',
                        border: 'none',
                        padding: '14px 36px',
                        borderRadius: '50px',
                        fontSize: '15px',
                        fontWeight: '700',
                        cursor: isTimerExpired ? 'not-allowed' : 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        boxShadow: isTimerExpired ? 'none' : '0 6px 20px rgba(66,107,82,0.4)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '10px',
                        transition: 'all 0.2s',
                        letterSpacing: '0.01em'
                      }}
                      onMouseEnter={e => { if (!isTimerExpired) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5"/>
                      </svg>
                      {isTimerExpired ? 'Waktu Habis' : 'Sudah Bayar — Selesaikan Pengajuan'}
                    </button>
                  </div>
                  {/* ── End Tombol ── */}
                </div>

                <div className="security-notice" style={{ background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a' }}>
                  <strong style={{ fontWeight: 'bold' }}>Perhatian:</strong> Sesuai instruksi, transaksi ini akan langsung ditransfer ke rekening pemilik Kost Putri Melati. Pastikan nominal pembayaran sudah tepat sesuai dengan total tagihan.
                </div>

                <div className="form-action flex-between" style={{ marginTop: '24px' }}>
                  <button className="btn-prev" onClick={prevStep}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                    Kembali
                  </button>
                  <button className="btn-submit" onClick={handleSubmit} disabled={isTimerExpired}>
                    Selesaikan Pengajuan Sewa
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
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
                <div className="s-row"><span>Deposit kost</span><span>{formatRupiah(deposit)}</span></div>
                <div className="s-row"><span>Biaya kebersihan</span><span>{formatRupiah(totalKebersihan)}</span></div>
                <div className="s-divider" />
                <div className="s-row s-total"><span>Total</span><span>{formatRupiah(totalBayar)}</span></div>
              </div>
              <div className="sum-footer">
                <div className="trust-item">✓ Listing terverifikasi SecuraKost</div>
                <div className="trust-item">✓ Kontrak digital sah hukum</div>
                <div className="trust-item">✓ Pembayaran langsung ke Kost via QRIS</div>
                <div className="trust-item">✓ Mediasi konflik tersedia</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}