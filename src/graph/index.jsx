import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { separateData } from './separateData.js';

function Graph({ data, filter }) {
    const filteredData = separateData(data,'fecha')
    const options = {};
    
    const labels = filteredData.fecha
    // Extracting the frequency of each date
    
    const datasets = [{
        label: 'temperatura',
        data: filteredData.temperature,
        borderColor: 'rgb(75, 192, 192)',
    },
    {
        label: 'Humedad',
        data: filteredData.ambient,
        borderColor: 'rgb(200, 100, 100)',
    }

];

    const chartData = {
        labels: labels,
        datasets: datasets
    };

    return <Line data={chartData} options={options} />;
}

export default Graph;
