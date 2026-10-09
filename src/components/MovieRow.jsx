
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";
import MovieCard from "./MovieCard";

export default function MovieRow({
  title,
  movies = [],
  subtitle,
}) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (!rowRef.current) return;

    rowRef.current.scrollBy({
      left: direction * rowRef.current.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  if (!movies.length) return null;

  return (
    <section className="content-section">
      {title && (
        <div className="section-heading">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>

          <div className="row-controls">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <div className="movie-row" ref={rowRef}>
        {movies.map((movie, index) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
