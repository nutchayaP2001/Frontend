import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js'
import { useEffect, useState } from 'react';

import { Chart, Doughnut, Pie } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
ChartJS.register(
  // CategoryScale,
  // LinearScale,
  // BarElement,
  // Title,
  ArcElement,
  Tooltip,
  Legend
);

const options = {
 
  responsive: true,
  plugins: {
    legend: {
      labels:{
        font: {
          family: 'Kanit'
        }
      }
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    }
  }
}

const BarGraphSale = () => {
  const {id} = useParams();
  const [data, setData] = useState([]);

  const [ChartData, setChartData] = useState({
    labels: ['Sunday'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [1,2,3,4,5],
        backgroudColor: ['red', 'green', 'blue','black','pink','orange'],
      },
    ]
    });
 useEffect(() => {
        const url = `http://localhost:3000/api/orders`
     fetch(url, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(apiData => {
          const productName = [...new Set(apiData.map(item => item.product.ProName))];
          const sumByProName = productName.map(ProName => ({
            ProName,
            sum: apiData.filter(item => item.product.ProName === ProName).reduce((acc, item) => acc + item.order_amount, 0)
          }));

          const data = {
                    labels: productName,
                    datasets: [
                      {
                        label: 'จำนวนสินค้า',
                        data: sumByProName.map(item => item.sum) ,
                        // backgroundColor: getColors(productName)
                        backgroundColor: getRandomColor(productName.length)
                      },
                    ],
                  };


          setData(sumByProName);
          setChartData(data);
          console.log(data)
        })
        .catch(error => console.error('Error Fetching data: ', error));

 },[])


const getRandomColor = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const randomColor = `rgba(
      ${Math.floor(Math.random()* 255)}, 
      ${Math.floor(Math.random() * 255)}, 
      ${Math.floor(Math.random() * 255)}, .5)`;
    colors.push(randomColor);
  }
  return colors;
}

  return (
    <div>

<Pie 
      data={ChartData} 
      options={options}
      />

     
    </div>
  )
  
}

export default BarGraphSale;