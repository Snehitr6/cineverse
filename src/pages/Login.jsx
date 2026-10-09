
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Clapperboard,
  ArrowRight,
  Mail,
  Lock,
} from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    let account;

    try {
      account = JSON.parse(
        localStorage.getItem("cineverse-account") || "null"
      );
    } catch {
      account = null;
    }

    if (
      !account ||
      account.email.toLowerCase() !== normalizedEmail ||
      account.password !== password
    ) {
      setError(
        "Invalid login details. Please create an account first."
      );
      return;
    }

    localStorage.setItem("cineverse-session", normalizedEmail);
    navigate("/");
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link to="/" className="brand auth-brand">
          <span className="brand-icon">
            <Clapperboard size={23} />
          </span>
          <span>
            CINE<span className="brand-accent">VERSE</span>
          </span>
        </Link>

        <p className="eyebrow">WELCOME BACK</p>

        <h1>Your next story awaits.</h1>

        <p className="auth-subtitle">
          Sign in and pick up where your imagination left off.
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="login-email">Email address</label>

          <div className="password-field">
            <Mail
              size={17}
              style={{
                position: "absolute",
                left: 13,
                top: 14,
                color: "var(--muted)",
                pointerEvents: "none",
              }}
            />
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ paddingLeft: 39 }}
              required
            />
          </div>

          <label htmlFor="login-password">Password</label>

          <div className="password-field">
            <Lock
              size={17}
              style={{
                position: "absolute",
                left: 13,
                top: 14,
                color: "var(--muted)",
                pointerEvents: "none",
              }}
            />

            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ paddingLeft: 39 }}
              minLength={6}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="button-primary auth-submit"
          >
            Sign In <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-switch">
          New to Cineverse?{" "}
          <Link to="/signup">Create an account</Link>
        </p>

        <p className="auth-note">
          Demo authentication only. Do not use real passwords.
        </p>
      </div>
    </main>
  );
}
