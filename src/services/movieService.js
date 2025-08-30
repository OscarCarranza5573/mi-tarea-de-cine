import axios from 'axios';

const BASE_URL = 'https://movie.azurewebsites.net/api/cartelera';

class MovieService {
  // Obtener todas las películas con filtros opcionales
  async getAllMovies(title = '', ubication = '') {
    try {
      const response = await axios.get(`${BASE_URL}?title=${title}&ubication=${ubication}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  }

  // Obtener película por ID
  async getMovieById(imdbID) {
    try {
      const response = await axios.get(`${BASE_URL}?imdbID=${imdbID}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie by ID:', error);
      throw error;
    }
  }

  // Crear nueva película
  async createMovie(movieData) {
    try {
      const response = await axios.post(BASE_URL, movieData);
      return response.data;
    } catch (error) {
      console.error('Error creating movie:', error);
      throw error;
    }
  }

  // Actualizar película existente
  async updateMovie(imdbID, movieData) {
    try {
      const response = await axios.put(`${BASE_URL}?imdbID=${imdbID}`, movieData);
      return response.data;
    } catch (error) {
      console.error('Error updating movie:', error);
      throw error;
    }
  }

  // Eliminar película
  async deleteMovie(imdbID) {
    try {
      const response = await axios.delete(`${BASE_URL}?imdbID=${imdbID}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting movie:', error);
      throw error;
    }
  }

  // Obtener tipos únicos de películas
  async getUniqueTypes() {
    try {
      const movies = await this.getAllMovies();
      const types = [...new Set(movies.map(movie => movie.Type))];
      return types.filter(type => type); // Filtrar valores vacíos
    } catch (error) {
      console.error('Error fetching unique types:', error);
      return [];
    }
  }

  // Obtener ubicaciones únicas
  async getUniqueLocations() {
    try {
      const movies = await this.getAllMovies();
      const locations = [...new Set(movies.map(movie => movie.Ubication))];
      return locations.filter(location => location); // Filtrar valores vacíos
    } catch (error) {
      console.error('Error fetching unique locations:', error);
      return [];
    }
  }
}

export default new MovieService();