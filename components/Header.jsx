"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("night");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    setTheme(saved || "night");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "day" ? "night" : "day";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 shadow-sm bg-[var(--card-bg)]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center mr-3">
            <span className="text-white text-xl">💰</span>
          </div>
          <h1 className="text-xl font-bold text-[var(--text)]">MAZA FINANCE</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/maza" className="nav-link">Dashboard</Link>
          <Link href="/investment" className="nav-link">News</Link>
          <Link href="/finance-ai" className="nav-link">Financial AI</Link>
          <Link href="/games" className="nav-link">Games</Link>
          <Link href="/kentang" className="nav-link">Manajemen Keuangan</Link>
        </nav>

        <div className="flex items-center space-x-3">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-[var(--card-hover)]">
            {theme === "day" ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden text-[var(--text)]">
            <span className="text-2xl">☰</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[var(--card-bg)] shadow-lg">
          <Link href="/maza" className="mobile-link">Dashboard</Link>
          <Link href="/investment" className="mobile-link">News</Link>
          <Link href="/finance-ai" className="mobile-link">Financial AI</Link>
          <Link href="/games" className="mobile-link">Games</Link>
          <Link href="/kentang" className="mobile-link">Manajemen Keuangan</Link>
        </div>
      )}
    </header>
  );
}
