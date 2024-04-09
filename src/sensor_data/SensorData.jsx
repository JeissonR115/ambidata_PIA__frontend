import React from 'react';
import './SensorData.css'
import { colorear } from './color.js';
const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
const styleSheet = styleElement.sheet; // Hoja de estilo CSS

function SensorData({ data }) {
  // Si no hay datos, mostrar el texto "empezar a buscar"
  if (data.length === 0) {
    return <p>Empezar a buscar...</p>;
  }
  if(data.error){
    return <p>elige una opción valida</p>
  }
  colorear(styleSheet, { value: 120, saturation: 50, lightness: 90 }, data.length);
  // Si hay datos, mostrar los elementos del array
  return (
    <div>
      {data.map((sensor, index) => (
        <div key={index} className={`sensor sensor--${index}`}>
          <p>humedad: {sensor.ambient}% - temperatura: {sensor.temperature}°C - fecha: {sensor.fecha.match(/^(\d{4}-\d{2}-\d{2})/)[1]} hora: {sensor.fecha.match(/T(\d{2}:\d{2}:\d{2})/)[1]}</p>
        </div>
      ))}
    </div>
  );
}

export default SensorData;