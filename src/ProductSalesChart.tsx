import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { SaleInfo } from './GetProductAPI';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const SalesChart = ({ sales }: { sales: SaleInfo[] }) => {
  sales.sort(
    (a, b) =>
      new Date(a.weekEnding).getTime() - new Date(b.weekEnding).getTime()
  );
  const data = {
    labels: sales.map((sale) => sale.weekEnding),
    datasets: [
      {
        label: 'Retail Sales',
        data: sales.map((sale) => sale.retailSales),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Wholesale Sales',
        data: sales.map((sale) => sale.wholesaleSales),
        borderColor: 'rgba(192, 75, 75, 1)',
        backgroundColor: 'rgba(192, 75, 75, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Retail Sales',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Sales ($)',
        },
      },
    },
  };

  return (
    <div
      style={{
        height: '400px',
        backgroundColor: 'aliceblue',
        marginBottom: '20px',
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChart;
