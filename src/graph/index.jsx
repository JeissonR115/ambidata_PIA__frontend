import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Graph() {
    const options = {};
    const labels = ['1','2','3','4','5','6','7']
    const datasets = [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgb(75, 192, 192)',
    }]
    const chartData = {
        labels: labels,
        datasets: datasets
    };
    return <Line data={chartData} />
}
export default Graph