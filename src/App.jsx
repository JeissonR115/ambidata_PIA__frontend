import React, { useState } from 'react';
import './App.css';
import logo from '../public/logo.svg';
import Filter from './filter/Filter';
import Search from './search/Search';
import SensorData from './sensor_data/SensorData';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedOption, setSelectedOption] = useState('date'); // Inicializa con 'date'
  const [selectedTypeDataOption, setSelectedTypeDataOption] = useState('date');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const options = [
    { id: 'date', value: 'date', text: 'Fecha', type: 'date' },
    { id: 'ambient', value: 'ambient', text: 'Humedad', type: 'number' },
    { id: 'temperature', value: 'temperature', text: 'Temperatura', type: 'number' },
    { id: 'place', value: 'place', text: 'Lugar', type: 'text' },
    { id: 'all', value: 'all', text: 'Todo', type: 'text' }
  ];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    const selectedOption = options.find(option => option.value === event.target.value);
    setSelectedTypeDataOption(selectedOption.type);
    setSearchValue('');
  };
  
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (responseData,searchValue) => {
    if (responseData.error) {
      setError(responseData.error);
      setData([]);
    } else {
      setError(null);
      setData(responseData);
    }
    setSearchValue(searchValue)
  };

  return (
    <>
      <div className="header">
        <h1 className="title">AmbiData</h1>
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <Search
        type={selectedTypeDataOption}
        attribute={selectedOption}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
      <div className="filter-container">
        {options.map((option,i) => (
          <Filter
        
            key={option.id}
            text={option.text}
            value={option.value}
            handler={handleOptionChange}
            checked={selectedOption === option.value} // Establece el valor de checked
          />
        ))}
      </div>
        <SensorData data={data} searchValue={searchValue} />
    </>
  );
}

export default App;
