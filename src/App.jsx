import './App.css';
import logo from '../public/logo.svg'; // Importa la imagen del logo
import { useState } from 'react';
import FilterInput from './filter/filter-input';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  
  const options = [
    { id: 'fecha', text: 'Fecha', type: 'date' },
    { id: 'humedad', text: 'Humedad', type: 'number' },
    { id: 'temperatura', text: 'Temperatura', type: 'number' },
    { id: 'lugar', text: 'Lugar', type: 'text' },
    { id: 'todo', text: 'Todo', type: 'text' }
  ];

  const handleOptionChange = (event) => {
    const selectedType = event.target.value;
    setSelectedOption(selectedType);
    setSearchValue(''); // Limpiar el valor de búsqueda al cambiar la opción
  };

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <>
      <div className="header">
        <h1 className="title">AmbiData</h1>
        <img className='logo' src={logo} alt="Logo" /> {/* Usa la imagen del logo */}
      </div>
      <div className="search-container">
        <input 
          type={selectedOption}
          id="search-input" 
          className="search-input" 
          placeholder="Buscar..." 
          value={searchValue}
          onChange={handleInputChange}
        />
        <button id="search-button" className="search-button">Buscar</button>
      </div>
      <div className="filter-container">
        {/* Utiliza una lista de opciones de filtro para evitar la repetición de código */}
        {options.map((option) =>(          
        <FilterInput 
            key={option.id} 
            text={option.text} 
            type={option.type} 
            handler={handleOptionChange} 
          />)
          )}
      </div>
      <div className="api-data" >Ingrese una búsqueda y presione el botón.</div>
    </>
  );
}

export default App;
