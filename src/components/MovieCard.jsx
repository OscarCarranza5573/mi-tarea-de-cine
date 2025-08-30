import React, { useState } from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaCalendar, FaMapMarkerAlt, FaTags, FaEye } from 'react-icons/fa';

const Card = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
`;

const MovieImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  font-size: 3rem;
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => props.$active ? '#28a745' : '#dc3545'};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  color: #333;
  margin: 0 0 0.5rem 0;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  svg {
    color: #667eea;
  }
`;

const Description = styled.p`
  color: #666;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.95rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &.view {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
  }

  &.edit {
    background: #ffc107;
    color: #212529;

    &:hover {
      background: #ffb300;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
    }
  }

  &.delete {
    background: #dc3545;
    color: white;

    &:hover {
      background: #c82333;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const Modal = styled.div`
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

const ModalContent = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
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

const ModalImage = styled.img`
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 1rem;
`;

const MovieCard = ({ movie, onEdit, onDelete, loading }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleDelete = () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar "${movie.Title}"?`)) {
      onDelete(movie.imdbID);
    }
  };

  return (
    <>
      <Card>
        <ImageContainer>
          {!imageError && movie.Poster ? (
            <MovieImage 
              src={movie.Poster} 
              alt={movie.Title}
              onError={handleImageError}
            />
          ) : (
            <ImagePlaceholder>
              <FaEye />
            </ImagePlaceholder>
          )}
          <StatusBadge $active={movie.Estado}>
            {movie.Estado ? 'Activa' : 'Inactiva'}
          </StatusBadge>
        </ImageContainer>

        <CardContent>
          <Title>{movie.Title}</Title>
          
          <MetaInfo>
            <MetaItem>
              <FaCalendar />
              {movie.Year}
            </MetaItem>
            <MetaItem>
              <FaTags />
              {movie.Type}
            </MetaItem>
            <MetaItem>
              <FaMapMarkerAlt />
              {movie.Ubication}
            </MetaItem>
          </MetaInfo>

          <Description>{movie.description}</Description>

          <ActionButtons>
            <ActionButton 
              className="view" 
              onClick={() => setShowModal(true)}
            >
              <FaEye />
              Ver Detalles
            </ActionButton>
            <ActionButton 
              className="edit" 
              onClick={() => onEdit(movie)}
              disabled={loading}
            >
              <FaEdit />
              Editar
            </ActionButton>
            <ActionButton 
              className="delete" 
              onClick={handleDelete}
              disabled={loading}
            >
              <FaTrash />
              Eliminar
            </ActionButton>
          </ActionButtons>
        </CardContent>
      </Card>

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setShowModal(false)}>
              ×
            </CloseButton>
            
            {!imageError && movie.Poster && (
              <ModalImage 
                src={movie.Poster} 
                alt={movie.Title}
                onError={handleImageError}
              />
            )}
            
            <Title>{movie.Title}</Title>
            
            <MetaInfo>
              <MetaItem>
                <FaCalendar />
                Año: {movie.Year}
              </MetaItem>
              <MetaItem>
                <FaTags />
                Género: {movie.Type}
              </MetaItem>
              <MetaItem>
                <FaMapMarkerAlt />
                Ubicación: {movie.Ubication}
              </MetaItem>
            </MetaInfo>
            
            <Description style={{ WebkitLineClamp: 'unset', display: 'block' }}>
              {movie.description}
            </Description>
            
            <p><strong>ID:</strong> {movie.imdbID}</p>
            <p><strong>Estado:</strong> {movie.Estado ? 'Activa' : 'Inactiva'}</p>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default MovieCard;