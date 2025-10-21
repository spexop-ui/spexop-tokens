import { useEffect, useRef, useState } from "react";
import { FadeIn, ScaleUp, Stagger } from "../../animations/index.js";
import { Button } from "../../buttons/Button/Button.js";
import { AnimatedBackground } from "./AnimatedBackground.js";
import styles from "./Hero.module.css";
import type { HeroProps } from "./Hero.types.js";

/**
 * Hero component - Animated hero section for landing pages
 *
 * @example
 * ```tsx
 * <Hero
 *   variant="centered"
 *   title="Build Faster with Spexop"
 *   subtitle="Modern design system for React"
 *   description="Production-ready components with 245+ design tokens"
 *   primaryAction={{
 *     label: "Get Started",
 *     onClick: () => navigate('/docs')
 *   }}
 * />
 * ```
 */
export function Hero({
  variant = "centered",
  eyebrow,
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  stats,
  media,
  background = "default",
  align = "center",
  animation,
  backgroundPattern,
  titleLevel = 1,
  ariaLabel,
  className = "",
  style,
}: HeroProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Handle video autoplay with intersection observer
  useEffect(() => {
    if (media?.type === "video" && media.autoplay && videoRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              videoRef.current?.play();
            } else {
              videoRef.current?.pause();
            }
          }
        },
        { threshold: 0.5 },
      );

      observer.observe(videoRef.current);
      return () => observer.disconnect();
    }
  }, [media]);

  // Animation config with defaults
  const animationConfig = {
    disabled: animation?.disabled || prefersReducedMotion,
    sequence: animation?.sequence || "sequential",
    staggerDelay: animation?.staggerDelay || 100,
    entranceDelay: animation?.entranceDelay || 0,
  };

  // Build CSS classes
  const heroClasses = [
    styles.hero,
    styles[`hero--${variant}`],
    styles[`hero--${background}`],
    styles[`hero--align-${align}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Heading component based on titleLevel
  const HeadingTag = `h${titleLevel}` as const as "h1" | "h2";

  // Render eyebrow
  const renderEyebrow = () => {
    if (!eyebrow) return null;

    if (animationConfig.disabled) {
      return <div className={styles.heroEyebrow}>{eyebrow}</div>;
    }

    return (
      <FadeIn direction="down" delay={animationConfig.entranceDelay}>
        <div className={styles.heroEyebrow}>{eyebrow}</div>
      </FadeIn>
    );
  };

  // Render title
  const renderTitle = () => {
    if (animationConfig.disabled) {
      return <HeadingTag className={styles.heroTitle}>{title}</HeadingTag>;
    }

    return (
      <FadeIn
        direction="up"
        delay={
          animationConfig.sequence === "sequential"
            ? animationConfig.entranceDelay + 100
            : animationConfig.entranceDelay
        }
        duration={600}
      >
        <HeadingTag className={styles.heroTitle}>{title}</HeadingTag>
      </FadeIn>
    );
  };

  // Render subtitle
  const renderSubtitle = () => {
    if (!subtitle) return null;

    if (animationConfig.disabled) {
      return <p className={styles.heroSubtitle}>{subtitle}</p>;
    }

    return (
      <FadeIn
        direction="up"
        delay={
          animationConfig.sequence === "sequential"
            ? animationConfig.entranceDelay + 200
            : animationConfig.entranceDelay
        }
        duration={600}
      >
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </FadeIn>
    );
  };

  // Render description
  const renderDescription = () => {
    if (!description) return null;

    if (animationConfig.disabled) {
      return <p className={styles.heroDescription}>{description}</p>;
    }

    return (
      <FadeIn
        direction="up"
        delay={
          animationConfig.sequence === "sequential"
            ? animationConfig.entranceDelay + 300
            : animationConfig.entranceDelay + 100
        }
        duration={600}
      >
        <p className={styles.heroDescription}>{description}</p>
      </FadeIn>
    );
  };

  // Render action buttons
  const renderActions = () => {
    if (!primaryAction && !secondaryAction) return null;

    const buttons = (
      <>
        {primaryAction && (
          <Button
            onClick={primaryAction.onClick}
            variant="primary"
            size="lg"
            aria-label={primaryAction.ariaLabel}
          >
            {primaryAction.iconLeft}
            {primaryAction.label}
            {primaryAction.iconRight}
          </Button>
        )}
        {secondaryAction && (
          <Button
            onClick={secondaryAction.onClick}
            variant="outline"
            size="lg"
            aria-label={secondaryAction.ariaLabel}
          >
            {secondaryAction.iconLeft}
            {secondaryAction.label}
            {secondaryAction.iconRight}
          </Button>
        )}
      </>
    );

    if (animationConfig.disabled) {
      return <div className={styles.heroActions}>{buttons}</div>;
    }

    // Use Stagger for sequential button animations
    if (animationConfig.sequence === "sequential") {
      return (
        <div className={styles.heroActions}>
          <Stagger
            delay={animationConfig.staggerDelay}
            variant="scaleUp"
            duration={400}
          >
            {buttons}
          </Stagger>
        </div>
      );
    }

    // Use ScaleUp for simultaneous
    return (
      <div className={styles.heroActions}>
        <ScaleUp delay={animationConfig.entranceDelay + 400} duration={400}>
          {buttons}
        </ScaleUp>
      </div>
    );
  };

  // Render stats
  const renderStats = () => {
    if (!stats || stats.length === 0) return null;

    const statsContent = (
      <div className={styles.heroStats}>
        {stats.map((stat) => (
          <div key={`${stat.value}-${stat.label}`} className={styles.heroStat}>
            <div className={styles.heroStatValue}>{stat.value}</div>
            <div className={styles.heroStatLabel}>{stat.label}</div>
          </div>
        ))}
      </div>
    );

    if (animationConfig.disabled) {
      return statsContent;
    }

    return (
      <div className={styles.heroStats}>
        <Stagger
          delay={animationConfig.staggerDelay}
          variant="zoomIn"
          duration={400}
        >
          {stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className={styles.heroStat}
            >
              <div className={styles.heroStatValue}>{stat.value}</div>
              <div className={styles.heroStatLabel}>{stat.label}</div>
            </div>
          ))}
        </Stagger>
      </div>
    );
  };

  // Render media
  const renderMedia = () => {
    if (!media) return null;

    const mediaContent =
      media.type === "video" ? (
        <video
          ref={videoRef}
          className={styles.heroMedia}
          src={media.src}
          muted
          loop
          playsInline
          aria-label={media.alt || "Background video"}
        />
      ) : (
        <img
          className={styles.heroMedia}
          src={media.src}
          alt={media.alt || ""}
          loading="lazy"
        />
      );

    return (
      <div className={styles.heroMediaContainer}>
        {mediaContent}
        {media.overlay && <div className={styles.heroMediaOverlay} />}
      </div>
    );
  };

  // Render content section
  const renderContent = () => (
    <div className={styles.heroContent}>
      {renderEyebrow()}
      {renderTitle()}
      {renderSubtitle()}
      {renderDescription()}
      {renderActions()}
      {renderStats()}
    </div>
  );

  return (
    <section
      className={heroClasses}
      style={style}
      aria-label={ariaLabel || "Hero section"}
    >
      {/* Animated Background Pattern */}
      {backgroundPattern && (
        <AnimatedBackground
          variant={backgroundPattern.variant}
          intensity={backgroundPattern.intensity}
          colors={backgroundPattern.colors}
        />
      )}

      <div className={styles.heroInner}>
        {variant === "split" ? (
          <>
            {renderContent()}
            {renderMedia()}
          </>
        ) : variant === "full-bleed" ? (
          <>
            {renderMedia()}
            <div className={styles.heroOverlay}>{renderContent()}</div>
          </>
        ) : (
          <>
            {renderContent()}
            {media && renderMedia()}
          </>
        )}
      </div>
    </section>
  );
}

Hero.displayName = "Hero";
