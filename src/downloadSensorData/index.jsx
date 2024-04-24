import React, { useState } from 'react';
import './styles.css'
function DownloadSensorData({ data = [] }) {
  const [selectedFileType, setSelectedFileType] = useState('txt');

  const handleFileTypeChange = (event) => {
    setSelectedFileType(event.target.value);
  };

  const convertFile = (data, typeFile) => {
    const typeFiles = {
      csv: convertJSONToCSV(data),
      json: JSON.stringify(data),
      txt: convertJSONToText(data),
    };
    return typeFiles[typeFile] ?? '';
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

  const createFile = (data, typeFile) => {
    const convertedData = convertFile(data, typeFile);
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
      <label className='sensor-file__label' htmlFor="fileType">Select file type: </label>
      <select className='sensor-file__select' id="fileType" value={selectedFileType} onChange={handleFileTypeChange}>
        <option value="txt">Text</option>
        <option value="csv">CSV</option>
        <option value="json">JSON</option>
      </select>
      </div>
      <button className='sensor-file__download' onClick={() => createFile(data, selectedFileType)}>Download</button>
    </>
  );
}

export default DownloadSensorData;
