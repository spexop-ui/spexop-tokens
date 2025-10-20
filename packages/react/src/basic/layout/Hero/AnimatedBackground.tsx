import { useEffect, useRef, useState } from "react";
import styles from "./AnimatedBackground.module.css";

/**
 * Particle configuration
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  color: string;
}

/**
 * AnimatedBackground props
 */
export interface AnimatedBackgroundProps {
  /**
   * Background pattern variant
   * @default "particles"
   */
  variant?: "particles" | "gradient" | "mesh";

  /**
   * Animation intensity
   * @default "medium"
   */
  intensity?: "low" | "medium" | "high";

  /**
   * Custom colors for particles (CSS color values)
   * Defaults to theme-based colors
   */
  colors?: string[];

  /**
   * Additional CSS class
   */
  className?: string;
}

/**
 * AnimatedBackground - Canvas-based animated background patterns
 * Performance-optimized with RequestAnimationFrame
 * Respects prefers-reduced-motion
 */
export function AnimatedBackground({
  variant = "particles",
  intensity = "medium",
  colors,
  className = "",
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Animation loop
  useEffect(() => {
    // Get particle count based on intensity
    const getParticleCount = () => {
      switch (intensity) {
        case "low":
          return 15; // Reduced from 20
        case "high":
          return 50; // Reduced from 60
        default:
          return 30; // Reduced from 40 (medium is the new default)
      }
    };

    // Get speed multiplier based on intensity
    const getSpeedMultiplier = () => {
      switch (intensity) {
        case "low":
          return 0.25; // Slightly slower
        case "high":
          return 0.7; // Slightly slower
        default:
          return 0.4; // Reduced from 0.5 for calmer movement
      }
    };

    // Initialize particles
    const initParticles = (width: number, height: number) => {
      const count = getParticleCount();
      const speedMultiplier = getSpeedMultiplier();
      const defaultColors = colors || [
        "rgba(239, 68, 68, 0.2)", // red-500 - more subtle
        "rgba(239, 68, 68, 0.12)", // red-500 - very subtle
        "rgba(148, 163, 184, 0.18)", // neutral-400 - more subtle
        "rgba(148, 163, 184, 0.08)", // neutral-400 - very subtle
      ];

      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speedMultiplier,
        vy: (Math.random() - 0.5) * speedMultiplier,
        radius: Math.random() * 2.5 + 0.8, // Slightly smaller particles
        opacity: Math.random() * 0.4 + 0.2, // Lower opacity range
        color: defaultColors[Math.floor(Math.random() * defaultColors.length)],
      }));
    };

    // Draw particles
    const drawParticles = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
    ) => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    // Draw gradient mesh
    const drawGradientMesh = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
    ) => {
      // Create radial gradients that move slowly
      const time = Date.now() * 0.0002; // Slower animation

      // Gradient 1 - more subtle
      const gradient1 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(time) * 80,
        height * 0.3 + Math.cos(time) * 80,
        0,
        width * 0.3 + Math.sin(time) * 80,
        height * 0.3 + Math.cos(time) * 80,
        width * 0.5,
      );
      gradient1.addColorStop(0, "rgba(239, 68, 68, 0.08)"); // Reduced opacity
      gradient1.addColorStop(1, "rgba(239, 68, 68, 0)");

      // Gradient 2 - more subtle
      const gradient2 = ctx.createRadialGradient(
        width * 0.7 + Math.cos(time * 1.2) * 80,
        height * 0.6 + Math.sin(time * 1.2) * 80,
        0,
        width * 0.7 + Math.cos(time * 1.2) * 80,
        height * 0.6 + Math.sin(time * 1.2) * 80,
        width * 0.6,
      );
      gradient2.addColorStop(0, "rgba(148, 163, 184, 0.06)"); // Reduced opacity
      gradient2.addColorStop(1, "rgba(148, 163, 184, 0)");

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, width, height);
    };

    // Draw mesh pattern
    const drawMesh = (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
    ) => {
      const time = Date.now() * 0.0003; // Slower animation
      ctx.clearRect(0, 0, width, height);

      // Draw animated mesh lines - more subtle
      ctx.strokeStyle = "rgba(239, 68, 68, 0.06)"; // Reduced opacity
      ctx.lineWidth = 1;

      const gridSize = 90; // Larger grid for less density
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const offsetX = Math.sin(time + x * 0.008) * 8;
          const offsetY = Math.cos(time + y * 0.008) * 8;

          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(239, 68, 68, 0.12)"; // Reduced opacity
          ctx.fill();

          if (x + gridSize < width) {
            ctx.beginPath();
            ctx.moveTo(x + offsetX, y + offsetY);
            ctx.lineTo(
              x + gridSize + Math.sin(time + (x + gridSize) * 0.008) * 8,
              y + offsetY,
            );
            ctx.stroke();
          }

          if (y + gridSize < height) {
            ctx.beginPath();
            ctx.moveTo(x + offsetX, y + offsetY);
            ctx.lineTo(
              x + offsetX,
              y + gridSize + Math.cos(time + (y + gridSize) * 0.008) * 8,
            );
            ctx.stroke();
          }
        }
      }
    };
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;

      if (variant === "particles") {
        initParticles(width, height);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    // Animation loop
    const animate = () => {
      const { width, height } = canvas;

      switch (variant) {
        case "particles":
          drawParticles(ctx, width, height);
          break;
        case "gradient":
          drawGradientMesh(ctx, width, height);
          break;
        case "mesh":
          drawMesh(ctx, width, height);
          break;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [variant, intensity, colors, prefersReducedMotion]);

  if (prefersReducedMotion) {
    // Show static gradient instead
    return (
      <div
        className={`${styles.animatedBackground} ${styles.animatedBackgroundStatic} ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`${styles.animatedBackground} ${className}`}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

AnimatedBackground.displayName = "AnimatedBackground";
