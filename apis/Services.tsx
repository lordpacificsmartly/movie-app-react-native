import axios from "axios";
import { API_KEY, BASE_URL } from '../constants/Endpoints';

// Get popular movies
export const getPopularMovies = async () => {
  const response = await axios.get(`${BASE_URL}movie/popular?${API_KEY}`);
  console.log(response.data.results);
  return response.data.results;
};

// Get upcoming movies
export const getUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}movie/upcoming?${API_KEY}`);
  console.log(response.data.results);
  return response.data.results;
};

// Get popular tv
export const getPopularTv = async () => {
  const response = await axios.get(`${BASE_URL}tv/popular?${API_KEY}`);
  console.log(response.data.results);
  return response.data.results;
};

// Get family movies
export const getFamilyMovies = async () => {
  const response = await axios.get(`${BASE_URL}discover/movie?${API_KEY}&with_genres=10751`);
  console.log(response.data.results);
  return response.data.results;
};

// Get documentaries
export const getDocumentaries = async () => {
  const response = await axios.get(`${BASE_URL}discover/movie?${API_KEY}&with_genres=99`);
  console.log(response.data.results);
  return response.data.results;
};

// Get movie dtails
export const getMovieDetails = async (id:number) => {
  const response = await axios.get(`${BASE_URL}movie/${id}?${API_KEY}`);
  console.log(response.data.results);
  return response.data;
};

// Search movie or tv by keyword
export const searchMovieTv = async (query: string, type: any) => {
  const response = await axios.get(`${BASE_URL}search/${type}?${API_KEY}&query=${query}`);
  console.log(response.data.results);
  return response.data;
};