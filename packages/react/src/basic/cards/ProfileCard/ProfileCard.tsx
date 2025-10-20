/**
 * ProfileCard Component
 * Specialized card for team member profiles
 *
 * @module @spexop/react/cards
 */

import { Github, Linkedin, Mail, Twitter } from "@spexop/icons";
import { forwardRef } from "react";
import { cn } from "../../../utils/cn.js";
import { Button } from "../../buttons/Button/Button.js";
import { Card } from "../Card/Card.js";
import styles from "./ProfileCard.module.css";
import type { ProfileCardProps } from "./ProfileCard.types.js";

/**
 * ProfileCard - Displays team member profiles
 *
 * Perfect for team pages, author bios, and about sections.
 * Includes avatar, social links, and optional contact button.
 *
 * @example
 * ```tsx
 * import { ProfileCard } from '@spexop/react';
 *
 * <ProfileCard
 *   name="Alex Johnson"
 *   role="Senior Developer"
 *   bio="Passionate about building accessible, performant web applications."
 *   avatar="/avatars/alex.jpg"
 *   socialLinks={[
 *     { platform: 'twitter', url: 'https://twitter.com/alex' },
 *     { platform: 'github', url: 'https://github.com/alex' }
 *   ]}
 *   onContactClick={() => openContactForm()}
 * />
 * ```
 */
export const ProfileCard = forwardRef<HTMLDivElement, ProfileCardProps>(
  (
    {
      name,
      role,
      bio,
      avatar,
      socialLinks,
      variant = "basic",
      onContactClick,
      className,
      ...props
    },
    ref,
  ) => {
    // Map platform names to icons
    const getSocialIcon = (platform: string) => {
      const platformLower = platform.toLowerCase();
      switch (platformLower) {
        case "twitter":
          return <Twitter />;
        case "linkedin":
          return <Linkedin />;
        case "github":
          return <Github />;
        case "email":
        case "mail":
          return <Mail />;
        default:
          return null;
      }
    };

    return (
      <Card
        ref={ref}
        variant={variant}
        density="spacious"
        fullHeight
        className={cn(styles.profileCard, className)}
        {...props}
      >
        <div className={styles.avatarContainer}>
          <img src={avatar} alt={name} className={styles.avatar} />
        </div>

        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>

        {bio && <p className={styles.bio}>{bio}</p>}

        {socialLinks && socialLinks.length > 0 && (
          <div className={styles.socialLinks}>
            {socialLinks.map((link) => (
              <a
                key={`${link.platform}-${link.url}`}
                href={link.url}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${link.platform} profile`}
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </div>
        )}

        {onContactClick && (
          <div className={styles.contactWrapper}>
            <Button variant="outline" onClick={onContactClick} fullWidth>
              Contact
            </Button>
          </div>
        )}
      </Card>
    );
  },
);

ProfileCard.displayName = "ProfileCard";
