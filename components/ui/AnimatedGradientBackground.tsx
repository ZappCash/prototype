"use client";

import { useEffect, useRef } from "react";

export function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    let animationFrameId: number;
    let time = 0;

    // Generate noise/texture for organic effect
    const generateNoise = () => {
      const noiseCanvas = document.createElement('canvas');
      noiseCanvas.width = canvas.width;
      noiseCanvas.height = canvas.height;
      const noiseCtx = noiseCanvas.getContext('2d');
      if (!noiseCtx) return noiseCanvas;

      const imageData = noiseCtx.createImageData(noiseCanvas.width, noiseCanvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;
        data[i + 1] = noise;
        data[i + 2] = noise;
        data[i + 3] = 15; // Very subtle
      }

      noiseCtx.putImageData(imageData, 0, 0);
      return noiseCanvas;
    };

    const noiseTexture = generateNoise();

    const animate = () => {
      time += 0.008; // Slower and more subtle animation

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // ===== STEP 1: Vertical base gradient (darker at top) =====
      const baseGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      baseGradient.addColorStop(0, "#000000");    // Absolute black at top
      baseGradient.addColorStop(0.2, "#0a0a0a");
      baseGradient.addColorStop(0.4, "#0d100d");
      baseGradient.addColorStop(0.6, "#0f130f");
      baseGradient.addColorStop(0.75, "#111811"); // More gradual transition
      baseGradient.addColorStop(0.88, "#142014");
      baseGradient.addColorStop(1, "#1a2e1a");    // Dark green at bottom

      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const bottomY = canvas.height * 0.85; // Adjusted core position

      // More dramatic pulsation for Exodus-like effect
      const pulse = Math.sin(time * 0.5) * 0.12 + 0.92; // 0.80 - 1.04

      // ===== STEP 2: MASSIVE GLOW - Layer 1 (GIANT Atmosphere) =====
      // Covers ENTIRE screen with elliptical glow (wider than tall)
      const hugeGlow = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 1.5 // Maximum expansion to cover more area
      );

      hugeGlow.addColorStop(0, `rgba(0, 255, 136, ${0.95 * pulse})`);
      hugeGlow.addColorStop(0.08, `rgba(0, 255, 136, ${0.85 * pulse})`);
      hugeGlow.addColorStop(0.15, `rgba(0, 230, 115, ${0.75 * pulse})`);
      hugeGlow.addColorStop(0.25, `rgba(0, 204, 102, ${0.6 * pulse})`);
      hugeGlow.addColorStop(0.35, `rgba(0, 180, 90, ${0.48 * pulse})`);
      hugeGlow.addColorStop(0.45, `rgba(0, 153, 77, ${0.38 * pulse})`);
      hugeGlow.addColorStop(0.58, `rgba(0, 120, 60, ${0.25 * pulse})`);
      hugeGlow.addColorStop(0.72, `rgba(0, 90, 45, ${0.12 * pulse})`);
      hugeGlow.addColorStop(1, "transparent");

      ctx.filter = "blur(140px)"; // Giant blur
      ctx.globalCompositeOperation = "screen";
      ctx.fillStyle = hugeGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== STEP 3: MASSIVE GLOW - Layer 2 (High intensity) =====
      const largeGlow = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 1.0 // Larger radius
      );

      largeGlow.addColorStop(0, `rgba(0, 255, 136, 1.0)`); // Maximum intensity
      largeGlow.addColorStop(0.1, `rgba(0, 255, 136, ${0.95 * pulse})`);
      largeGlow.addColorStop(0.2, `rgba(50, 255, 150, ${0.85 * pulse})`);
      largeGlow.addColorStop(0.32, `rgba(0, 230, 115, ${0.72 * pulse})`);
      largeGlow.addColorStop(0.48, `rgba(0, 204, 102, ${0.55 * pulse})`);
      largeGlow.addColorStop(0.65, `rgba(0, 153, 77, ${0.35 * pulse})`);
      largeGlow.addColorStop(0.82, "transparent");

      ctx.filter = "blur(100px)";
      ctx.fillStyle = largeGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== STEP 4: INTENSE GLOW - Layer 3 (More concentrated) =====
      const mediumGlow = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 0.55
      );

      mediumGlow.addColorStop(0, `rgba(100, 255, 170, ${1.0 * pulse})`);
      mediumGlow.addColorStop(0.12, `rgba(50, 255, 150, ${0.92 * pulse})`);
      mediumGlow.addColorStop(0.25, `rgba(0, 255, 136, ${0.8 * pulse})`);
      mediumGlow.addColorStop(0.4, `rgba(0, 230, 115, ${0.65 * pulse})`);
      mediumGlow.addColorStop(0.58, `rgba(0, 204, 102, ${0.45 * pulse})`);
      mediumGlow.addColorStop(0.78, "transparent");

      ctx.filter = "blur(70px)";
      ctx.fillStyle = mediumGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== STEP 5: BRIGHT CORE (reduced - more green than white) =====
      const brightCore = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 0.35
      );

      // More green colors, less white
      brightCore.addColorStop(0, `rgba(180, 255, 210, ${0.9 * pulse})`); // Light green instead of white
      brightCore.addColorStop(0.12, `rgba(140, 255, 190, ${0.8 * pulse})`);
      brightCore.addColorStop(0.25, `rgba(80, 255, 160, ${0.7 * pulse})`);
      brightCore.addColorStop(0.4, `rgba(0, 255, 136, ${0.6 * pulse})`);
      brightCore.addColorStop(0.6, `rgba(0, 230, 115, ${0.4 * pulse})`);
      brightCore.addColorStop(0.85, "transparent");

      ctx.filter = "blur(50px)";
      ctx.fillStyle = brightCore;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== STEP 6: CENTRAL CORE (more subtle) =====
      const superCore = ctx.createRadialGradient(
        centerX,
        bottomY,
        0,
        centerX,
        bottomY,
        canvas.height * 0.18
      );

      superCore.addColorStop(0, `rgba(200, 255, 220, ${0.85 * pulse})`); // Very light green but not white
      superCore.addColorStop(0.15, `rgba(140, 255, 190, ${0.75 * pulse})`);
      superCore.addColorStop(0.35, `rgba(80, 255, 160, ${0.6 * pulse})`);
      superCore.addColorStop(0.6, `rgba(0, 255, 136, ${0.45 * pulse})`);
      superCore.addColorStop(0.85, "transparent");

      ctx.filter = "blur(30px)";
      ctx.fillStyle = superCore;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ===== STEP 7: Texture/Noise for organic effect =====
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 0.15;
      ctx.filter = "none";
      ctx.drawImage(noiseTexture, 0, 0);
      ctx.globalAlpha = 1.0;

      // Reset
      ctx.globalCompositeOperation = "source-over";
      ctx.filter = "none";

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
}
