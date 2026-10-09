import { Link } from "react-router-dom";
import {
  Clapperboard,
  ArrowUpRight,
  Heart,
  Sparkles,
} from "lucide-react";

function SocialIcon({ type }) {
  if (type === "instagram") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle
          cx="12"
          cy="12"
          r="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="17.5" cy="6.8" r="1.1" fill="currentColor" />
      </svg>
    );
  }

  if (type === "youtube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect
          x="2.5"
          y="5"
          width="19"
          height="14"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path d="M10 8.5 16 12l-6 3.5z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M18.9 3H22l-6.8 7.8L23.2 21h-6.3l-4.9-6.4L6.4 21H3.2l7.3-8.4L2.8 3h6.5l4.4 5.9L18.9 3Zm-1.1 16h1.7L8.3 4.9H6.5L17.8 19Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="cine-footer">
      <div className="cine-footer-glow" />

      <div className="cine-footer-inner">
        <div className="cine-footer-top">
          <div className="cine-footer-brand">
            <Link to="/" className="cine-footer-logo">
              <span className="cine-footer-logo-icon">
                <Clapperboard size={23} />
              </span>

              <span className="cine-footer-logo-text">
                CINE<span>VERSE</span>
              </span>
            </Link>

            <p className="cine-footer-description">
              Your next obsession starts here. Discover
              unforgettable stories, iconic characters,
              and cinematic worlds.
            </p>

            <div className="cine-footer-socials">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <SocialIcon type="instagram" />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
              >
                <SocialIcon type="youtube" />
              </a>

              <a
                href="https://x.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
              >
                <SocialIcon type="x" />
              </a>
            </div>
          </div>

          <div className="cine-footer-column">
            <h3>Discover</h3>
            <Link to="/">Home</Link>
            <Link to="/movies">All Movies</Link>
            <Link to="/series">TV Series</Link>
          </div>

          <div className="cine-footer-column">
            <h3>Your Collection</h3>
            <Link to="/watchlist">My List</Link>
            <Link to="/movies">Popular Movies</Link>
            <Link to="/series">Popular Series</Link>
          </div>

          <div className="cine-footer-column cine-footer-about">
            <h3>About Cineverse</h3>

            <p>
              An independent streaming UI concept built
              for movie lovers and series fans.
            </p>

            <button
              type="button"
              className="cine-footer-top-button"
              onClick={scrollToTop}
            >
              Back to top
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>

        <div className="cine-footer-bottom">
          <p>
            © {currentYear} CINEVERSE. All rights reserved.
          </p>

          <p className="cine-footer-credit">
            Made with
            <Heart size={13} fill="currentColor" />
            for movie lovers
          </p>

          <span className="cine-footer-concept">
            <Sparkles size={14} />
            Independent UI concept
          </span>
        </div>
      </div>
    </footer>
  );
}