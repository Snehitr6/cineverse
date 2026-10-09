import { Link } from "react-router-dom";
import { Bookmark, Clapperboard, ArrowRight } from "lucide-react";
import { useApp } from "../context/AppContext";
import MovieCard from "../components/MovieCard";

export default function Watchlist() {
  const { movies, watchlist } = useApp();

  const savedMovies = movies.filter((movie) =>
    watchlist.some((id) => String(id) === String(movie.id))
  );

  return (
    <main className="watchlist-page">
      <div className="watchlist-heading">
        <span className="section-eyebrow">
          <Bookmark size={14} />
          YOUR COLLECTION
        </span>

        <h1>My Watchlist</h1>
        <p>Keep all your must-watch movies and series in one place.</p>

        <span className="watchlist-count">
          {savedMovies.length} {savedMovies.length === 1 ? "TITLE" : "TITLES"}
        </span>
      </div>

      {savedMovies.length > 0 ? (
        <section className="watchlist-grid">
          {savedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      ) : (
        <section className="watchlist-empty">
          <div className="watchlist-empty-icon">
            <Clapperboard size={34} />
          </div>

          <h2>Your watchlist is waiting</h2>
          <p>
            Save movies and series you want to watch later, and they’ll appear here.
          </p>

          <Link to="/movies" className="watchlist-explore">
            Explore movies <ArrowRight size={17} />
          </Link>

          <div className="watchlist-discover">
            Discover something new and add it to your collection.
          </div>
        </section>
      )}
    </main>
  );
}