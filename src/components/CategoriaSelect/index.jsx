import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoriaSelect = ({ onCategoriaChange }) => {
  const [categorias, setCategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');

  useEffect(() => {
    // Função para buscar as categorias do endpoint
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:8080/categoria/all');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCategoria(selectedId);
    onCategoriaChange(selectedId); // Passa o id da categoria selecionada para o componente pai
  };

  return (
    <select value={selectedCategoria} onChange={handleChange}>
      <option value="">Selecione uma categoria</option>
      {categorias.map((categoria) => (
        <option key={categoria.id} value={categoria.id}>
          {categoria.nome}
        </option>
      ))}
    </select>
  );
};

export default CategoriaSelect;