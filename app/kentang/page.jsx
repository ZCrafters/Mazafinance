"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import "@/styles/pages/kentang.css";

export default function KentangPage() {
  // ===== THEME =====
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "day" : "day"
  );
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (typeof window !== "undefined") localStorage.setItem("theme", theme);
  }, [theme]);

  // ===== STATE =====
  const [data, setData] = useState({}); // { "2025": {"Januari":[{...}] } }
  const [year, setYear] = useState(() => new Date().getFullYear().toString());
  const [monthIdx, setMonthIdx] = useState(() => new Date().getMonth());
  const [ySummaryYear, setYSummaryYear] = useState(() => new Date().getFullYear().toString());

  // form refs
  const dateRef = useRef(null);
  const categoryRef = useRef(null);
  const descRef = useRef(null);
  const typeRef = useRef(null);
  const amountRef = useRef(null);

  // ===== LOAD/SAVE LOCALSTORAGE =====
  useEffect(() => {
    const saved = localStorage.getItem("financialData_v6");
    if (saved) setData(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("financialData_v6", JSON.stringify(data));
  }, [data]);

  // ===== HELPERS =====
  const months = useMemo(
    () => ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
    []
  );
  const fmtIDR = (n) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);

  const monthName = months[monthIdx];
  const monthlyTx = data?.[year]?.[monthName] ?? [];

  const totals = useMemo(() => {
    const income = monthlyTx.filter(t => t.type === "Pendapatan").reduce((s,t)=>s+t.amount,0);
    const expense = monthlyTx.filter(t => t.type === "Pengeluaran").reduce((s,t)=>s+t.amount,0);
    return { income, expense, balance: income - expense };
  }, [monthlyTx]);

  const categoryExpense = useMemo(() => {
    const acc = {};
    monthlyTx
      .filter(t=>t.type==="Pengeluaran")
      .forEach(t => { acc[t.category] = (acc[t.category] || 0) + t.amount; });
    return acc;
  }, [monthlyTx]);

  // ===== THREE.JS BG =====
  const bgRef = useRef(null);
  useEffect(() => {
    let renderer, scene, camera, crystal, raf;
    let mouseX=0, mouseY=0;
    let disposed=false;

    (async () => {
      const THREE = (await import("three")).default;
      const canvas = bgRef.current;
      if (!canvas) return;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ canvas, alpha:true, antialias:true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const geo = new THREE.IcosahedronGeometry(1.5, 0);
      const mat = new THREE.MeshStandardMaterial({ color: 0x84a98c, metalness: .3, roughness: .6 });
      crystal = new THREE.Mesh(geo, mat);
      scene.add(crystal);

      scene.add(new THREE.AmbientLight(0xffffff, .7));
      const pt = new THREE.PointLight(0xffffff, .8);
      pt.position.set(5,5,5);
      scene.add(pt);

      camera.position.z = 5;

      const onMouse = (e)=> {
        mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      };
      const onResize = ()=>{
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("mousemove", onMouse);
      window.addEventListener("resize", onResize);

      const animate=()=>{
        if (disposed) return;
        raf = requestAnimationFrame(animate);
        crystal.rotation.x += 0.0005 + (mouseY - crystal.rotation.x)*0.05;
        crystal.rotation.y += 0.001 + (mouseX - crystal.rotation.y)*0.05;
        renderer.render(scene, camera);
      };
      animate();
    })();

    return ()=>{ disposed=true; cancelAnimationFrame(raf); renderer?.dispose(); };
  }, []);

  // ===== CHART.JS (Donut for monthly expenses) =====
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  useEffect(() => {
    (async () => {
      const { Chart, ArcElement, Tooltip, Legend } = await import("chart.js");
      Chart.register(ArcElement, Tooltip, Legend);

      const ctx = chartRef.current?.getContext("2d");
      if (!ctx) return;

      // destroy old
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const styles = getComputedStyle(document.documentElement);
      const gridColor = styles.getPropertyValue("--chart-grid")?.trim() || "#e0e4e1";
      Chart.defaults.borderColor = gridColor;
      Chart.defaults.color = styles.getPropertyValue("--text")?.trim() || "#2f3e46";

      const labels = Object.keys(categoryExpense);
      const values = Object.values(categoryExpense);

      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels,
          datasets: [
            {
              data: values,
              borderWidth: 0,
              backgroundColor: ["#52b788","#fca311","#e63946","#a3b18a","#2f3e46","#84a98c"]
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (c) => `${c.label}: ${fmtIDR(c.raw)}`
              }
            }
          }
        }
      });
    })();
    // cleanup handled on next render by destroy above
  }, [categoryExpense, theme]);

  // ===== YEAR SELECT OPTIONS =====
  const allYears = useMemo(() => {
    const set = new Set(Object.keys(data));
    set.add(new Date().getFullYear().toString());
    return Array.from(set).sort((a,b)=>b-a);
  }, [data]);

  // ===== ACTIONS =====
  const addTx = (e) => {
    e.preventDefault();
    const date = dateRef.current.value;
    const category = categoryRef.current.value;
    const description = descRef.current.value.trim();
    const type = typeRef.current.value;
    const amount = parseFloat(amountRef.current.value || "0");

    if (!date || !category || !description || !type || !amount) return;

    const y = new Date(date).getFullYear().toString();
    const m = months[new Date(date).getMonth()];

    setData(prev => {
      const next = { ...prev };
      if (!next[y]) next[y] = {};
      if (!next[y][m]) next[y][m] = [];
      next[y][m] = [...next[y][m], { date, category, description, type, amount }];
      return next;
    });

    // reset form
    descRef.current.value = "";
    amountRef.current.value = "";
    categoryRef.current.value = "";
    typeRef.current.value = "";
    dateRef.current.value = new Date().toISOString().substring(0,10);
  };

  const deleteTx = (idx) => {
    setData(prev => {
      const next = structuredClone(prev);
      next[year][monthName].splice(idx, 1);
      return next;
    });
  };

  // prepare yearly table rows
  const yearlyRows = useMemo(() => {
    const ydata = data?.[ySummaryYear] || {};
    const rows = [];
    for (let i=0;i<12;i++){
      const m = months[i];
      const list = ydata[m] || [];
      const inc = list.filter(t=>t.type==="Pendapatan").reduce((s,t)=>s+t.amount,0);
      const exp = list.filter(t=>t.type==="Pengeluaran").reduce((s,t)=>s+t.amount,0);
      rows.push({ m, inc, exp, bal: inc-exp });
    }
    return rows;
  }, [data, ySummaryYear, months]);

  // init default form date once
  useEffect(()=>{
    dateRef.current && (dateRef.current.valueAsDate = new Date());
  },[]);

  // ====== RENDER ======
  return (
    <div className="kentang-page" data-theme={theme}>
      <canvas ref={bgRef} className="bg3d" />

      {/* HEADER */}
      <header className="header">
        <div className="container row">
          <div className="brand">
            <div className="brand-icon"><i className="fas fa-piggy-bank text-white" /></div>
            <h1 className="brand-title">MAZA FINANCE</h1>
          </div>

          <nav className="nav">
            <Link href="/maza" className="nav-link">Dashboard</Link>
            <Link href="/investment" className="nav-link">News</Link>
            <Link href="/finance-ai" className="nav-link">Financial AI</Link>
            <Link href="/games" className="nav-link">Games</Link>
            <Link href="/kentang" className="nav-link active">Manajemen Keuangan</Link>
          </nav>

          <div className="actions">
            <button className="btn-signin"><i className="fas fa-lock mr-2"></i> Sign In</button>
            <button className="btn-theme" onClick={()=>setTheme(theme==="day"?"night":"day")} aria-label="Toggle Theme">
              <span className={`sun ${theme==="day"?"":"hidden"}`}>☀️</span>
              <span className={`moon ${theme==="night"?"":"hidden"}`}>🌙</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="container content">
        <header className="text-center mb-10">
          <h1 className="title">Financial Dashboard</h1>
          <p className="subtitle">Kelola keuanganmu dengan cerdas.</p>
        </header>

        {/* FORM */}
        <section className="card mb-8 p-6">
          <h2 className="section-title">✏️ Catat Transaksi Baru</h2>
          <form onSubmit={addTx} className="form-grid">
            <div className="form-item">
              <label className="label">Tanggal</label>
              <input ref={dateRef} type="date" className="form-input" required />
            </div>

            <div className="form-item">
              <label className="label">Kategori</label>
              <select ref={categoryRef} className="form-input" required>
                <option value="">Pilih Kategori</option>
                <optgroup label="💰 Pendapatan">
                  <option value="Gaji">💼 Gaji</option>
                  <option value="Investasi">📈 Investasi</option>
                  <option value="Hadiah">🎁 Hadiah</option>
                  <option value="Lain-lain Pendapatan">✨ Lain-lain</option>
                </optgroup>
                <optgroup label="💸 Pengeluaran">
                  <option value="Makanan & Minuman">🍔 Makanan & Minuman</option>
                  <option value="Transportasi">🚕 Transportasi</option>
                  <option value="Tagihan">💡 Tagihan</option>
                  <option value="Hiburan">🎬 Hiburan</option>
                  <option value="Pendidikan">📚 Pendidikan</option>
                  <option value="Kesehatan">🏥 Kesehatan</option>
                  <option value="Belanja">🛍️ Belanja</option>
                  <option value="Lain-lain Pengeluaran">✨ Lain-lain</option>
                </optgroup>
              </select>
            </div>

            <div className="form-item">
              <label className="label">Deskripsi</label>
              <input ref={descRef} type="text" placeholder="Makan siang..." className="form-input" required />
            </div>

            <div className="form-item">
              <label className="label">Tipe</label>
              <select ref={typeRef} className="form-input" required>
                <option value="">Pilih Tipe</option>
                <option value="Pendapatan">⬆️ Pendapatan</option>
                <option value="Pengeluaran">⬇️ Pengeluaran</option>
              </select>
            </div>

            <div className="form-item">
              <label className="label">Jumlah (IDR)</label>
              <input ref={amountRef} type="number" min="0" step="any" placeholder="50000" className="form-input" required />
            </div>

            <div className="form-item">
              <button type="submit" className="btn-primary w-full">➕ Tambah</button>
            </div>
          </form>
        </section>

        {/* FILTERS + SUMMARY */}
        <section className="card mb-8 p-6">
          <div className="row-split mb-4">
            <h2 className="section-title">📊 Ringkasan Bulanan</h2>

            <div className="filters">
              <select value={year} onChange={(e)=>setYear(e.target.value)} className="form-input">
                {allYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
              <select value={monthIdx} onChange={(e)=>setMonthIdx(parseInt(e.target.value))} className="form-input">
                {months.map((m,i)=><option key={m} value={i}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid-3 mb-6">
            <div className="pill pill-income">
              <p className="pill-label">Total Pendapatan</p>
              <p className="pill-value">{fmtIDR(totals.income)}</p>
            </div>
            <div className="pill pill-expense">
              <p className="pill-label">Total Pengeluaran</p>
              <p className="pill-value">{fmtIDR(totals.expense)}</p>
            </div>
            <div className="pill pill-balance">
              <p className="pill-label">Saldo Bulan Ini</p>
              <p className="pill-value">{fmtIDR(totals.balance)}</p>
            </div>
          </div>

          <div className="grid gap-4 grid-cols-1 lg:grid-cols-5">
            {/* list */}
            <div className="lg:col-span-3">
              <h3 className="subhead">Daftar Transaksi</h3>
              <div className="tx-list">
                {monthlyTx.length === 0 ? (
                  <p className="muted">Belum ada transaksi.</p>
                ) : (
                  monthlyTx.map((t, i) => (
                    <div key={i} className={`tx ${t.type.toLowerCase()}`}>
                      <div className="tx-main">
                        <p className="tx-title">{t.description}</p>
                        <p className="tx-cat">{t.category}</p>
                      </div>
                      <div className="tx-right">
                        <p className={`tx-amount ${t.type.toLowerCase()}`}>{fmtIDR(t.amount)}</p>
                        <p className="tx-date">
                          {new Date(t.date).toLocaleDateString("id-ID",{day:"2-digit",month:"short"})}
                        </p>
                      </div>
                      <button className="tx-del" onClick={()=>deleteTx(i)} title="Hapus">
                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" />
                        </svg>
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* chart */}
            <div className="lg:col-span-2">
              <h3 className="subhead">Grafik Pengeluaran</h3>
              <div className="chart-wrap">
                <canvas ref={chartRef} />
              </div>
            </div>
          </div>
        </section>

        {/* YEARLY + PROJECTION (table only, sama seperti HTML—grafik proyeksi bisa ditambah nanti) */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="card p-6">
            <h2 className="section-title">📅 Ringkasan Tahunan</h2>
            <div className="mb-4">
              <label className="label">Pilih Tahun</label>
              <select className="form-input w-48" value={ySummaryYear} onChange={(e)=>setYSummaryYear(e.target.value)}>
                {allYears.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="table-wrap">
              <table className="w-full">
                <thead>
                  <tr>
                    <th>Bulan</th>
                    <th>Pendapatan</th>
                    <th>Pengeluaran</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyRows.every(r => (r.inc===0 && r.exp===0)) ? (
                    <tr><td colSpan={4} className="muted text-center py-4">Tidak ada data untuk tahun {ySummaryYear}.</td></tr>
                  ) : (
                    yearlyRows.map(r => (
                      <tr key={r.m}>
                        <td>{r.m.substring(0,3)}</td>
                        <td>{fmtIDR(r.inc)}</td>
                        <td>{fmtIDR(r.exp)}</td>
                        <td className={`font-semibold ${r.bal>=0?"text-success":"text-danger"}`}>{fmtIDR(r.bal)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="section-title">🚀 Proyeksi 5 Tahun</h2>
            <p className="muted mb-4">Proyeksi dihitung berdasarkan rata-rata dari semua data transaksi (fitur grafik bisa kita aktifkan nanti).</p>
            <div className="placeholder-projection">Chart Placeholder</div>
          </div>
        </section>
      </main>
    </div>
  );
}