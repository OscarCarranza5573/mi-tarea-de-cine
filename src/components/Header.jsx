import React from 'react';
import styled from 'styled-components';
import { FaFilm, FaSearch, FaPlus } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  color: white;

  svg {
    font-size: 2rem;
    color: #ffd700;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    
    svg {
      font-size: 1.7rem;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const NavButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 1rem;
  font-weight: 300;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Header = ({ onShowAddForm, onToggleSearch, showSearch }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <div>
          <Logo>
            <FaFilm />
            CineApp
          </Logo>
          <Subtitle>Descubre las mejores películas en cartelera</Subtitle>
        </div>
        
        <Nav>
          <NavButton onClick={onToggleSearch}>
            <FaSearch />
            {showSearch ? 'Ocultar Búsqueda' : 'Buscar'}
          </NavButton>
          <NavButton onClick={onShowAddForm}>
            <FaPlus />
            Agregar Película
          </NavButton>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;