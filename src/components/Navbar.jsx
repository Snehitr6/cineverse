
import { useState } from "react";
import {
  Clapperboard,
  Search,
  Sun,
  Moon,
  Bookmark,
  Menu,
  X,
  Crown,
  ChevronRight,
} from "lucide-react";
import {
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const {
    dark,
    setDark,
    search,
    setSearch,
    watchlist = [],
  } = useApp();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setMobileOpen(false);
    setSearchOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = search.trim();

    if (query) {
      navigate("/search");
    } else {
      navigate("/movies");
    }

    closeMenu();
  };

  const handleTheme = () => {
    if (typeof setDark === "function") {
      setDark(!dark);
    }
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Movies", to: "/movies" },
    { label: "Series", to: "/series" },
    { label: "My List", to: "/watchlist" },
  ];

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? "active" : ""}`;

  return (
    <header className="cine-navbar">
      <div className="cine-navbar-inner">
        {/* BRAND */}
        <Link
          to="/"
          className="cine-brand"
          aria-label="CINEVERSE home"
          onClick={closeMenu}
        >
          <span className="cine-brand-icon">
            <Clapperboard size={23} strokeWidth={2.2} />
          </span>

          <span className="cine-brand-name">
            CINE<span>VERSE</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="cine-nav-links" aria-label="Main navigation">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={linkClass}
            >
              {item.label}

              {item.to === "/watchlist" && watchlist.length > 0 && (
                <span className="nav-watchlist-count">
                  {watchlist.length}
                </span>
              )}
            </NavLink>
          ))}

          <NavLink
            to="/subscription"
            className={({ isActive }) =>
              `nav-link nav-premium-link ${isActive ? "active" : ""}`
            }
          >
            <Crown size={15} />
            Premium
          </NavLink>
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="cine-nav-actions">
          <form
            className={`cine-nav-search ${searchOpen ? "search-expanded" : ""}`}
            onSubmit={handleSearch}
            role="search"
          >
            <button
              type="button"
              className="cine-search-icon"
              aria-label="Open search"
              onClick={() => {
                setSearchOpen((value) => !value);

                if (searchOpen) {
                  navigate("/search");
                }
              }}
            >
              <Search size={19} />
            </button>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search movies..."
              aria-label="Search movies and series"
              onFocus={() => setSearchOpen(true)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setSearchOpen(false);
                  event.currentTarget.blur();
                }
              }}
            />

            {search && (
              <button
                type="button"
                className="cine-search-clear"
                aria-label="Clear search"
                onClick={() => setSearch("")}
              >
                <X size={15} />
              </button>
            )}
          </form>

          <button
            type="button"
            className="cine-nav-icon"
            onClick={handleTheme}
            aria-label={
              dark ? "Switch to light theme" : "Switch to dark theme"
            }
            title="Toggle theme"
          >
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          <Link
            to="/watchlist"
            className="cine-nav-icon cine-nav-bookmark"
            aria-label={`My watchlist, ${watchlist.length} saved titles`}
            title="My List"
          >
            <Bookmark size={20} />
            {watchlist.length > 0 && (
              <span className="nav-watchlist-count nav-bookmark-count">
                {watchlist.length}
              </span>
            )}
          </Link>

          <Link
            to="/login"
            className="cine-signin-button"
            onClick={closeMenu}
          >
            Sign in
            <ChevronRight size={15} />
          </Link>

          {/* MOBILE MENU TOGGLE */}
          <button
            type="button"
            className="cine-mobile-toggle"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {mobileOpen && (
        <>
          <button
            type="button"
            className="cine-mobile-backdrop"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          />

          <nav className="cine-mobile-menu" aria-label="Mobile navigation">
            <div className="cine-mobile-menu-heading">
              <span>EXPLORE CINEVERSE</span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
              >
                <X size={20} />
              </button>
            </div>

            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={linkClass}
                onClick={closeMenu}
              >
                {item.label}

                {item.to === "/watchlist" && watchlist.length > 0 && (
                  <span className="nav-watchlist-count">
                    {watchlist.length}
                  </span>
                )}
              </NavLink>
            ))}

            <NavLink
              to="/subscription"
              className={({ isActive }) =>
                `cine-mobile-premium ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              <span className="cine-mobile-premium-icon">
                <Crown size={19} />
              </span>

              <span>
                <strong>Go Premium</strong>
                <small>Discover your membership options</small>
              </span>

              <ChevronRight size={19} />
            </NavLink>

            <Link
              to="/login"
              className="cine-mobile-signin"
              onClick={closeMenu}
            >
              Sign in to CINEVERSE
              <ChevronRight size={17} />
            </Link>

            <button
              type="button"
              className="cine-mobile-theme"
              onClick={handleTheme}
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
              {dark ? "Switch to light theme" : "Switch to dark theme"}
            </button>
          </nav>
        </>
      )}
    </header>
  );
}
