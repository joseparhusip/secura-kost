import React from 'react'
import '../css/timkami.css'

// Mengimpor gambar dengan path yang sesuai
import imgCynara from '../assets/img/tim/cynara-delysia-emry.jpeg'
import imgMarsha from '../assets/img/tim/marsha-faris.jpeg'
import imgNaura from '../assets/img/tim/naura-gerhana-syafaghaida.jpeg'
import imgRaghib from '../assets/img/tim/raghib-nazhib.jpeg'
import imgThirtadama from '../assets/img/tim/thirtadama-kamal.jpeg'

export default function TimKami() {
  const ceo = {
    name: "Marsha Faris",
    role: "CEO (Chief Executive Officer)",
    description: "Strategi Bisnis, Investor Relations, dan Manajemen Operasional Startup.",
    image: imgMarsha
  };

  const teamMembers = [
    {
      id: 1,
      name: "Raghib Nazhif",
      role: "CLO (Chief Legal Officer)",
      description: "Advokat Berlisensi (PERADI), spesialis hukum kontrak dan protokol mediasi.",
      image: imgRaghib
    },
    {
      id: 2,
      name: "Naura Gerhania Syafaghaida",
      role: "CTO (Chief Technology Officer)",
      description: "Arsitek Sistem Informasi, integrasi Payment Gateway, dan keamanan data (Cybersecurity).",
      image: imgNaura
    },
    {
      id: 3,
      name: "Thirtadama Kamal",
      role: "CMO (Chief Marketing Officer)",
      description: "Spesialis Growth Hacking, akuisisi pengguna, dan kemitraan strategis.",
      image: imgThirtadama
    },
    {
      id: 4,
      name: "Cynara Delysia Emry",
      role: "Strategic Advisor",
      description: "Kami didukung oleh praktisi hukum senior (Advokat) dan ahli fintech yang membantu kami menavigasi regulasi tanpa harus mendirikan departemen hukum internal yang mahal.",
      image: imgCynara
    }
  ]

  return (
    <section id="tim-kami" className="tim-section">
      <div className="tim-container">
        <div className="tim-header">
          <h2 className="tim-title">Profil Tim Pendiri (Founder Profiles)</h2>
          <p className="tim-subtitle">
            Berdedikasi untuk memberikan solusi sewa menyewa kos yang aman, transparan, dan terlindungi secara hukum.
          </p>
        </div>

        <div className="tree-container">
          {/* ATAS: CEO Card */}
          <div className="tree-root">
            <div className="tim-card ceo-card">
              <div className="tim-image-wrapper">
                <img src={ceo.image} alt={ceo.name} className="tim-image" />
              </div>
              <div className="tim-info">
                <h3 className="tim-name">{ceo.name}</h3>
                <span className="tim-role">{ceo.role}</span>
                <p className="tim-desc">{ceo.description}</p>
              </div>
            </div>
          </div>

          {/* BAWAH: Grid 4 Anggota dengan Garis Penghubung */}
          <div className="tree-children">
            {teamMembers.map((member) => (
              <div className="tree-child" key={member.id}>
                <div className="tim-card">
                  <div className="tim-image-wrapper">
                    <img src={member.image} alt={member.name} className="tim-image" />
                  </div>
                  <div className="tim-info">
                    <h3 className="tim-name">{member.name}</h3>
                    <span className="tim-role">{member.role}</span>
                    <p className="tim-desc">{member.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}