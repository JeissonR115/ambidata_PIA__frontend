import React from 'react';
import './styles.css';
import { colorear } from './color.js';
import Graph from '../graph';
import DownloadSensorData from '../downloadSensorData';

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
const styleSheet = styleElement.sheet; // Hoja de estilo CSS
// Esta función representa los datos del sensor
function SensorData({ data, searchValue }) {
  // Si no hay datos, mostrar el texto "empezar a buscar"
  if (data === null) {
    return <p>Buscando...</p>;
  }
  // Si no ha Empezado a buscar, mostrar el texto "empezar a buscar"
  if (searchValue.length === 0) {
    return <p>Empezar a buscar...</p>;
  }
  // Si no encontró datos, mostrar el texto "no se encontró"
  if (data.length === 0) {
    return <p>No se encontraron datos con la búsqueda de : {searchValue}</p>;
  }
  colorear(styleSheet, { value: 120, saturation: 50, lightness: 90 }, data.length);
  // Si hay datos, mostrar los elementos del array
  return (
    <>
      <div className='sensor-data'>
        {data.map((sensor, index) => (
          // Renders each sensor
          <div key={index} className={`sensor sensor--${index}`}>
            <p>
              humedad: {sensor.ambient}% - temperatura: {sensor.temperature}°C - fecha: {sensor.fecha.match(/^(\d{4}-\d{2}-\d{2})/)[1]} hora: {sensor.fecha.match(/T(\d{2}:\d{2}:\d{2})/)[1]}
            </p>
          </div>
        ))}
      </div>
      <div className='sensor-controls'>
        <div className='sensor-graph'>
          <Graph data={data} />
        </div>
        <div className='sensor-file'>
          <DownloadSensorData data={data}></DownloadSensorData>
        </div>
      </div>

    </>
  );
}

// Exporta el componente
export default SensorData;