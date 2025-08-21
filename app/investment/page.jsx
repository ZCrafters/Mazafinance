"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "@/styles/pages/investment.css";

export default function InvestmentPage() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Simulated news data (sama seperti HTML asli)
  const newsData = [
    {
      id: 1,
      title: "BI Prediksi Inflasi Tahun Depan Lebih Rendah",
      excerpt:
        "Bank Indonesia memperkirakan inflasi tahun depan akan lebih rendah dibanding tahun ini seiring dengan stabilisasi harga pangan...",
      category: "Ekonomi",
      date: "Hari ini",
      views: 1200,
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Analis: Saham Bank Masih Potensial Naik 20%",
      excerpt:
        "Para analis pasar modal memperkirakan saham sektor perbankan masih memiliki potensi kenaikan hingga 20% di tahun depan...",
      category: "Saham",
      date: "Kemarin",
      views: 980,
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Reksadana Pendapatan Tetap Catat Inflasi Tertinggi",
      excerpt:
        "Reksadana pendapatan tetap mencatat inflasi tertinggi di antara produk investasi lainnya pada kuartal ketiga tahun ini...",
      category: "Reksadana",
      date: "2 hari lalu",
      views: 850,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title:
        "Pemerintah Akan Terbitkan Obligasi Hijau Senilai Rp 10 Triliun",
      excerpt:
        "Pemerintah berencana menerbitkan obligasi hijau senilai Rp 10 triliun untuk mendanai proyek-proyek ramah lingkungan...",
      category: "Obligasi",
      date: "3 hari lalu",
      views: 720,
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title:
        "Fintech Lending Tumbuh 35% di Tengah Kenaikan Suku Bunga",
      excerpt:
        "Sektor fintech lending menunjukkan pertumbuhan 35% meskipun terjadi kenaikan suku bunga acuan oleh Bank Indonesia...",
      category: "Fintech",
      date: "4 hari lalu",
      views: 650,
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Investor Asing Kembali Masuk ke Pasar Saham Indonesia",
      excerpt:
        "Arus masuk modal asing ke pasar saham Indonesia mulai menunjukkan tren positif setelah beberapa bulan mengalami net sell...",
      category: "Saham",
      date: "5 hari lalu",
      views: 590,
      image:
        "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    },
  ];

  useEffect(() => {
    // Tutup menu mobile saat resize ke md+
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="bg-sage-50 font-sans text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center mr-3">
              <i className="fas fa-piggy-bank text-white text-xl" />
            </div>
            <h1 className="text-2xl font-display font-bold text-sage-700">
              MAZA FINANCE
            </h1>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link href="/maza" className="nav-link font-medium hover:text-sage-600 transition">
              Dashboard
            </Link>
            <Link href="/investment" className="nav-link font-medium hover:text-sage-600 transition">
              News
            </Link>
            <Link href="/finance-ai" className="nav-link font-medium hover:text-sage-600 transition">
              Financial AI
            </Link>
            <Link href="/games" className="nav-link font-medium hover:text-sage-600 transition">
              Games
            </Link>
            <Link href="/kentang" className="nav-link font-medium hover:text-sage-600 transition">
              Manajemen Keuangan
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded-full font-medium transition hidden sm:flex items-center">
              <i className="fas fa-lock mr-2" /> Sign In
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden text-sage-700"
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-2xl" />
            </button>
          </div>

          {/* Mobile menu */}
          <div
            className={`mobile-menu md:hidden ${mobileOpen ? "active" : ""}`}
          >
            <Link href="/maza" className="nav-link font-medium hover:bg-gray-50 transition block">
              Dashboard
            </Link>
            <Link href="/investment" className="nav-link font-medium hover:bg-gray-50 transition block">
              News
            </Link>
            <Link href="/finance-ai" className="nav-link font-medium hover:bg-gray-50 transition block">
              Financial AI
            </Link>
            <Link href="/games" className="nav-link font-medium hover:bg-gray-50 transition block">
              Games
            </Link>
            <Link href="/kentang" className="nav-link font-medium hover:bg-gray-50 transition block">
              Manajemen Keuangan
            </Link>
            <button className="nav-link font-medium hover:bg-gray-50 transition block sm:hidden text-left px-5 py-3">
              <i className="fas fa-lock mr-2" />
              Sign In
            </button>
          </div>
        </div>
      </header>

      {/* Hero section (video bg + overlay) */}
      <section className="relative text-white py-16 md:py-24 lg:py-32 overflow-hidden bg-sage-700">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://cdn.discordapp.com/attachments/564797371905736714/1386265698925281320/lol.mp4"
            type="video/mp4"
          />
        </video>

        <div className="absolute inset-0 bg-gradient-to-br from-sage-700/90 via-sage-600/85 to-sage-800/90 z-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-sage-500/20 backdrop-blur-sm text-sage-100 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-sage-400/30">
              Update Terkini
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Berita <span className="text-sage-300">Investasi</span> Terkini
            </h1>

            <p className="text-lg sm:text-xl text-sage-100 max-w-2xl mx-auto mb-10 leading-relaxed">
              Dapatkan informasi terbaru seputar dunia investasi dan keuangan untuk membantu Anda
              mengambil keputusan finansial yang lebih baik.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-sage-400">
                    <i className="fas fa-search" />
                  </div>
                  <input
                    type="text"
                    placeholder="Cari berita investasi..."
                    className="w-full pl-11 pr-4 py-4 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent shadow-lg"
                  />
                </div>
                <button className="bg-sage-600 hover:bg-sage-700 text-white font-medium px-6 py-4 rounded-xl transition duration-300 ease-in-out transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl flex items-center justify-center">
                  <i className="fas fa-search mr-2" />
                  <span>Cari Berita</span>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Artikel", value: "500+" },
                { label: "Kategori", value: "50+" },
                { label: "Pembaca", value: "10K+" },
                { label: "Update", value: "24/7" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10"
                >
                  <div className="text-2xl font-bold text-sage-300">{s.value}</div>
                  <div className="text-sm text-sage-200">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-8 h-12 border-4 border-sage-300 rounded-full flex justify-center items-start p-2">
            <div className="w-1 h-3 bg-sage-300 rounded-full" />
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* News list */}
          <div className="lg:w-3/4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Berita Terbaru</h2>
              <div className="category-buttons">
                <div className="flex space-x-2">
                  <button className="bg-sage-600 text-white px-4 py-2 rounded-lg text-sm md:text-base">
                    Semua
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm md:text-base">
                    Saham
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm md:text-base">
                    Obligasi
                  </button>
                  <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 text-sm md:text-base">
                    Reksadana
                  </button>
                </div>
              </div>
            </div>

            {/* News grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsData.map((news) => (
                <article key={news.id} className="bg-white rounded-xl news-card overflow-hidden">
                  <div className="relative">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full news-image"
                      loading="lazy"
                    />
                    <span className="category-badge bg-sage-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {news.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{news.title}</h3>
                    <p className="text-gray-600 mb-4">{news.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{news.date}</span>
                      <div className="flex items-center">
                        <i className="fas fa-eye text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500">{news.views}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination (dummy) */}
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <a className="py-2 px-4 rounded-l-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50" href="#">
                  <i className="fas fa-chevron-left" />
                </a>
                <a className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50" href="#">
                  1
                </a>
                <a className="py-2 px-4 border border-gray-300 bg-sage-600 text-white" href="#">
                  2
                </a>
                <a className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50" href="#">
                  3
                </a>
                <a className="py-2 px-4 rounded-r-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50" href="#">
                  <i className="fas fa-chevron-right" />
                </a>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pasar</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">IHSG</span>
                    <span className="font-semibold">7,201.45</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-500">+1.25%</span>
                    <span className="text-gray-500">Hari ini</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">USD/IDR</span>
                    <span className="font-semibold">15,420</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-red-500">-0.35%</span>
                    <span className="text-gray-500">Hari ini</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Emas</span>
                    <span className="font-semibold">1,982.30</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-500">+0.75%</span>
                    <span className="text-gray-500">Hari ini</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 bg-sage-100 text-sage-700 py-2 rounded-lg hover:bg-sage-200 transition">
                Lihat Selengkapnya
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Berita Populer</h3>
              <div className="space-y-4">
                {["BI Prediksi Inflasi Tahun Depan Lebih Rendah", "Analis: Saham Bank Masih Potensial Naik 20%", "Reksadana Pendapatan Tetap Catat Inflasi Tertinggi"].map(
                  (title, idx) => (
                    <a key={idx} href="#" className="block group">
                      <div className="flex items-start">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                        <div className="ml-3">
                          <h4 className="font-semibold group-hover:text-sage-600 transition">
                            {title}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>{idx === 0 ? "Hari ini" : idx === 1 ? "Kemarin" : "2 hari lalu"}</span>
                            <span className="mx-2">•</span>
                            <span>{idx === 0 ? "1.2K" : idx === 1 ? "980" : "850"} dilihat</span>
                          </div>
                        </div>
                      </div>
                    </a>
                  )
                )}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Newsletter */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Dapatkan Update Investasi Langsung</h2>
            <p className="text-gray-600 mb-8">
              Berlangganan newsletter kami untuk menerima analisis pasar, tips investasi, dan
              berita finansial terkini
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sage-500"
              />
              <button className="bg-sage-600 text-white px-6 py-3 rounded-lg hover:bg-sage-700 transition">
                Berlangganan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-sage-600 w-8 h-8 rounded-lg flex items-center justify-center">
                  <i className="fas fa-chart-line text-white" />
                </div>
                <h3 className="text-xl font-bold ml-2">Maza Finance</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Platform investasi terpercaya untuk membantu Anda mencapai kebebasan finansial.
              </p>
              <div className="flex space-x-4">
                {["facebook-f", "twitter", "instagram", "linkedin-in"].map((icon) => (
                  <a key={icon} href="#" className="text-gray-400 hover:text-white">
                    <i className={`fab fa-${icon}`} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Perusahaan</h4>
              <ul className="space-y-2 text-gray-400">
                {["Tentang Kami", "Karir", "Blog", "Partner", "Kontak"].map((t) => (
                  <li key={t}>
                    <a href="#" className="hover:text-white">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-gray-400">
                {[
                  "Investasi Saham",
                  "Reksadana",
                  "Obligasi",
                  "Edukasi",
                  "Kalkulator Investasi",
                ].map((t) => (
                  <li key={t}>
                    <a href="#" className="hover:text-white">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Kontak</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <i className="fas fa-map-marker-alt mt-1 mr-3" />
                  <span>Jl. Sudirman No. 123, Jakarta Selatan</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt mr-3" />
                  <span>(021) 1234-5678</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-3" />
                  <span>info@mazafinance.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2023 Maza Finance. Hak Cipta Dilindungi.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
