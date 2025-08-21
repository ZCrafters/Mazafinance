"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import "../../styles/pages/finance-ai.css";

export default function FinanceAIPage() {
  // theme
  const [theme, setTheme] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "day" : "day"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // chat
  const [provider, setProvider] = useState("openai"); // 'openai' | 'deepseek'
  const [model, setModel] = useState("gpt-4o-mini");  // default
  const [temperature, setTemperature] = useState(0.7);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => {
    if (typeof window === "undefined") return [];
    return JSON.parse(localStorage.getItem("finance_ai_history_v1") || "[]");
  });
  const [loading, setLoading] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("finance_ai_history_v1", JSON.stringify(messages));
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const content = input.trim();
    if (!content || loading) return;
    const userMsg = { role: "user", content, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`/api/${provider}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model, temperature, messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })) })
      });
      if (!res.ok) throw new Error("API error");
      // support both {message:{content}} and streaming text
      const data = await res.json();
      const aiContent = data?.message?.content || data?.content || "Maaf, tidak ada respons.";
      setMessages((m) => [...m, { role: "assistant", content: aiContent, ts: Date.now() }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Terjadi kesalahan memanggil API. Cek konfigurasi & kunci API.", ts: Date.now() }]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  // header branding sama gaya
  return (
    <div className="finance-ai-page">
      <header className="header">
        <div className="container row">
          <div className="brand">
            <div className="brand-icon"><i className="fas fa-piggy-bank text-white"></i></div>
            <h1 className="brand-title">MAZA FINANCE</h1>
          </div>
          <nav className="nav">
            <Link href="/maza" className="nav-link">Dashboard</Link>
            <Link href="/investment" className="nav-link">News</Link>
            <Link href="/finance-ai" className="nav-link active">Financial AI</Link>
            <Link href="/games" className="nav-link">Games</Link>
            <Link href="/kentang" className="nav-link">Manajemen Keuangan</Link>
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

      <main className="container content">
        <section className="card p-5 mb-5">
          <div className="toolbar">
            <div className="tool">
              <label>Provider</label>
              <select
                value={provider}
                onChange={(e) => {
                  const p = e.target.value;
                  setProvider(p);
                  setModel(p === "openai" ? "gpt-4o-mini" : "deepseek-chat");
                }}
              >
                <option value="openai">OpenAI</option>
                <option value="deepseek">DeepSeek</option>
              </select>
            </div>

            <div className="tool">
              <label>Model</label>
              <input
                value={model}
                onChange={(e)=>setModel(e.target.value)}
                className="input"
                placeholder={provider==="openai"?"gpt-4o-mini":"deepseek-chat"}
              />
            </div>

            <div className="tool">
              <label>Temperature: {temperature.toFixed(1)}</label>
              <input
                type="range"
                min="0" max="1" step="0.1"
                value={temperature}
                onChange={(e)=>setTemperature(parseFloat(e.target.value))}
              />
            </div>

            <div className="grow" />
            <button className="btn-outline" onClick={clearChat}>Clear</button>
          </div>
        </section>

        <section className="grid-col">
          {/* Chat Panel */}
          <div className="card chat">
            <div className="chat-scroll" ref={scrollerRef}>
              {messages.length === 0 && (
                <div className="empty">
                  <h3>Halo! 👋</h3>
                  <p>Tanya apa saja tentang budgeting, investasi, & rencana keuangan. Contoh:</p>
                  <ul>
                    <li>“Bikin alokasi 50/30/20 untuk gaji 6 juta.”</li>
                    <li>“Berapa target dana darurat ideal?”</li>
                    <li>“Simulasikan DCA 500rb/bulan di reksadana 8%.”</li>
                  </ul>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i} className={`bubble ${m.role}`}>
                  <div className="avatar">{m.role === "user" ? "🧑" : "🤖"}</div>
                  <div className="content">
                    {m.content.split("\n").map((line, idx)=>(
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="bubble assistant">
                  <div className="avatar">🤖</div>
                  <div className="content typing">
                    <span className="dot" /><span className="dot" /><span className="dot" />
                  </div>
                </div>
              )}
            </div>

            <div className="composer">
              <textarea
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                placeholder="Tulis pesanmu… (Shift+Enter = baris baru)"
                onKeyDown={(e)=>{
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); sendMessage();
                  }
                }}
              />
              <button className="btn-primary" onClick={sendMessage} disabled={loading}>
                {loading ? "Mengirim…" : "Kirim"}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="card tips">
            <h3 className="tips-title">Prompt Cepat</h3>
            <ul className="tips-list">
              <li onClick={()=>setInput("Buat anggaran bulanan untuk gaji 6 juta dengan 50/30/20.")}>Budget 50/30/20</li>
              <li onClick={()=>setInput("Hitung dana darurat ideal untuk pengeluaran 4 juta/bulan.")}>Dana Darurat</li>
              <li onClick={()=>setInput("Simulasi DCA 500rb/bulan selama 5 tahun dengan return 8% p.a.")}>Simulasi DCA</li>
              <li onClick={()=>setInput("Buat roadmap keuangan: dana darurat, proteksi, tujuan, dan investasi.")}>Roadmap Keuangan</li>
            </ul>

            <div className="note">
              <strong>Catatan:</strong> Kunci API dibaca dari <code>.env.local</code> pada server. Jangan commit file itu.
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
