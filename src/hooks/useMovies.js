import { useState, useEffect } from 'react';
import movieService from '../services/movieService';

export const useMovies = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    title: '',
    type: '',
    location: '',
    year: ''
  });

  // Cargar todas las películas al inicializar
  useEffect(() => {
    loadMovies();
  }, []);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [movies, filters]);

  const loadMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await movieService.getAllMovies();
      setMovies(data);
    } catch (err) {
      setError('Error al cargar las películas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = movies;

    if (filters.title) {
      filtered = filtered.filter(movie => 
        movie.Title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(movie => 
        movie.Type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.location) {
      filtered = filtered.filter(movie => 
        movie.Ubication.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter(movie => 
        movie.Year.toString().includes(filters.year)
      );
    }

    setFilteredMovies(filtered);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      title: '',
      type: '',
      location: '',
      year: ''
    });
  };

  const createMovie = async (movieData) => {
    try {
      setLoading(true);
      await movieService.createMovie(movieData);
      await loadMovies(); // Recargar la lista
      return true;
    } catch (err) {
      setError('Error al crear la película');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async (imdbID, movieData) => {
    try {
      setLoading(true);
      await movieService.updateMovie(imdbID, movieData);
      await loadMovies(); // Recargar la lista
      return true;
    } catch (err) {
      setError('Error al actualizar la película');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (imdbID) => {
    try {
      setLoading(true);
      await movieService.deleteMovie(imdbID);
      await loadMovies(); // Recargar la lista
      return true;
    } catch (err) {
      setError('Error al eliminar la película');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    movies: filteredMovies,
    allMovies: movies,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    loadMovies,
    createMovie,
    updateMovie,
    deleteMovie
  };
};