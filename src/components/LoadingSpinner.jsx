import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFilm } from 'react-icons/fa';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
`;

const SpinnerIcon = styled(FaFilm)`
  font-size: 3rem;
  color: #667eea;
  animation: ${spin} 2s linear infinite;
  margin-bottom: 1rem;
`;

const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const LoadingSpinner = ({ text = 'Cargando películas...' }) => {
  return (
    <LoadingContainer>
      <SpinnerIcon />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingSpinner;