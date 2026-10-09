import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Play,
  PlayCircle,
  Star,
  Bookmark,
  Check,
  Clapperboard,
  MonitorPlay,
  X,
  Maximize,
  ExternalLink,
} from "lucide-react";

import { useApp } from "../context/AppContext";
import MovieRow from "../components/MovieRow";

// Direct embedded videos.
// Add more entries using the exact IDs from AppContext.jsx.
const YOUTUBE_VIDEOS = {
  "dune-part-two": {
    id: "_YUzQa_1RCE",
    label: "Dune: Part Two — Official Trailer 2",
  },

  "the-batman": {
    id: "mqqft2x_Aa4",
    label: "The Batman — Official Trailer",
  },
};

const getYouTubeSearchUrl = (movie) => {
  const title = movie?.title || "movie trailer";

  return `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} official trailer`
  )}`;
};

export default function MovieDetails() {
  const { id } = useParams();
  const { movies, watchlist, toggleWatchlist } = useApp();

  const playerRef = useRef(null);

  const [playerOpen, setPlayerOpen] = useState(false);

  const movie = movies.find(
    (item) => String(item.id) === String(id)
  );

  const saved = movie
    ? watchlist.some(
        (savedId) => String(savedId) === String(movie.id)
      )
    : false;

  const youtubeVideo = movie
    ? YOUTUBE_VIDEOS[String(movie.id)] || null
    : null;

  const youtubeSearchUrl = getYouTubeSearchUrl(movie);

  const relatedMovies = movie
    ? movies
        .filter(
          (item) =>
            String(item.id) !== String(movie.id) &&
            (item.type === movie.type ||
              item.genre?.some((genre) =>
                movie.genre?.includes(genre)
              ))
        )
        .slice(0, 10)
    : [];

  useEffect(() => {
    setPlayerOpen(false);
  }, [id]);

  useEffect(() => {
    if (!playerOpen) return;

    const timer = setTimeout(() => {
      playerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [playerOpen]);

  if (!movie) {
    return (
      <main className="cine-details-not-found">
        <Clapperboard size={44} />

        <h1>Movie not found</h1>

        <p>
          We couldn't find this title. Browse the collection
          to discover another movie or series.
        </p>

        <Link
          to="/movies"
          className="cine-button cine-button-primary"
        >
          Browse movies
        </Link>
      </main>
    );
  }

  const openPlayer = () => {
    setPlayerOpen(true);
  };

  const closePlayer = async () => {
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.error("Unable to exit fullscreen:", error);
      }
    }

    setPlayerOpen(false);
  };

  const handleFullscreen = async () => {
    const player = playerRef.current;

    if (!player) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (player.requestFullscreen) {
        await player.requestFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen unavailable:", error);
    }
  };

  return (
    <main className="cine-details">
      {/* Cinematic hero background */}
      <section
        className="cine-details-hero"
        style={{
          "--details-backdrop": `url("${movie.backdrop || movie.poster || ""}")`,
        }}
      >
        <div className="cine-details-backdrop" />
        <div className="cine-details-overlay" />

        <motion.div
          className="cine-details-content"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Link to="/" className="cine-details-back">
            <ArrowLeft size={17} />
            Back to home
          </Link>

          <div className="cine-details-layout cine-details-no-poster">
            <div className="cine-details-info">
              <span className="cine-eyebrow">
                <Clapperboard size={15} />
                CINEVERSE COLLECTION
              </span>

              <h1>{movie.title}</h1>

              <div className="cine-details-meta">
                <span className="cine-details-rating">
                  <Star size={15} fill="currentColor" />
                  {movie.rating || "N/A"}
                </span>

                <span>{movie.year || "—"}</span>
                <span>{movie.type || "Movie"}</span>

                {movie.duration && (
                  <span>{movie.duration}</span>
                )}
              </div>

              <div className="cine-details-genres">
                {(movie.genre || []).map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>

              <p className="cine-details-description">
                {movie.description ||
                  "Discover your next cinematic experience on CINEVERSE."}
              </p>

              <div className="cine-details-actions">
                <button
                  type="button"
                  className="cine-button cine-button-primary"
                  onClick={openPlayer}
                >
                  <Play size={19} fill="currentColor" />
                  Watch Now
                </button>

                <button
                  type="button"
                  className="cine-button cine-button-secondary"
                  onClick={() => toggleWatchlist(movie.id)}
                >
                  {saved ? (
                    <Check size={18} />
                  ) : (
                    <Bookmark size={18} />
                  )}

                  {saved
                    ? "Added to My List"
                    : "Add to My List"}
                </button>
              </div>

              <div className="cine-details-credits">
                <div>
                  <span>Director / Creator</span>
                  <strong>
                    {movie.director || "Not listed"}
                  </strong>
                </div>

                <div>
                  <span>Cast</span>
                  <strong>
                    {movie.cast?.join(", ") ||
                      "Cast information unavailable"}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Direct embedded video player */}
      {playerOpen && (
        <section className="cine-watch-section">
          <div className="cine-watch-heading">
            <div>
              <span className="cine-eyebrow">
                <MonitorPlay size={15} />
                CINEVERSE PLAYER
              </span>

              <h2>Now playing: {movie.title}</h2>

              <p>
                {youtubeVideo
                  ? youtubeVideo.label
                  : `Find a video for ${movie.title}`}
              </p>
            </div>

            <button
              type="button"
              className="cine-player-close"
              onClick={closePlayer}
            >
              <X size={19} />
              Close
            </button>
          </div>

          {youtubeVideo ? (
            <>
              <div
                className="cine-video-frame cine-youtube-frame"
                ref={playerRef}
              >
                <iframe
                  key={`${movie.id}-${youtubeVideo.id}`}
                  className="cine-video cine-youtube-video"
                  src={`https://www.youtube-nocookie.com/embed/${youtubeVideo.id}?autoplay=1&rel=0`}
                  title={`${movie.title} — ${youtubeVideo.label}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="cine-player-toolbar">
                <button
                  type="button"
                  onClick={handleFullscreen}
                >
                  <Maximize size={17} />
                  Fullscreen
                </button>

                <span className="cine-player-toolbar-spacer" />

                <a
                  href={`https://www.youtube.com/watch?v=${youtubeVideo.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} />
                  Open on YouTube
                </a>
              </div>
            </>
          ) : (
            <div
              className="cine-video-error cine-youtube-fallback"
              ref={playerRef}
            >
              <PlayCircle size={48} />

              <h3>Video not configured for {movie.title}</h3>

              <p>
                Search for the matching official trailer below.
                To play directly in CINEVERSE, add the verified
                YouTube video ID to the YOUTUBE_VIDEOS object.
              </p>

              <a
                href={youtubeSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="cine-button cine-button-primary"
              >
                <PlayCircle size={18} />
                Find {movie.title} Trailer
                <ExternalLink size={16} />
              </a>
            </div>
          )}

          <p className="cine-player-note">
            Embedded videos are hosted by YouTube. Playback may
            be restricted by the video owner. Trailers and
            previews are not the full movie.
          </p>
        </section>
      )}

      {/* Related titles */}
      {relatedMovies.length > 0 && (
        <section className="cine-details-related">
          <div className="cine-section-heading">
            <div>
              <span className="cine-eyebrow">
                KEEP EXPLORING
              </span>

              <h2>You might also like</h2>
            </div>
          </div>

          <MovieRow
            title=""
            movies={relatedMovies}
          />
        </section>
      )}
    </main>
  );
}