import React, { useState } from 'react';
import CategoriaSelect from '../CategoriaSelect';

const App2 = () => {
  const [categoriaId, setCategoriaId] = useState('');

  const handleCategoriaChange = (id) => {
    setCategoriaId(id);
    console.log('Categoria selecionada:', id);
  };

  return (
    <div>
      <h1>Selecione uma Categoria</h1>
      <CategoriaSelect onCategoriaChange={handleCategoriaChange} />
      <p>Categoria selecionada: {categoriaId}</p>
    </div>
  );
};

export default App2;