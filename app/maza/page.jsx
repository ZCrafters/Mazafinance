"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "@/styles/pages/maza.css"; // CSS yang kita pisahkan dari <style> maza.html

export default function MazaPage() {
  const chartRef = useRef(null);

  useEffect(() => {
    // ----- Generate 3D-ish finance bars (DOM) persis versi HTML -----
    const chartContainer = chartRef.current;
    if (!chartContainer) return;

    const categories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const values = [120, 180, 150, 200, 170, 220];
    const maxValue = Math.max(...values);

    chartContainer.innerHTML = "";

    // grid lines
    for (let i = 0; i <= 5; i++) {
      const gridLine = document.createElement("div");
      gridLine.className = "absolute left-0 right-0 h-px bg-gray-200";
      gridLine.style.bottom = `${i * 50}px`;
      chartContainer.appendChild(gridLine);
    }

    categories.forEach((category, index) => {
      const barHeight = (values[index] / maxValue) * 200;

      const barWrapper = document.createElement("div");
      barWrapper.className = "absolute bottom-0 transform-style-preserve-3d";
      barWrapper.style.left = `${index * 50 + 20}px`;
      barWrapper.style.width = "30px";
      barWrapper.style.height = `${barHeight}px`;
      barWrapper.style.transform = "translateZ(20px)";
      // animation
      barWrapper.style.transition = "all 0.5s ease";
      barWrapper.style.opacity = "0";
      barWrapper.style.transform = "translateZ(20px) translateY(50px)";

      const barFront = document.createElement("div");
      barFront.className =
        "absolute bottom-0 w-full h-full bg-gradient-to-t from-sage-500 to-sage-300 rounded-t-md";
      barFront.style.transform = "translateZ(15px)";
      barFront.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";

      const barSide = document.createElement("div");
      barSide.className = "absolute bottom-0 right-0 w-3 h-full bg-sage-600 rounded-tr-md";
      barSide.style.transform = "rotateY(90deg) translateX(15px) translateZ(15px)";

      const barTop = document.createElement("div");
      barTop.className = "absolute top-0 w-full h-3 bg-sage-400 rounded-t-md";
      barTop.style.transform = "rotateX(90deg) translateY(-15px) translateZ(15px)";

      barWrapper.appendChild(barFront);
      barWrapper.appendChild(barSide);
      barWrapper.appendChild(barTop);
      chartContainer.appendChild(barWrapper);

      const label = document.createElement("div");
      label.className = "absolute text-sm font-medium text-gray-600";
      label.textContent = category;
      label.style.bottom = "-25px";
      label.style.left = `${index * 50 + 20}px`;
      label.style.width = "30px";
      label.style.textAlign = "center";
      chartContainer.appendChild(label);

      setTimeout(() => {
        barWrapper.style.opacity = "1";
        barWrapper.style.transform = "translateZ(20px)";
      }, index * 100);
    });

    // Simulate AI conversation bubble append (seperti di HTML)
    setTimeout(() => {
      const firstBubble = document.querySelector(".ai-bubble");
      if (!firstBubble || !firstBubble.parentNode) return;
      const aiResponse = document.createElement("div");
      aiResponse.className = "ai-bubble bg-white p-3 mt-2";
      aiResponse.innerHTML =
        '<p class="text-sm">For Rp 2M/month, I recommend starting with low-risk mutual funds and gold ETFs.</p>';
      firstBubble.parentNode.appendChild(aiResponse);
    }, 3000);
  }, []);

  return (
    <div className="bg-sage-50 font-sans text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-sage-500 flex items-center justify-center mr-3">
              <i className="fas fa-piggy-bank text-white text-xl" />
            </div>
            <h1 className="text-2xl font-display font-bold text-sage-700">MAZA FINANCE</h1>
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
            <button className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded-full font-medium transition flex items-center">
              <i className="fas fa-lock mr-2" /> Sign In
            </button>
            <button className="md:hidden text-sage-700">
              <i className="fas fa-bars text-2xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-bg">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-sage-800 mb-4">
              Banking Made <span className="text-accent-500">Fun</span> for New Generation
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Track expenses, invest wisely, and play your way to financial freedom with Maza
              Bank&apos;s AI-powered tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-sage-600 hover:bg-sage-700 text-white px-6 py-3 rounded-full font-medium transition flex items-center">
                Get Started <i className="fas fa-arrow-right ml-2" />
              </button>
              <button className="border-2 border-sage-500 text-sage-600 hover:bg-sage-50 px-6 py-3 rounded-full font-medium transition flex items-center">
                <i className="fas fa-play-circle mr-2" /> Watch Demo
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-72 h-72 bg-sage-400 rounded-3xl transform rotate-6" />
              <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-3xl shadow-xl p-6 transform -rotate-3">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-500 text-sm">Total Balance</p>
                    <h3 className="text-2xl font-bold text-sage-800">Rp 8,250,000</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-sage-100 flex items-center justify-center">
                    <i className="fas fa-wallet text-sage-600" />
                  </div>
                </div>

                <div ref={chartRef} className="finance-chart mb-6 relative" />

                <div className="flex justify-between">
                  <button className="bg-sage-100 text-sage-700 px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-arrow-up mr-2" />
                    Send
                  </button>
                  <button className="bg-sage-100 text-sage-700 px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-arrow-down mr-2" />
                    Request
                  </button>
                  <button className="bg-sage-100 text-sage-700 px-4 py-2 rounded-lg flex items-center">
                    <i className="fas fa-qrcode mr-2" />
                    Pay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-sage-800 mb-4">
              Your Financial Superpowers
            </h2>
            <p className="text-gray-600">
              Maza Bank combines banking, AI insights, and gamified investing to make finance
              simple and engaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Smart Tracking */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-sage-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sage-400 to-accent-400" />
              <div className="feature-icon bg-sage-50 text-sage-600 mx-auto group-hover:bg-sage-100 group-hover:text-sage-700 transition-all">
                <i className="fas fa-chart-line text-3xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-sage-800 mb-3 text-center">
                Smart Tracking
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Automatically categorize expenses and visualize your spending patterns.
              </p>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Food &amp; Drinks</span>
                  <span className="text-sm font-medium">Rp 1.2M</span>
                </div>
                <div className="progress-bar bg-sage-100">
                  <div className="progress-fill" style={{ width: "65%" }} />
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Entertainment</span>
                  <span className="text-sm font-medium">Rp 850K</span>
                </div>
                <div className="progress-bar bg-sage-100">
                  <div className="progress-fill" style={{ width: "45%" }} />
                </div>
              </div>
            </div>

            {/* AI Assistant */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-sage-100 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-sage-400" />
              <div className="feature-icon bg-sage-50 text-sage-600 mx-auto group-hover:bg-sage-100 group-hover:text-sage-700 transition-all">
                <i className="fas fa-robot text-3xl" />
              </div>
              <h3 className="text-xl font-display font-bold text-sage-800 mb-3 text-center">
                AI Finance Assistant
              </h3>
              <p className="text-gray-600 mb-6 text-center">
                Get personalized financial advice and projections based on your spending habits.
              </p>

              <div className="bg-sage-50 rounded-xl p-4 mb-3">
                <div className="ai-bubble bg-white p-3 mb-2">
                  <p className="text-sm">
                    Based on your spending, you could save Rp 450K/month by reducing dining out.
                  </p>
                </div>
                <div className="user-bubble bg-sage-100 p-3 ml-8">
                  <p className="text-sm">What investments suit a Rp 2M/month budget?</p>
                </div>
              </div>

              <button className="w-full bg-sage-100 hover:bg-sage-200 text-sage-700 py-2 rounded-lg font-medium">
                Ask Maza AI
              </button>
            </div>

            {/* Investment Game */}
            <div className="group relative game-card rounded-2xl shadow-xl p-8 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/30 to-white/50" />
              <div className="feature-icon bg-white/20 mx-auto group-hover:bg-white/30 transition-all">
                <i className="fas fa-gamepad text-3xl" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3 text-center">Investment Games</h3>
              <p className="mb-6 text-center opacity-90">
                Learn investing through fun simulations with real rewards.
              </p>

              <div className="flex justify-between mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold">3</div>
                            <div className="text-sm opacity-80">Games Played</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">Rp 120K</div>
                            <div className="text-sm opacity-80">Earned</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold">12</div>
                            <div className="text-sm opacity-80">Badges</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
