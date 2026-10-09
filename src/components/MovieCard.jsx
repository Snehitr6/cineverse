import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bookmark, Play, Star } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function MovieCard({ movie }) {
  const { watchlist, toggleWatchlist } = useApp();

  if (!movie) return null;

  const saved = watchlist.includes(String(movie.id));

  return (
    <motion.article
      className="movie-card"
      layout
      whileHover={{ y: -5 }}
      transition={{ duration: 0.22 }}
    >
      <Link
        to={`/movie/${movie.id}`}
        className="poster-link"
        aria-label={`View ${movie.title} details`}
      >
        <img
          className="movie-poster"
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.opacity = "0";
          }}
        />

        <span className="poster-rating">
          <Star size={12} fill="currentColor" />
          {movie.rating}
        </span>

        <span className="poster-overlay">
          <span className="play-circle">
            <Play size={20} fill="currentColor" />
          </span>
          <span className="play-label">View details</span>
        </span>
      </Link>

      <div className="movie-info">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "8px",
          }}
        >
          <Link
            to={`/movie/${movie.id}`}
            className="movie-title"
          >
            {movie.title}
          </Link>

          <button
            type="button"
            className={`save-button ${saved ? "saved" : ""}`}
            onClick={() => toggleWatchlist(movie.id)}
            aria-label={
              saved
                ? `Remove ${movie.title} from watchlist`
                : `Add ${movie.title} to watchlist`
            }
            title={saved ? "Remove from My List" : "Add to My List"}
          >
            <Bookmark
              size={15}
              fill={saved ? "currentColor" : "none"}
            />
          </button>
        </div>

        <p className="movie-meta">
          {movie.year}
          <span>•</span>
          {movie.type || "Movie"}
          <span>•</span>
          {movie.genre?.[0] || "Drama"}
        </p>

        <Link
          to={`/movie/${movie.id}`}
          className="card-details-link"
        >
          View details <Play size={11} />
        </Link>
      </div>
    </motion.article>
  );
}