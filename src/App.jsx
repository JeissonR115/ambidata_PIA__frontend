import React, { useState } from 'react';
import './App.css';
import logo from '/logo.svg';
import Filter from './filter';
import Search from './search';
import SensorData from './sensor_data';


function App() {
  // Estados
  const [searchValue, setSearchValue] = useState('');// búsqueda
  const [selectedOption, setSelectedOption] = useState('date');// opción seleccionada
  const [selectedTypeDataOption, setSelectedTypeDataOption] = useState('date');// tipo de dato seleccionado
  const [data, setData] = useState([]);// datos
  const [error, setError] = useState(null);// error

  // Opciones de filtro
  const options = [
    { id: 'date', value: 'date', text: 'Fecha', type: 'date' },
    { id: 'ambient', value: 'ambient', text: 'Humedad', type: 'number' },
    { id: 'temperature', value: 'temperature', text: 'Temperatura', type: 'number' },
    { id: 'place', value: 'place', text: 'Lugar', type: 'text' },
    // { id: 'all', value: 'all', text: 'Todo', type: 'text' }
  ];

  // Función para cambiar la opción seleccionada
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Busca la opción seleccionada
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    setSelectedTypeDataOption(selectedOption.type);// Selecciona el tipo de dato de la opción seleccionada
    setSearchValue('');// Establece el valor de búsqueda en vacío
  };

  // Función para cambiar el valor de búsqueda
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Función para realizar la búsqueda
  const handleSearch = (responseData, searchValue) => {
    if (responseData.error) {
      // Si hay un error, establece el estado del error
      setError(responseData.error);
      setData([]);
    } else {
      // Si no hay errores, simula un tiempo de espera de 3 segundos
      setTimeout(() => {
        setError(null);// Establece el estado del error en null
        setData(responseData);// Establece los datos recibidos
      }, 3000);
      
      setData(null);// Establece los datos en null mientras pasan los tres segundos
    }
    setSearchValue(searchValue);// Establece el valor de búsqueda
  };

  return (
    // Renderiza la aplicación
    <>
      <div className="header">
        <h1 className="title">AmbiData</h1>
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="search-container">
        <Search
          type={selectedTypeDataOption}
          attribute={selectedOption}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
        />
      </div>

      <div className="filter-container">
        {options.map((option, i) => (
          // Renders each filter option
          <Filter
            key={option.id}
            text={option.text}
            value={option.value}
            handler={handleOptionChange}
            checked={selectedOption === option.value}
          />
        ))}
      </div>
      <div className="sensor-container">
        <SensorData data={data} searchValue={searchValue} />
      </div>
    </>
  );
}

// Exporta la aplicación
export default App;