export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">

        {/* Brand */}
        <div className="footer__brand">
          <div className="footer__brand-name">Secura<span>Kost</span></div>
          <p className="footer__brand-desc">
            Platform marketplace kos berbasis Legal Protection pertama di Indonesia.
            Sewa aman, hak terlindungi.
          </p>
          <div className="footer__contacts">
            <a href="mailto:tim@securakost.id" className="footer__contact-item">
              <svg className="footer__contact-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              tim@securakost.id
            </a>
            <a href="https://securakost.id" className="footer__contact-item">
              <svg className="footer__contact-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              securakost.id
            </a>
          </div>
        </div>

        {/* Platform */}
        <div className="footer__col">
          <div className="footer__col-title">Platform</div>
          <ul>
            <li><a href="#">Cari Kos</a></li>
            <li><a href="#">Daftarkan Kos</a></li>
            <li><a href="#">Edukasi Hukum</a></li>
          </ul>
        </div>

        {/* Regulasi */}
        <div className="footer__col">
          <div className="footer__col-title">Regulasi</div>
          <ul>
            <li><a href="#">KUH Perdata</a></li>
            <li><a href="#">UU ITE</a></li>
            <li><a href="#">UU PDP 2022</a></li>
            <li><a href="#">UU Perlindungan Konsumen</a></li>
          </ul>
        </div>

        {/* Sertifikasi */}
        <div className="footer__col">
          <div className="footer__col-title">Sertifikasi</div>
          <ul>
            <li>
              <a href="#">
                <span className="footer__check">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                NIB (OSS)
              </a>
            </li>
            <li>
              <a href="#">
                <span className="footer__check">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                PSE Kominfo
              </a>
            </li>
            <li>
              <a href="#">
                <span className="footer__check">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Mitra Escrow OJK
              </a>
            </li>
            <li>
              <a href="#">
                <span className="footer__check">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                Data Protection Officer
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <span>© 2025 SecuraKost. Sewa Aman, Hak Terlindungi. PT SecuraKost Indonesia.</span>
        <span>Privacy Policy · Syarat &amp; Ketentuan</span>
      </div>
    </footer>
  )
}