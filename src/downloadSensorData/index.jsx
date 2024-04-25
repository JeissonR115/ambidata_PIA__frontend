import React, { useState } from 'react';
import './styles.css'

function DownloadSensorData({ data = [] }) {
  const [selectedFileType, setSelectedFileType] = useState('txt');

  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
  };

  const convertJSONToCSV = (data) => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map((obj) => Object.values(obj).join(',')).join('\n');
    return `${header}\n${rows}`;
  };

  const convertJSONToText = (data) => {
    return data.map((obj) => {
      const formattedData = Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
      return `-----\n${formattedData}`;
    }).join('\n');
  };

  const convertJSONToXML = (data) => {
    let xmlString = '<sensorData>';
    data.forEach((sensor) => {
      xmlString += '<sensor>';
      Object.entries(sensor).forEach(([key, value]) => {
        xmlString += `<${key}>${value}</${key}>`;
      });
      xmlString += '</sensor>';
    });
    xmlString += '</sensorData>';
    return xmlString;
  };

  const convertJSONToHTML = (data) => {
    let htmlString = '<table border="1">';
  
    // Crear encabezados de tabla
    htmlString += '<tr>';
    Object.keys(data[0]).forEach(key => {
      htmlString += `<th>${key}</th>`;
    });
    htmlString += '</tr>';
  
    // Crear filas de datos
    data.forEach(sensor => {
      htmlString += '<tr>';
      Object.values(sensor).forEach(value => {
        htmlString += `<td>${value}</td>`;
      });
      htmlString += '</tr>';
    });
  
    htmlString += '</table>';
  
    return htmlString;
};

  const typeFiles = {
    csv: { name: "CSV", converter: convertJSONToCSV },
    json: { name: "JSON", converter: JSON.stringify },
    txt: { name: "Text", converter: convertJSONToText },
    xml: { name: "XML", converter: convertJSONToXML },
    html: { name: "HTML", converter: convertJSONToHTML },
  };

  const createFile = (typeFile) => {
    const convertedData = typeFiles[typeFile].converter(data);
    const blob = new Blob([convertedData], { type: 'text/plain' });
    const tempAnchor = document.createElement('a');
    tempAnchor.href = URL.createObjectURL(blob);
    tempAnchor.download = `sensor_data_file.${typeFile}`;
    tempAnchor.click();
    URL.revokeObjectURL(tempAnchor.href);
  };

  return (
    <>
      <div className='sensor-file__type'>
        <label className='sensor-file__label' htmlFor="fileType">Selecciona el tipo de archivo: </label>
        <select className='sensor-file__select' id="fileType" value={selectedFileType} onChange={handleFileTypeChange}>
          {Object.keys(typeFiles).map((typeFile) => (
            <option key={typeFile} value={typeFile}>{typeFiles[typeFile].name}</option>
          ))}
        </select>
      </div>
      <button className='sensor-file__download' onClick={() => createFile(selectedFileType)}>Download</button>
    </>
  );
}

export default DownloadSensorData;
