import { Link, useLocation } from 'react-router-dom';
import css from './MovieCard.module.css'

const defaults = {
  poster:
    'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
  title: 'Title not found',
};

export default function MovieCard({ movie }) {
  const location = useLocation();

  return (
    <div className={css.card}>
      <img
        className={css.poster}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : defaults.poster
        }
        alt={movie.title || defaults.title}
      />
      <div className={css.title}>
        <Link to={`/movies/${movie.id}`} state={location} className={css.movieName}>
          {movie.title || defaults.title}
        </Link>
      </div>
    </div>
  );
}