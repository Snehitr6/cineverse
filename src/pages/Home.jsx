import { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  Info,
  Sparkles,
  TrendingUp,
  Flame,
  Clapperboard,
  ArrowRight,
  Star,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import MovieRow from "../components/MovieRow";

export default function Home() {
  const { movies, search } = useApp();

  const featured = movies.find(
    (movie) => movie.id === "dune-part-two"
  ) || movies[0];

  const filteredMovies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return movies;

    return movies.filter((movie) =>
      [
        movie.title,
        movie.type,
        ...(movie.genre || []),
        ...(movie.cast || []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [movies, search]);

  const trending = filteredMovies
    .filter((movie) =>
      [
        "money-heist",
        "peaky-blinders",
        "the-office",
        "one-piece",
        "squid-game",
        "breaking-bad",
      ].includes(movie.id)
    );

  const popularMovies = filteredMovies.filter(
    (movie) => movie.type === "Movie"
  );

  const series = filteredMovies.filter(
    (movie) => movie.type === "Series"
  );

  const topRated = [...filteredMovies]
    .sort((a, b) => Number(b.rating) - Number(a.rating))
    .slice(0, 10);

  const newReleases = filteredMovies
    .filter((movie) => Number(movie.year) >= 2022)
    .sort((a, b) => Number(b.year) - Number(a.year));

  if (!movies.length) {
    return (
      <main className="cine-home-empty">
        <Clapperboard size={40} />
        <h1>Your next story is loading.</h1>
        <p>Add movie data to your CINEVERSE catalog to get started.</p>
      </main>
    );
  }

  return (
    <main className="cine-home">
      {search.trim() ? (
        <section className="cine-search-results">
          <span className="cine-eyebrow">
            <Sparkles size={14} /> DISCOVER CINEVERSE
          </span>

          <h1>
            Search results for{" "}
            <span>&ldquo;{search.trim()}&rdquo;</span>
          </h1>

          <p>
            {filteredMovies.length}{" "}
            {filteredMovies.length === 1 ? "title" : "titles"} found
          </p>

          {filteredMovies.length > 0 ? (
            <div className="cine-search-grid">
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(index * 0.04, 0.4) }}
                >
                  <Link
                    to={`/movie/${movie.id}`}
                    className="cine-search-card"
                  >
                    <img
                      src={movie.poster}
                      alt={`${movie.title} poster`}
                      loading="lazy"
                    />
                    <div className="cine-search-card-info">
                      <strong>{movie.title}</strong>
                      <span>
                        {movie.year} · {movie.type} · ★ {movie.rating}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="cine-no-results">
              <Clapperboard size={34} />
              <h2>No stories found</h2>
              <p>Try a different title, actor, or genre.</p>
            </div>
          )}
        </section>
      ) : (
        <>
          <section
            className="cine-hero"
            style={{
              "--cine-backdrop": `url("${featured.backdrop || featured.poster}")`,
            }}
          >
            <div className="cine-hero-image" />

            <div className="cine-hero-shade" />

            <div className="cine-hero-content">
              <motion.div
                className="cine-hero-copy"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="cine-eyebrow">
                  <Sparkles size={14} />
                  YOUR NEXT OBSESSION STARTS HERE
                </span>

                <div className="cine-feature-label">
                  <span className="cine-feature-dot" />
                  CINEVERSE ORIGINAL SELECTION
                </div>

                <h1>{featured.title}</h1>

                <div className="cine-hero-meta">
                  <span className="cine-match">
                    {featured.match || 95}% Match
                  </span>
                  <span className="cine-rating">
                    <Star size={14} fill="currentColor" />
                    {featured.rating}
                  </span>
                  <span>{featured.year}</span>
                  <span className="cine-type">
                    {featured.type}
                  </span>
                  <span>{featured.duration}</span>
                </div>

                <p className="cine-hero-description">
                  {featured.description}
                </p>

                <div className="cine-genre-list">
                  {featured.genre?.slice(0, 3).map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>

                <div className="cine-hero-actions">
                  <Link
                    to={`/movie/${featured.id}`}
                    className="cine-button cine-button-primary"
                  >
                    <Play size={19} fill="currentColor" />
                    Explore title
                  </Link>

                  <Link
                    to={`/movie/${featured.id}`}
                    className="cine-button cine-button-secondary"
                  >
                    <Info size={19} />
                    More info
                  </Link>
                </div>

                <div className="cine-hero-caption">
                  <span className="cine-caption-line" />
                  <span>HANDPICKED FOR YOUR NEXT MOVIE NIGHT</span>
                </div>
              </motion.div>

              <motion.div
                className="cine-hero-poster"
                initial={{ opacity: 0, scale: 0.92, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <img
                  src={featured.poster}
                  alt={`${featured.title} poster`}
                />
                <div className="cine-poster-glow" />
              </motion.div>
            </div>

            <div className="cine-hero-bottom">
              <div>
                <span className="cine-bottom-label">NOW SHOWING</span>
                <span className="cine-bottom-title">
                  Stories worth staying up for.
                </span>
              </div>
              <Link to="/movies" className="cine-discover-link">
                Explore catalog <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          <section className="cine-welcome-strip">
            <div className="cine-welcome-icon">
              <Clapperboard size={19} />
            </div>
            <div>
              <strong>Stories that stay with you.</strong>
              <span>
                Discover your next favorite across movies and series.
              </span>
            </div>
            <Link to="/series">
              Explore series <ArrowRight size={15} />
            </Link>
          </section>

          <div className="cine-content">
            {trending.length > 0 && (
              <div className="cine-row-section">
                <div className="cine-section-heading">
                  <div className="cine-section-icon trending">
                    <TrendingUp size={19} />
                  </div>
                  <div>
                    <span className="cine-section-kicker">
                      THE BUZZ RIGHT NOW
                    </span>
                    <h2>Trending Now</h2>
                    <p>Stories everyone's talking about.</p>
                  </div>
                  <Link to="/search" className="cine-see-all">
                    Discover <ArrowRight size={15} />
                  </Link>
                </div>
                <MovieRow title="" movies={trending} />
              </div>
            )}

            {popularMovies.length > 0 && (
              <div className="cine-row-section">
                <div className="cine-section-heading">
                  <div className="cine-section-icon popular">
                    <Flame size={19} />
                  </div>
                  <div>
                    <span className="cine-section-kicker">
                      BIG SCREEN FAVORITES
                    </span>
                    <h2>Popular Movies</h2>
                    <p>Big stories. Unforgettable moments.</p>
                  </div>
                  <Link to="/movies" className="cine-see-all">
                    All movies <ArrowRight size={15} />
                  </Link>
                </div>
                <MovieRow title="" movies={popularMovies} />
              </div>
            )}

            {series.length > 0 && (
              <div className="cine-row-section">
                <div className="cine-section-heading">
                  <div className="cine-section-icon series">
                    <Clapperboard size={19} />
                  </div>
                  <div>
                    <span className="cine-section-kicker">
                      ONE MORE EPISODE
                    </span>
                    <h2>Must-Watch Series</h2>
                    <p>Worlds you'll want to return to.</p>
                  </div>
                  <Link to="/series" className="cine-see-all">
                    All series <ArrowRight size={15} />
                  </Link>
                </div>
                <MovieRow title="" movies={series} />
              </div>
            )}

            {newReleases.length > 0 && (
              <div className="cine-row-section">
                <div className="cine-section-heading">
                  <div className="cine-section-icon new">
                    <Sparkles size={19} />
                  </div>
                  <div>
                    <span className="cine-section-kicker">
                      FRESH FROM THE VAULT
                    </span>
                    <h2>Fresh Discoveries</h2>
                    <p>Recent releases for your watchlist.</p>
                  </div>
                  <Link to="/movies" className="cine-see-all">
                    Explore <ArrowRight size={15} />
                  </Link>
                </div>
                <MovieRow title="" movies={newReleases} />
              </div>
            )}

            {topRated.length > 0 && (
              <div className="cine-row-section">
                <div className="cine-section-heading">
                  <div className="cine-section-icon top">
                    <Star size={19} />
                  </div>
                  <div>
                    <span className="cine-section-kicker">
                      THE CINEVERSE COLLECTION
                    </span>
                    <h2>Editor's Top Picks</h2>
                    <p>Exceptional stories, selected for you.</p>
                  </div>
                </div>
                <MovieRow title="" movies={topRated} />
              </div>
            )}
          </div>

          <section className="cine-bottom-cta">
            <div className="cine-cta-orb cine-cta-orb-one" />
            <div className="cine-cta-orb cine-cta-orb-two" />

            <span className="cine-eyebrow">
              <Sparkles size={14} /> YOUR NEXT CHAPTER
            </span>

            <h2>Every story begins with a click.</h2>
            <p>
              Find a new favorite, save it for later, and make tonight
              a movie night.
            </p>

            <Link to="/movies" className="cine-button cine-button-primary">
              Explore all titles <ArrowRight size={17} />
            </Link>
          </section>
        </>
      )}
    </main>
  );
}