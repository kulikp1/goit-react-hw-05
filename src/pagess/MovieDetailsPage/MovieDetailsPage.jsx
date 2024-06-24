import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { getMovieDetails } from '../../components/tmdb-api-fetch';
import css from './MovieDetailsPage.module.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import { IoArrowBack } from 'react-icons/io5';

const defaults = {
  poster:
    'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png',
  title: 'Title not found',
  date: 'XXXX-XX-XX',
  vote: 'XX.XX',
};

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      <Link to={goBackRef.current} className={css.goBackBtn}>
        <IoArrowBack />
        GO BACK
      </Link>
      <div className={css.movieDetails}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : defaults.poster
          }
          alt={movie.title || defaults.title}
        />
        <div className={css.movieInfo}>
          <h2>{movie.title}</h2>
          <p>User score: {movie.vote_average}</p>
          <h3>Overview</h3>
          <p className={css.overview}>{movie.overview}</p>
          <h3>Genres</h3>
          <ul className={css.genresList}>
            {movie?.genres?.map(({ id, name }) => (
              <li key={id}>{name}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className={css.additionalInfo}>
        <h4>Additional information</h4>
        <ul className={css.additionalInfoList}>
          <li>
            <NavLink to="cast" className={css.additionalInfoLink}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={css.additionalInfoLink}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}