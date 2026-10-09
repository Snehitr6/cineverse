import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clapperboard, Eye, EyeOff, Mail, Lock, UserRound, ArrowRight } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name || !email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8 || !/[A-Za-z]/.test(form.password) || !/\d/.test(form.password)) {
      setError("Password must be at least 8 characters and contain a letter and a number.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const account = { name, email, password: form.password };
      localStorage.setItem("cineverse-account", JSON.stringify(account));
      setSuccess(true);

      setTimeout(() => {
        navigate("/login");
      }, 900);
    } catch {
      setError("Unable to create your account. Please try again.");
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-background" />

      <Link to="/" className="auth-brand">
        <span className="brand-icon">
          <Clapperboard size={24} />
        </span>
        <span>
          CINE<span className="brand-accent">VERSE</span>
        </span>
      </Link>

      <section className="auth-card">
        <div className="auth-heading">
          <span className="eyebrow">YOUR NEXT FAVORITE STORY AWAITS</span>
          <h1>Create your account</h1>
          <p>Join CINEVERSE and build your personal watchlist.</p>
        </div>

        {success ? (
          <div className="auth-success">
            <span className="success-icon">✓</span>
            <h2>Account created!</h2>
            <p>Taking you to the sign-in page...</p>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <label htmlFor="signup-name">Full name</label>
            <div className="auth-input-wrap">
              <UserRound size={18} />
              <input
                id="signup-name"
                name="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            <label htmlFor="signup-email">Email address</label>
            <div className="auth-input-wrap">
              <Mail size={18} />
              <input
                id="signup-email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <label htmlFor="signup-password">Password</label>
            <div className="auth-input-wrap">
              <Lock size={18} />
              <input
                id="signup-password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <label htmlFor="signup-confirm-password">Confirm password</label>
            <div className="auth-input-wrap">
              <Lock size={18} />
              <input
                id="signup-confirm-password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your password again"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword((previous) => !previous)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="auth-error">{error}</p>}

            <button type="submit" className="auth-submit">
              Create account <ArrowRight size={18} />
            </button>

            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        )}
      </section>

      <p className="auth-legal">
        By creating an account, you agree to our Terms of Service and Privacy
        Policy.
      </p>
    </main>
  );
}