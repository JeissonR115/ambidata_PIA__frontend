import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { separateData } from './separateData.js';

// Esta función representa la gráfica
function Graph({ data, filter }) {
    // Filtra los datos según el filtro seleccionado
    const filteredData = separateData(data, filter);
    // Configuración de la gráfica
    const options = {};

    // Obtiene las etiquetas y los conjuntos de datos
    const { labels, datasets } = getChartData(filteredData);

    // Datos de la gráfica
    const chartData = {
        labels: labels,
        datasets: datasets
    };

    // Renderiza la gráfica
    return <Line data={chartData} options={options} />;
}

// Función que obtiene los datos de la gráfica
function getChartData(filteredData) {
    // Obtiene las etiquetas
    const labels = filteredData.fecha;
    // Extrae la frecuencia de cada fecha

    // Obtiene los conjuntos de datos
    const datasets = [{
        label: 'temperatura',
        data: filteredData.temperature,
        borderColor: 'rgb(75, 192, 192)'
    },
    {
        label: 'Humedad',
        data: filteredData.ambient,
        borderColor: 'rgb(200, 100, 100)'
    }];

    return { labels, datasets };
}

// Exporta la gráfica
export default Graph;