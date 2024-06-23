import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NThkNTRiMjhhYWMzOGU1MjAxNzMyNTFhYmZjMDBkOSIsInN1YiI6IjY2MTUxNzllNTkwMDg2MDE4NTdmM2JhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KbtdTl48FSEUk_mLBHdGWQ_ysU-MYgVORFYIKsSJ5qQ',
  },
};

export const getTrendingMovies = async () => {
  const response = await axios.get(`/trending/movie/week`, options);
  return response.data;
};

export const getMovieByQuery = async searchQuery => {
  const response = await axios.get(
    `search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`,
    options
  );
  return response.data;
};

export const getMovieDetails = async movieId => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};

export const getMovieCredits = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data;
};