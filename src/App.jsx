import React, { useState } from 'react';
import styled from 'styled-components';
import { useMovies } from './hooks/useMovies';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import MovieForm from './components/MovieForm';
import LoadingSpinner from './components/LoadingSpinner';
import { FaExclamationTriangle, FaFilm } from 'react-icons/fa';

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem 1rem;
  }
`;

const MoviesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ErrorContainer = styled.div`
  background: #fff5f5;
  border: 2px solid #fed7d7;
  border-radius: 15px;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 600px;
  text-align: center;
  color: #c53030;

  svg {
    font-size: 3rem;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.3rem;
  }

  p {
    margin: 0;
    opacity: 0.8;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;

  svg {
    font-size: 4rem;
    color: #ccc;
    margin-bottom: 1rem;
  }

  h3 {
    margin: 0 0 1rem 0;
    font-size: 1.5rem;
    color: #555;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    opacity: 0.8;
  }
`;

const RetryButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

function App() {
  const {
    movies,
    loading,
    error,
    filters,
    updateFilters,
    clearFilters,
    loadMovies,
    createMovie,
    updateMovie,
    deleteMovie
  } = useMovies();

  const [showSearch, setShowSearch] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);

  const handleShowAddForm = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMovie(null);
  };

  const handleSubmitForm = async (movieData) => {
    let success = false;
    
    if (editingMovie) {
      success = await updateMovie(editingMovie.imdbID, movieData);
    } else {
      success = await createMovie(movieData);
    }

    if (success) {
      handleCloseForm();
    }
  };

  const handleDeleteMovie = async (imdbID) => {
    await deleteMovie(imdbID);
  };

  const handleToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <AppContainer>
      <Header 
        onShowAddForm={handleShowAddForm}
        onToggleSearch={handleToggleSearch}
        showSearch={showSearch}
      />

      <MainContent>
        {showSearch && (
          <SearchBar
            filters={filters}
            onFiltersChange={updateFilters}
            onClearFilters={clearFilters}
            resultsCount={movies.length}
          />
        )}

        {loading && <LoadingSpinner />}

        {error && (
          <ErrorContainer>
            <FaExclamationTriangle />
            <h3>Error al cargar las películas</h3>
            <p>{error}</p>
            <RetryButton onClick={loadMovies}>
              Intentar de nuevo
            </RetryButton>
          </ErrorContainer>
        )}

        {!loading && !error && movies.length === 0 && (
          <EmptyState>
            <FaFilm />
            <h3>No se encontraron películas</h3>
            <p>No hay películas que coincidan con los filtros aplicados</p>
          </EmptyState>
        )}

        {!loading && !error && movies.length > 0 && (
           <MoviesGrid>
             {movies.map((movie, index) => (
               <MovieCard
                 key={`${movie.imdbID}-${index}`}
                 movie={movie}
                 onEdit={handleEditMovie}
                 onDelete={handleDeleteMovie}
                 loading={loading}
               />
             ))}
           </MoviesGrid>
         )}
      </MainContent>

      {showForm && (
        <MovieForm
          movie={editingMovie}
          onSubmit={handleSubmitForm}
          onCancel={handleCloseForm}
          loading={loading}
        />
      )}
    </AppContainer>
  );
}

export default App;
