"use client";

import { useEffect, useRef, useState } from "react";
import AuroraHero from "@/components/AuroraHero";

export default function Page() {
  // state navigasi landing -> login
  const [showLogin, setShowLogin] = useState(false);
  // tab login/register
  const [tab, setTab] = useState("login");
  const authErrorRef = useRef(null);

  // set body font + theme fallback
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "night");
    document.body.style.fontFamily = "'Inter', sans-serif";
  }, []);

  return (
    <main>
      {/* Background Aurora */}
      <AuroraHero />

      {/* === Landing Page === */}
      {!showLogin && (
        <section className="relative z-10 p-4 sm:p-6 md:p-8">
          <div className="container mx-auto">
            {/* Hero */}
            <div className="text-center py-16 sm:py-24">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg">
                Kuasai Uangmu, Kuasai Masa Depanmu
              </h1>
              <p className="text-lg md:text-xl max-w-3xl mx-auto text-secondary">
                Literasi finansial bukan lagi pilihan, tapi keharusan. Temukan masalah umum
                dan solusi praktis untuk membangun pondasi keuangan yang kokoh.
              </p>
            </div>

            {/* Kartu Masalah + Solusi */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10 text-white">
                Masalah Keuangan Umum &amp; Solusinya
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 1 */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>
                    Gaji Habis di Tengah Bulan?
                  </h3>
                  <p className="card-desc">
                    Merasa cemas saat tanggal tua mendekat karena uang sudah menipis?
                    Ini tanda pengeluaran lebih besar dari pendapatan.
                  </p>
                  <h4 className="section-subtitle">Solusi Praktis:</h4>
                  <ul className="solusi-list">
                    <li>Gunakan metode budgeting 50/30/20 (Kebutuhan/Keinginan/Tabungan).</li>
                    <li>Catat SEMUA pengeluaran, sekecil apapun, selama sebulan penuh.</li>
                    <li>Identifikasi pos "bocor" seperti jajan impulsif atau langganan tak terpakai.</li>
                  </ul>
                </div>

                {/* 2 */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>
                    Terlilit Utang Konsumtif
                  </h3>
                  <p className="card-desc">
                    Tagihan kartu kredit atau paylater membengkak untuk membeli barang yang nilainya terus menurun?
                  </p>
                  <h4 className="section-subtitle">Solusi Praktis:</h4>
                  <ul className="solusi-list">
                    <li>Stop menambah utang baru. Bekukan kartu kredit jika perlu.</li>
                    <li>Prioritaskan membayar utang dengan bunga tertinggi (metode avalanche).</li>
                    <li>Cari penghasilan tambahan untuk mempercepat pelunasan.</li>
                  </ul>
                </div>

                {/* 3 */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>
                    Tak Punya Dana Darurat
                  </h3>
                  <p className="card-desc">
                    Satu kejadian tak terduga (sakit, PHK, motor rusak) bisa langsung merusak seluruh rencana keuanganmu.
                  </p>
                  <h4 className="section-subtitle">Solusi Praktis:</h4>
                  <ul className="solusi-list">
                    <li>Mulai kumpulkan 3-6 kali pengeluaran bulanan.</li>
                    <li>Buat rekening terpisah khusus dana darurat. Jangan disentuh!</li>
                    <li>Otomatiskan transfer bulanan ke rekening ini, walau hanya Rp 100.000.</li>
                  </ul>
                </div>

                {/* 4 */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>
                    Bingung Memulai Investasi
                  </h3>
                  <p className="card-desc">
                    Tahu investasi itu penting, tapi takut rugi, tidak tahu harus mulai dari mana, atau merasa modal kurang.
                  </p>
                  <h4 className="section-subtitle">Solusi Praktis:</h4>
                  <ul className="solusi-list">
                    <li>Mulai dari yang risiko rendah seperti Reksadana Pasar Uang.</li>
                    <li>Gunakan fitur "DCA" (Dollar Cost Averaging) atau menabung rutin.</li>
                    <li>Ingat: investasi adalah maraton, bukan sprint. Mulai dari Rp 10.000 pun bisa.</li>
                  </ul>
                </div>

                {/* 5 */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>
                    Gaji Naik, Tabungan Stagnan
                  </h3>
                  <p className="card-desc">
                    Setiap kali pendapatan naik, pengeluaran untuk gaya hidup (gadget baru, nongkrong mahal) juga ikut naik.
                  </p>
                  <h4 className="section-subtitle">Solusi Praktis:</h4>
                  <ul className="solusi-list">
                    <li>Saat gaji naik, naikkan jumlah tabungan/investasi terlebih dahulu.</li>
                    <li>Terapkan aturan "tunggu 7 hari" sebelum membeli barang keinginan.</li>
                    <li>Fokus pada tujuan jangka panjang, bukan kepuasan sesaat.</li>
                  </ul>
                </div>

                {/* 6 */}
                <div className="card p-6">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--primary)" }}>
                    Hidup Tanpa Tujuan Keuangan
                  </h3>
                  <p className="card-desc">
                    Menabung tanpa arah yang jelas membuatnya terasa berat dan tidak memotivasi. Untuk apa sebenarnya kamu menabung?
                  </p>
                  <h4 className="section-subtitle">Solusi Praktis:</h4>
                  <ul className="solusi-list">
                    <li>Tentukan tujuan spesifik (DP Rumah, Dana Pensiun, Biaya Nikah).</li>
                    <li>Hitung berapa yang dibutuhkan dan kapan targetnya.</li>
                    <li>Pecah target besar menjadi target bulanan yang lebih mudah dicapai.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center py-16">
              <div className="card max-w-2xl mx-auto p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                  Siap Memulai Perjalanan Finansialmu?
                </h2>
                <p className="mb-8 text-secondary">
                  Klik tombol di bawah untuk mendaftar dan mulai menggunakan aplikasi.
                </p>
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn-primary inline-block py-3 px-8 font-bold text-lg"
                >
                  Daftar Sekarang
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* === Login/Register Page === */}
      {showLogin && (
        <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center p-4">
          <a href="/maza" className="absolute top-4 left-4 text-sm btn-primary py-2 px-4 no-underline">
            Potato
          </a>

          <div className="w-full max-w-md">
            <div className="card p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white">Selamat Datang</h2>
                <p className="text-secondary">Masuk atau daftar untuk melanjutkan.</p>
              </div>

              {/* Tabs */}
              <div className="flex border-b mb-6" style={{ borderColor: "var(--card-border)" }}>
                <button
                  className={`auth-tab flex-1 ${tab === "login" ? "active" : ""}`}
                  onClick={() => setTab("login")}
                >
                  Masuk
                </button>
                <button
                  className={`auth-tab flex-1 ${tab === "register" ? "active" : ""}`}
                  onClick={() => setTab("register")}
                >
                  Daftar
                </button>
              </div>

              {/* Login Form */}
              {tab === "login" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (authErrorRef.current) authErrorRef.current.textContent = "Demo only: autentikasi belum dihubungkan.";
                  }}
                >
                  <div className="mb-4">
                    <label htmlFor="login-email" className="label">Email</label>
                    <input type="email" id="login-email" name="email" className="form-input w-full p-2" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="login-password" className="label">Password</label>
                    <input type="password" id="login-password" name="password" className="form-input w-full p-2" required />
                  </div>
                  <button type="submit" className="btn-primary w-full py-2.5 font-semibold">Masuk</button>
                </form>
              )}

              {/* Register Form */}
              {tab === "register" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (authErrorRef.current) authErrorRef.current.textContent = "Demo only: registrasi belum dihubungkan.";
                  }}
                >
                  <div className="mb-4">
                    <label htmlFor="register-email" className="label">Email</label>
                    <input type="email" id="register-email" name="email" className="form-input w-full p-2" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="register-password" className="label">Password</label>
                    <input type="password" id="register-password" name="password" className="form-input w-full p-2" required />
                  </div>
                  <button type="submit" className="btn-primary w-full py-2.5 font-semibold">
                    Daftar Akun Baru
                  </button>
                </form>
              )}

              <div id="auth-error" ref={authErrorRef} className="auth-error"></div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}