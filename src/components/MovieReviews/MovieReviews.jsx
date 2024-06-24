import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../tmdb-api-fetch';
import css from './MovieReviews.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setIsLoading(true);
        const data = await getMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <div>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <ul className={css.reviewsList}>
        {reviews.map(review => (
          <li key={review.id} className={css.reviewsListItem}>
            <p className={css.author}>Author: {review.author}</p>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}