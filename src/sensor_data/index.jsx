import React, { useState } from 'react';
import './styles.css';
import { colorear } from './color.js';
import Graph from '../graph';
import DownloadSensorData from '../downloadSensorData';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
const styleSheet = styleElement.sheet; // Hoja de estilo CSS

// Esta función representa los datos del sensor
function SensorData({ data, searchValue }) {
  if (data === null) {
    return <p>Buscando...</p>;
  }
  const itemsPerPage = 5; // Número de elementos por página
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllData, setShowAllData] = useState(false); // Estado para controlar si se muestran todos los datos o solo los de la página actual

  // Calcula el índice inicial y final de los elementos para la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Si no ha Empezado a buscar, mostrar el texto "empezar a buscar"
  if (searchValue.length === 0) {
    return <p>Empezar a buscar...</p>;
  }
  // Si no encontró datos, mostrar el texto "no se encontró"
  if (currentItems.length === 0) {
    return <p>No se encontraron datos con la búsqueda de : {searchValue}</p>;
  }

  // Colorear según el número de datos
  colorear(styleSheet, { value: 120, saturation: 50, lightness: 90 }, data.length);

  // Función para cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <div className='sensor-data'>
        {showAllData ? (
          // Mostrar todos los datos
          data.map((sensor, index) => (
            <div key={index} className={`sensor sensor--${index}`}>
              <p>
                humedad: {sensor.ambient}% - temperatura: {sensor.temperature}°C - fecha: {sensor.fecha.match(/^(\d{4}-\d{2}-\d{2})/)[1]} hora: {sensor.fecha.match(/T(\d{2}:\d{2}:\d{2})/)[1]}
              </p>
            </div>
          ))
        ) : (
          // Mostrar solo los datos de la página actual
          currentItems.map((sensor, index) => (
            <div key={index} className={`sensor sensor--${index}`}>
              <p>
                humedad: {sensor.ambient}% - temperatura: {sensor.temperature}°C - fecha: {sensor.fecha.match(/^(\d{4}-\d{2}-\d{2})/)[1]} hora: {sensor.fecha.match(/T(\d{2}:\d{2}:\d{2})/)[1]}
              </p>
            </div>
          ))
        )}
      </div>
      <div className='sensor-controls'>
        <div className='sensor-graph'>
          {/* Renderizar el gráfico con los datos correspondientes */}
          <Graph data={showAllData ? data : currentItems} />
          {/* Botón para cambiar entre mostrar todos los datos y solo los de la página actual */}
          <div className='pagination'>
            {/* Botones para cambiar de página */}
            <div className='pagination-button--container'>
              <button className='pagination-button' onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}><FaChevronCircleLeft /></button>
              <span>Página {currentPage}</span>
              <button className='pagination-button' onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= data.length}><FaChevronCircleRight/></button>
            </div>
            <button className='all-data' onClick={() => setShowAllData(!showAllData)}>
              {showAllData ? 'Datos Actuales' : 'Todos los datos'}
            </button>
          </div>

        </div>
        <div className='sensor-file'>
          <DownloadSensorData data={data} />
        </div>
      </div>
    </>
  );
}

// Exporta el componente
export default SensorData;
