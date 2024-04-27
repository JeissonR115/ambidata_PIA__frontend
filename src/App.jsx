import React, { Component } from 'react';
import './App.css';
import logo from '/logo.svg';
import Filter from './filter';
import Search from './search';
import SensorData from './sensor_data';
import Logout from './logout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '', // búsqueda
      selectedOption: 'date', // opción seleccionada
      selectedTypeDataOption: 'date', // tipo de dato seleccionado
      data: [], // datos
      error: null // error
    };
  }

  // Opciones de filtro
  options = [
    { id: 'date', value: 'date', text: 'Fecha', type: 'date' },
    { id: 'ambient', value: 'ambient', text: 'Humedad', type: 'number' },
    { id: 'temperature', value: 'temperature', text: 'Temperatura', type: 'number' },
    { id: 'place', value: 'place', text: 'Lugar', type: 'text' },
    // { id: 'all', value: 'all', text: 'Todo', type: 'text' }
  ];

  // Función para cambiar la opción seleccionada
  handleOptionChange = (event) => {
    this.setState({ selectedOption: event.target.value });
    // Busca la opción seleccionada
    const selectedOption = this.options.find(
      (option) => option.value === event.target.value
    );
    this.setState({ selectedTypeDataOption: selectedOption.type }); // Selecciona el tipo de dato de la opción seleccionada
    this.setState({ searchValue: '' }); // Establece el valor de búsqueda en vacío
  };

  // Función para cambiar el valor de búsqueda
  handleInputChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  // Función para realizar la búsqueda
  handleSearch = (responseData, searchValue) => {
    if (responseData.error) {
      // Si hay un error, establece el estado del error
      this.setState({ error: responseData.error, data: [] });
    } else {
      // Si no hay errores, simula un tiempo de espera de 3 segundos
      setTimeout(() => {
        this.setState({ error: null, data: responseData }); // Establece los datos recibidos
      }, 3000);
      this.setState({ data: null }); // Establece los datos en null mientras pasan los tres segundos
    }
    this.setState({ searchValue }); // Establece el valor de búsqueda
  };

  render() {
    const { searchValue, selectedOption, data, error, selectedTypeDataOption } = this.state;
    return (
      <>
        <div className="header">
          <h1 className="title">AmbiData</h1>
          <img className="logo" src={logo} alt="Logo" />
          <div className='logout-container'>
            <Logout setIsLoggedIn={this.props.setIsLoggedIn} />
          </div>
        </div>

        <div className="search-container">
          <Search
            type={selectedTypeDataOption}
            attribute={selectedOption}
            handleInputChange={this.handleInputChange}
            handleSearch={this.handleSearch}
          />
        </div>

        <div className="filter-container">
          {this.options.map((option, i) => (
            // Renders each filter option
            <Filter
              key={option.id}
              text={option.text}
              value={option.value}
              handler={this.handleOptionChange}
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
}

export default App;
