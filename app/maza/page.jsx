"use client";

import { useEffect, useRef } from "react";

export default function AuroraHero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Aurora animation
    const animate = () => {
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, `hsla(${200 + Math.sin(time) * 20}, 70%, 20%, 0.8)`);
      gradient.addColorStop(0.5, `hsla(${250 + Math.cos(time * 0.7) * 30}, 60%, 30%, 0.6)`);
      gradient.addColorStop(1, `hsla(${180 + Math.sin(time * 0.5) * 40}, 80%, 15%, 0.9)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Aurora waves
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.5 + i * 100);
        
        for (let x = 0; x <= canvas.width; x += 10) {
          const y = canvas.height * 0.5 + 
            Math.sin((x + time * 100) * 0.01) * 50 +
            Math.sin((x + time * 150) * 0.005) * 80 +
            i * 80;
          ctx.lineTo(x, y);
        }
        
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        const waveGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        waveGradient.addColorStop(0, `hsla(${120 + i * 40 + Math.sin(time) * 20}, 70%, 50%, 0.1)`);
        waveGradient.addColorStop(1, `hsla(${120 + i * 40 + Math.sin(time) * 20}, 70%, 30%, 0.3)`);
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)" }}
    />
  );
}