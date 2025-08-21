"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../styles/pages/games.css";

// Three.js via dynamic import biar aman di client
export default function GamesPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "day"
      : "day"
  );

  const canvasRef = useRef(null);

  // Theme toggle
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  // 3D background (port dari games.html)
  useEffect(() => {
    let renderer, scene, camera, crystal, pointLight, raf;
    let mouseX = 0;
    let mouseY = 0;
    let disposed = false;

    async function boot() {
      const THREE = (await import("three")).default;

      const canvas = canvasRef.current;
      if (!canvas) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const geometry = new THREE.IcosahedronGeometry(1.5, 0);
      const material = new THREE.MeshStandardMaterial({
        color: 0x84a98c,
        metalness: 0.3,
        roughness: 0.6,
      });
      crystal = new THREE.Mesh(geometry, material);
      scene.add(crystal);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);

      pointLight = new THREE.PointLight(0xffffff, 0.8);
      pointLight.position.set(5, 5, 5);
      scene.add(pointLight);

      camera.position.z = 5;

      const onMouseMove = (e) => {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      const onResize = () => {
        if (!renderer || !camera) return;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("resize", onResize);

      const animate = () => {
        if (disposed) return;
        raf = requestAnimationFrame(animate);
        crystal.rotation.x += 0.0005;
        crystal.rotation.y += 0.001;
        crystal.rotation.x += (mouseY - crystal.rotation.x) * 0.05;
        crystal.rotation.y += (mouseX - crystal.rotation.y) * 0.05;
        renderer.render(scene, camera);
      };
      animate();

      // cleanup
      return () => {
        disposed = true;
        cancelAnimationFrame(raf);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("resize", onResize);
        renderer && renderer.dispose();
      };
    }

    boot();
    return () => {
      // cleanup di dalam boot
    };
  }, []);

  // Ticker clone (agar loop mulus, sama seperti HTML)
  useEffect(() => {
    const items = document.querySelectorAll(".ticker-item");
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      item.parentElement?.appendChild(clone);
    });
  }, []);

  return (
    <div className="games-page font-sans" data-theme={theme}>
      <canvas ref={canvasRef} id="bg-3d-animation" className="bg3d" />

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="brand">
            <div className="brand-icon">
              <i className="fas fa-piggy-bank text-white text-xl" />
            </div>
            <h1 className="brand-title">MAZA FINANCE</h1>
          </div>

          <nav className="nav-desktop">
            <Link href="/maza" className="nav-link">
              Dashboard
            </Link>
            <Link href="/investment" className="nav-link">
              News
            </Link>
            <Link href="/finance-ai" className="nav-link">
              Financial AI
            </Link>
            <Link href="/games" className="nav-link active">
              Games
            </Link>
            <Link href="/kentang" className="nav-link">
              Manajemen Keuangan
            </Link>
          </nav>

          <div className="actions">
            <button className="btn-signin">
              <i className="fas fa-lock mr-2" />
              Sign In
            </button>

            <button
              id="themeToggle"
              aria-label="Toggle theme"
              className="btn-theme"
              onClick={() => setTheme(theme === "day" ? "night" : "day")}
            >
              <span className={`sun ${theme === "day" ? "" : "hidden"}`}>☀️</span>
              <span className={`moon ${theme === "night" ? "" : "hidden"}`}>🌙</span>
            </button>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="btn-burger"
              aria-label="Toggle menu"
            >
              <i className="fas fa-bars text-2xl" />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div id="mobile-menu" className={`mobile-menu ${mobileOpen ? "" : "hidden"}`}>
          <Link href="/maza" className="mobile-item">
            Dashboard
          </Link>
          <Link href="/investment" className="mobile-item">
            News
          </Link>
          <Link href="/finance-ai" className="mobile-item">
            Financial AI
          </Link>
          <Link href="/games" className="mobile-item active">
            Games
          </Link>
          <Link href="/kentang" className="mobile-item">
            Manajemen Keuangan
          </Link>
          <button className="mobile-signin">Sign In</button>
        </div>
      </header>

      <div className="container page">
        <header className="hero">
          <h1>FinWord Challenge</h1>
          <p>Tingkatkan pengetahuan finansialmu dengan cara yang seru!</p>
        </header>

        {/* Dashboard Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="card p-6">
            <h2 className="card-title">Papan Finansial</h2>

            <div className="ticker h-8 overflow-hidden mb-4 rounded">
              <div className="ticker-item">
                <span className="text-green-600">AAPL: $175.23 ▲</span> |
                <span className="text-red-600"> MSFT: $338.11 ▼</span> |
                <span className="text-green-600"> GOOGL: $139.72 ▲</span> |
                <span className="text-green-600"> BTC: $62,450 ▲</span>
              </div>
            </div>

            <div className="text-sm space-y-2">
              <p>
                <i className="fas fa-newspaper mr-2 text-primary" />
                <span className="text-secondary">The Fed Mempertahankan Suku Bunga</span>
              </p>
              <p>
                <i className="fas fa-newspaper mr-2 text-primary" />
                <span className="text-secondary">Saham Teknologi Menguat</span>
              </p>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="card-title">Portofolio Investasi</h2>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-secondary">Saham</span>
                  <span>65%</span>
                </div>
                <div className="bar">
                  <div className="fill bg-success" style={{ width: "65%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-secondary">Kripto</span>
                  <span>25%</span>
                </div>
                <div className="bar">
                  <div className="fill bg-accent" style={{ width: "25%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span className="text-secondary">Obligasi</span>
                  <span>10%</span>
                </div>
                <div className="bar">
                  <div className="fill bg-warning" style={{ width: "10%" }} />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-xl font-bold">
                Total Nilai: <span className="text-primary">$12,450.75</span>
              </p>
              <p className="text-success">+2.3% bulan ini</p>
            </div>
          </div>
        </section>

        {/* Games grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Wordle Finansial (UI) */}
          <div className="card p-6">
            <h3 className="card-title">Wordle Finansial</h3>
            <p className="text-sm mb-4 text-secondary">
              Tebak istilah keuangan (5 huruf) dalam 6 percobaan.
            </p>

            <div id="wordle-grid" className="wordle-grid mb-4" />

            <div className="flex gap-2">
              <input
                id="wordle-input"
                maxLength={5}
                className="form-input"
                placeholder="Ketik 5 huruf & Enter"
              />
              <button id="wordle-btn" className="btn-primary">
                Coba
              </button>
            </div>

            <p id="wordle-status" className="status" />
          </div>

          {/* Crossword (dummy UI) */}
          <div className="card p-6">
            <h3 className="card-title">Teka-Teki Silang</h3>
            <p className="text-sm mb-4 text-secondary">Isi kotak berdasarkan petunjuk.</p>

            <div className="crossword">
              {/* baris 1 */}
              {Array.from({ length: 10 }).map((_, i) => (
                <input key={`r1-${i}`} className="cross-cell" />
              ))}
              {/* baris 2 (5 input) */}
              {Array.from({ length: 5 }).map((_, i) => (
                <input key={`r2-${i}`} className="cross-cell" />
              ))}
            </div>

            <div className="flex justify-center mt-2">
              <button className="btn-primary">Periksa</button>
            </div>
          </div>

          {/* Scrabble Finansial (UI) */}
          <div className="card p-6">
            <h3 className="card-title">Scrabble Finansial</h3>
            <p className="text-sm mb-4 text-secondary">Susun kata dari huruf acak.</p>

            <div id="rack" className="rack mb-4" />
            <div id="scrabble-board" className="board mb-4" />

            <div className="flex justify-between gap-2">
              <button id="scrabble-shuffle" className="btn-primary">
                Acak
              </button>
              <button id="scrabble-submit" className="btn-primary">
                Submit
              </button>
            </div>

            <p id="scrabble-status" className="status" />
          </div>
        </section>

        {/* Leaderboard */}
        <section className="card p-6 mb-10">
          <h2 className="text-3xl font-bold mb-6 text-center">Papan Peringkat</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="pb-4">Peringkat</th>
                  <th className="pb-4">Pemain</th>
                  <th className="pb-4">Lencana</th>
                  <th className="pb-4 text-right">Skor</th>
                </tr>
              </thead>

              <tbody>
                {[
                  {
                    rank: 1,
                    name: "Michael J.",
                    badge: "Wordle Master",
                    badgeClass: "badge-primary",
                    score: "12,450",
                    rankClass: "rank-1",
                  },
                  {
                    rank: 2,
                    name: "Sarah J.",
                    badge: "Investor Cerdas",
                    badgeClass: "badge-success",
                    score: "11,890",
                    rankClass: "rank-2",
                  },
                  {
                    rank: 3,
                    name: "David R.",
                    badge: "Ahli Teka-Teki",
                    badgeClass: "badge-warning",
                    score: "10,750",
                    rankClass: "rank-3",
                  },
                  {
                    rank: 4,
                    name: "Alex L.",
                    badge: "Investor",
                    badgeClass: "badge-neutral",
                    score: "9,820",
                    rankClass: "rank-other",
                  },
                ].map((r) => (
                  <tr key={r.rank}>
                    <td className="py-3">
                      <div className={`leaderboard-rank ${r.rankClass}`}>{r.rank}</div>
                    </td>
                    <td className="py-3 font-semibold">{r.name}</td>
                    <td className="py-3">
                      <span className={`badge ${r.badgeClass}`}>{r.badge}</span>
                    </td>
                    <td className="py-3 text-right font-bold text-primary">{r.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
