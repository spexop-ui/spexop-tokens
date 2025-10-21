/**
 * ProfileCard Component Tests
 *
 * @packageName @spexop/react
 * @version 1.0.0
 */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { ProfileCard } from "./ProfileCard.js";

describe("ProfileCard", () => {
  const defaultProps = {
    name: "Alex Johnson",
    role: "Senior Developer",
    avatar: "/avatars/alex.jpg",
  };

  it("renders with required props", () => {
    render(<ProfileCard {...defaultProps} />);

    expect(screen.getByText("Alex Johnson")).toBeDefined();
    expect(screen.getByText("Senior Developer")).toBeDefined();
  });

  it("renders avatar with correct alt text", () => {
    render(<ProfileCard {...defaultProps} />);

    const avatar = screen.getByAltText("Alex Johnson");
    expect(avatar).toBeDefined();
    expect(avatar.getAttribute("src")).toBe("/avatars/alex.jpg");
  });

  it("renders bio when provided", () => {
    render(
      <ProfileCard
        {...defaultProps}
        bio="Passionate about building accessible web applications"
      />,
    );

    expect(
      screen.getByText("Passionate about building accessible web applications"),
    ).toBeDefined();
  });

  it("renders social links when provided", () => {
    const socialLinks = [
      { platform: "twitter", url: "https://twitter.com/alex" },
      { platform: "github", url: "https://github.com/alex" },
    ];

    render(<ProfileCard {...defaultProps} socialLinks={socialLinks} />);

    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThanOrEqual(2);

    const twitterLink = links.find((link) =>
      link.getAttribute("href")?.includes("twitter"),
    );
    expect(twitterLink).toBeDefined();

    const githubLink = links.find((link) =>
      link.getAttribute("href")?.includes("github"),
    );
    expect(githubLink).toBeDefined();
  });

  it("renders contact button when onContactClick provided", () => {
    render(<ProfileCard {...defaultProps} onContactClick={vi.fn()} />);

    expect(screen.getByText("Contact")).toBeDefined();
  });

  it("handles contact button click", async () => {
    const handleContact = vi.fn();
    const user = userEvent.setup();

    render(<ProfileCard {...defaultProps} onContactClick={handleContact} />);

    const button = screen.getByText("Contact");
    await user.click(button);

    expect(handleContact).toHaveBeenCalledTimes(1);
  });

  it("renders social link icons correctly", () => {
    const socialLinks = [
      { platform: "twitter", url: "https://twitter.com/alex" },
      { platform: "linkedin", url: "https://linkedin.com/in/alex" },
      { platform: "github", url: "https://github.com/alex" },
      { platform: "email", url: "mailto:alex@example.com" },
    ];

    render(<ProfileCard {...defaultProps} socialLinks={socialLinks} />);

    // Check that links have proper ARIA labels
    const twitterLink = screen.getByLabelText("twitter profile");
    expect(twitterLink).toBeDefined();

    const linkedinLink = screen.getByLabelText("linkedin profile");
    expect(linkedinLink).toBeDefined();

    const githubLink = screen.getByLabelText("github profile");
    expect(githubLink).toBeDefined();

    const emailLink = screen.getByLabelText("email profile");
    expect(emailLink).toBeDefined();
  });

  it("opens social links in new tab", () => {
    const socialLinks = [
      { platform: "twitter", url: "https://twitter.com/alex" },
    ];

    render(<ProfileCard {...defaultProps} socialLinks={socialLinks} />);

    const link = screen.getByLabelText("twitter profile");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(link.getAttribute("rel")).toBe("noopener noreferrer");
  });

  it("has proper semantic structure", () => {
    const { container } = render(<ProfileCard {...defaultProps} />);

    const name = container.querySelector("h3");
    expect(name).toBeDefined();
    expect(name?.textContent).toBe("Alex Johnson");
  });

  it("applies custom className", () => {
    const { container } = render(
      <ProfileCard {...defaultProps} className="custom-class" />,
    );

    const card = container.querySelector(".custom-class");
    expect(card).toBeDefined();
  });

  it("supports different variants", () => {
    const { rerender } = render(
      <ProfileCard {...defaultProps} variant="basic" />,
    );

    expect(screen.getByText("Alex Johnson")).toBeDefined();

    rerender(<ProfileCard {...defaultProps} variant="highlighted" />);
    expect(screen.getByText("Alex Johnson")).toBeDefined();
  });

  it("renders without bio", () => {
    render(<ProfileCard {...defaultProps} />);

    // Should render without error
    expect(screen.getByText("Alex Johnson")).toBeDefined();
  });

  it("renders without social links", () => {
    render(<ProfileCard {...defaultProps} />);

    // Should not have any social links
    expect(screen.queryAllByRole("link").length).toBe(0);
  });

  it("renders without contact button", () => {
    render(<ProfileCard {...defaultProps} />);

    expect(screen.queryByText("Contact")).toBeNull();
  });

  it("uses spacious density by default", () => {
    render(<ProfileCard {...defaultProps} />);

    expect(screen.getByText("Alex Johnson")).toBeDefined();
  });

  it("uses fullHeight by default", () => {
    render(<ProfileCard {...defaultProps} />);

    expect(screen.getByText("Alex Johnson")).toBeDefined();
  });
});
