import React, { useState } from 'react';

function Search({ type = 'date', attribute, handleSearch }) {
  const [inputValue, setInputValue] = useState('');

  async function getData(input, attribute) {
    try {
      // Realiza una solicitud a la API con el atributo seleccionado y el término de búsqueda (si se proporciona)
      const response = await fetch(`http://localhost:3000/sensordata${switchAttribute(attribute)}${attribute !== 'all' ? input : ''}`);
      // Devuelve los datos obtenidos en formato JSON
      return await response.json();
    } catch (error) {
      console.error('Error al consumir la API:', error);
      return { error }; // Devuelve un objeto con el error en caso de error
    }
  }

  // Función para mapear los atributos a las rutas de la API
  function switchAttribute(attribute) {
    // Objeto que mapea los atributos a las rutas de la API
    
    const attributeList = {
      date: '/date?start_date=', // Ruta para buscar por fecha
      ambient: '/find/ambient/', // Ruta para buscar por ambiente
      temperature: '/find/temperature/', // Ruta para buscar por temperatura
      place: '/find/place/', // Ruta para buscar por lugar
      all: '/', // Ruta para obtener todos los datos
    };
    console.log(attribute, attributeList[attribute])
    // Devuelve la ruta correspondiente al atributo
    return attributeList[attribute];
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearchClick = async () => {
    const responseData = await getData(inputValue, attribute);
    handleSearch(responseData);
  };

  return (
    <div className="search-container">
      <input
        type={type}
        id="search-input"
        className="search-input"
        placeholder="Buscar..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <button
        id="search-button"
        className="search-button"
        onClick={handleSearchClick}
      >
        Buscar
      </button>
    </div>
  );
}

export default Search;
