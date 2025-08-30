import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSearch, FaTimes, FaFilter } from 'react-icons/fa';
import movieService from '../services/movieService';

const SearchContainer = styled.div`
  background: white;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const SearchTitle = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;

  svg {
    color: #667eea;
  }
`;

const SearchForm = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #555;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  min-width: 120px;
  justify-content: center;

  &.primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }

  &.secondary {
    background: #f8f9fa;
    color: #6c757d;
    border: 2px solid #e9ecef;

    &:hover {
      background: #e9ecef;
      border-color: #dee2e6;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

const ResultsInfo = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
  text-align: center;
  color: #6c757d;
  font-weight: 500;
`;

const SearchBar = ({ filters, onFiltersChange, onClearFilters, resultsCount }) => {
  const [types, setTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const loadFilterOptions = async () => {
    try {
      const [typesData, locationsData] = await Promise.all([
        movieService.getUniqueTypes(),
        movieService.getUniqueLocations()
      ]);
      setTypes(typesData);
      setLocations(locationsData);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    onFiltersChange(localFilters);
  };

  const handleClear = () => {
    const clearedFilters = {
      title: '',
      type: '',
      location: '',
      year: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <SearchTitle>
        <FaFilter />
        Buscar y Filtrar Películas
      </SearchTitle>
      
      <SearchForm>
        <InputGroup>
          <Label>Título de la película</Label>
          <Input
            type="text"
            placeholder="Buscar por título..."
            value={localFilters.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </InputGroup>

        <InputGroup>
          <Label>Género</Label>
          <Select
            value={localFilters.type}
            onChange={(e) => handleInputChange('type', e.target.value)}
          >
            <option value="">Todos los géneros</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Ubicación</Label>
          <Select
            value={localFilters.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          >
            <option value="">Todas las ubicaciones</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </Select>
        </InputGroup>

        <InputGroup>
          <Label>Año</Label>
          <Input
            type="number"
            placeholder="Año de estreno"
            value={localFilters.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
            onKeyPress={handleKeyPress}
            min="1900"
            max="2030"
          />
        </InputGroup>
      </SearchForm>

      <ButtonGroup>
        <Button className="primary" onClick={handleSearch}>
          <FaSearch />
          Buscar
        </Button>
        <Button className="secondary" onClick={handleClear}>
          <FaTimes />
          Limpiar Filtros
        </Button>
      </ButtonGroup>

      {resultsCount !== undefined && (
        <ResultsInfo>
          {resultsCount === 0 
            ? 'No se encontraron películas con los filtros aplicados'
            : `Se encontraron ${resultsCount} película${resultsCount !== 1 ? 's' : ''}`
          }
        </ResultsInfo>
      )}
    </SearchContainer>
  );
};

export default SearchBar;