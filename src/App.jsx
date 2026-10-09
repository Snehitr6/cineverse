import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Preloader from "./components/Preloader";
import { AppProvider, useApp } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Watchlist from "./pages/Watchlist";
import MovieRow from "./components/MovieRow";
import Subscription from "./pages/Subscription";
import Footer from "./components/Footer";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function CatalogPage({ type }) {
  const { movies, search } = useApp();

  const results = movies.filter((movie) => {
    const matchesSearch = `${movie.title} ${movie.genre}`
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    if (type === "series") {
      return matchesSearch && movie.type === "Series";
    }

    return matchesSearch && movie.type !== "Series";
  });

  return (
    <main className="inner-page">
      <div className="page-heading">
        <p className="eyebrow">THE CINEVERSE LIBRARY</p>

        <h1>
          {type === "series" ? "Explore Series" : "Explore Movies"}
        </h1>

        <p className="muted">
          Find something extraordinary to watch.
        </p>
      </div>

      {results.length > 0 ? (
        <MovieRow title="Discover" movies={results} />
      ) : (
        <div className="empty-state">
          <h2>
            {type === "series"
              ? "No series found"
              : "No movies found"}
          </h2>

          <p>
            Try another search or explore the homepage.
          </p>
        </div>
      )}
    </main>
  );
}

function SearchPage() {
  const { movies, search } = useApp();

  const results = movies.filter((movie) =>
    `${movie.title} ${movie.genre} ${movie.year}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
  );

  return (
    <main className="inner-page">
      <div className="page-heading">
        <p className="eyebrow">FIND YOUR NEXT FAVORITE</p>

        <h1>Search</h1>

        <p className="muted">
          {search
            ? `Results for "${search}"`
            : "Type a title in the search bar above."}
        </p>
      </div>

      {results.length > 0 ? (
        <MovieRow title="Matching titles" movies={results} />
      ) : (
        <div className="empty-state">
          <h2>
            {search ? "No matching titles" : "Ready to explore?"}
          </h2>

          <p>
            Search for a movie title, year, or genre using the navbar.
          </p>
        </div>
      )}
    </main>
  );
}

function PageFrame() {
  const location = useLocation();

  const authPage = ["/login", "/signup"].includes(
    location.pathname
  );

  return (
    <>
      <ScrollToTop />

      {!authPage && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />

            <Route
              path="/movies"
              element={<CatalogPage type="movies" />}
            />

            <Route
              path="/series"
              element={<CatalogPage type="series" />}
            />

            <Route path="/search" element={<SearchPage />} />

            <Route
              path="/movie/:id"
              element={<MovieDetails />}
            />

            <Route path="/watchlist" element={<Watchlist />} />

            <Route path="/login" element={<Login />} />

            <Route path="/signup" element={<Signup />} />

            <Route
              path="/subscription"
              element={<Subscription />}
            />

            <Route
              path="*"
              element={<Navigate to="/" replace />}
            />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {!authPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <PageFrame />
        <Preloader />
      </BrowserRouter>
    </AppProvider>
  );
}
