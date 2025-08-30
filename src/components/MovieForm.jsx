import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaSave, FaTimes, FaFilm, FaImage } from 'react-icons/fa';

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const FormContainer = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const FormHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f8f9fa;
`;

const FormTitle = styled.h2`
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;

  svg {
    color: #667eea;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9fa;
    color: #333;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
  display: flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    color: #667eea;
  }

  .required {
    color: #dc3545;
  }
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

  &.error {
    border-color: #dc3545;
    background: #fff5f5;
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

  &.error {
    border-color: #dc3545;
    background: #fff5f5;
  }
`;

const TextArea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: #f8f9fa;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: white;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }

  &.error {
    border-color: #dc3545;
    background: #fff5f5;
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f8f9fa;

  @media (max-width: 480px) {
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

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }

  &.secondary {
    background: #f8f9fa;
    color: #6c757d;
    border: 2px solid #e9ecef;

    &:hover:not(:disabled) {
      background: #e9ecef;
      border-color: #dee2e6;
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }
`;

const ImagePreview = styled.div`
  width: 100%;
  height: 200px;
  border: 2px dashed #e1e5e9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }

  .placeholder {
    text-align: center;
    color: #adb5bd;
    
    svg {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
  }
`;

const MovieForm = ({ movie, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    imdbID: '',
    Title: '',
    Year: '',
    Type: '',
    Poster: '',
    Estado: true,
    description: '',
    Ubication: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (movie) {
      setFormData(movie);
    } else {
      // Generar ID único para nueva película
      setFormData(prev => ({
        ...prev,
        imdbID: `IMDB${Date.now()}`
      }));
    }
  }, [movie]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.Title.trim()) {
      newErrors.Title = 'El título es requerido';
    }

    if (!formData.Year.trim()) {
      newErrors.Year = 'El año es requerido';
    } else if (!/^\d{4}$/.test(formData.Year)) {
      newErrors.Year = 'El año debe tener 4 dígitos';
    }

    if (!formData.Type.trim()) {
      newErrors.Type = 'El género es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.Ubication.trim()) {
      newErrors.Ubication = 'La ubicación es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  const genres = [
    'Acción', 'Aventura', 'Ciencia Ficción', 'Comedia', 'Drama', 
    'Terror', 'Romance', 'Thriller', 'Animación', 'Documental', 'Explicita'
  ];

  return (
    <FormOverlay onClick={handleOverlayClick}>
      <FormContainer>
        <FormHeader>
          <FormTitle>
            <FaFilm />
            {movie ? 'Editar Película' : 'Agregar Nueva Película'}
          </FormTitle>
          <CloseButton onClick={onCancel}>
            <FaTimes />
          </CloseButton>
        </FormHeader>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>
              Título <span className="required">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Ingresa el título de la película"
              value={formData.Title}
              onChange={(e) => handleChange('Title', e.target.value)}
              className={errors.Title ? 'error' : ''}
            />
            {errors.Title && <ErrorMessage>{errors.Title}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>
              Año <span className="required">*</span>
            </Label>
            <Input
              type="number"
              placeholder="2024"
              value={formData.Year}
              onChange={(e) => handleChange('Year', e.target.value)}
              min="1900"
              max="2030"
              className={errors.Year ? 'error' : ''}
            />
            {errors.Year && <ErrorMessage>{errors.Year}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>
              Género <span className="required">*</span>
            </Label>
            <Select
              value={formData.Type}
              onChange={(e) => handleChange('Type', e.target.value)}
              className={errors.Type ? 'error' : ''}
            >
              <option value="">Selecciona un género</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </Select>
            {errors.Type && <ErrorMessage>{errors.Type}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>
              <FaImage />
              URL del Póster
            </Label>
            <Input
              type="url"
              placeholder="https://ejemplo.com/poster.jpg"
              value={formData.Poster}
              onChange={(e) => handleChange('Poster', e.target.value)}
            />
            {formData.Poster && (
              <ImagePreview>
                <img 
                  src={formData.Poster} 
                  alt="Vista previa"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="placeholder" style={{display: 'none'}}>
                  <FaImage />
                  <div>Error al cargar la imagen</div>
                </div>
              </ImagePreview>
            )}
          </InputGroup>

          <InputGroup>
            <Label>
              Descripción <span className="required">*</span>
            </Label>
            <TextArea
              placeholder="Describe la trama de la película..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={errors.description ? 'error' : ''}
            />
            {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>
              Ubicación (Cinema) <span className="required">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Nombre del cinema o ubicación"
              value={formData.Ubication}
              onChange={(e) => handleChange('Ubication', e.target.value)}
              className={errors.Ubication ? 'error' : ''}
            />
            {errors.Ubication && <ErrorMessage>{errors.Ubication}</ErrorMessage>}
          </InputGroup>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              id="estado"
              checked={formData.Estado}
              onChange={(e) => handleChange('Estado', e.target.checked)}
            />
            <Label htmlFor="estado">
              Película activa en cartelera
            </Label>
          </CheckboxGroup>

          <ButtonGroup>
            <Button type="button" className="secondary" onClick={onCancel}>
              <FaTimes />
              Cancelar
            </Button>
            <Button type="submit" className="primary" disabled={loading}>
              <FaSave />
              {loading ? 'Guardando...' : (movie ? 'Actualizar' : 'Crear')}
            </Button>
          </ButtonGroup>
        </Form>
      </FormContainer>
    </FormOverlay>
  );
};

export default MovieForm;