
import axios from 'axios';
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

const BarGraph = () => {
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
        const url = `https://dark-erin-gharial-ring.cyclic.app/api/cart`
     fetch(url, {
          method: 'GET'
        })
        .then(res => res.json())
        .then(apiData => {
          const productName = [...new Set(apiData.map(item => item.product.ProName))];
          const producUnit = [...new Set(apiData.map(item => item.product.ProUnit))];
          const sumByProName = productName.map(ProName => ({
            ProName,
            sum: apiData.filter(item => item.product.ProName === ProName).reduce((acc, item) => acc + item.quantity, 0)
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
//  useEffect(() => {
//   if(data.length > 0) {
//     const ctx = document.getElementById('pieChart').getContext('2d');
//     const chart = new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: data.map(item => item.product.ProName),
//         datasets: [{
//           data: data.map(item => item.sum),
//           backgroundColor: ['red', 'green', 'blue'],
//         }],
//       },
//     });
//     return () => chart.destroy();
//   }
//  },[data]);
  
//   useEffect(() => {
//     fetchData()
//   },[]);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/cart');
//       const uniqueData = removeDuplicate(response.data);
//       const quantity = response.data
//       const sum = quantity.reduce((acc, quantities) => acc + quantities,0)
//       // console.log(uniqueData)
//       const data = {
//         labels: uniqueData.map(item => item.product.ProName),
//         datasets: [
//           {
//             label: 'จำนวนสินค้า',
//             data: quantity.map((item => item.quantity)) ,
//             backgroundColor: getColors(Object.keys(uniqueData).length)
//           },
//         ],
//       };
//       setData(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   }
// const getColors = (count) => {
//   return Array.from({length: count}, () => getRandomColor({ luminosity: 'lighter' }));
// };

// const getRandomColor = () => {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }

//   // Convert the hex color to RGB and adjust to create a pastel effect
//   const rgbColor = parseInt(color.slice(1), 16);
//   const r = (rgbColor >> 16) & 255;
//   const g = (rgbColor >> 8) & 255;
//   const b = rgbColor & 255;
//   const pastelColor = `rgb(${Math.floor((r + 255) / 2)}, ${Math.floor((g + 255) / 2)}, ${Math.floor((b + 255) / 2)})`;

//   return pastelColor;
// };


//   const removeDuplicate = (data) => {
//     const uniqueData = Array.from(new Set(data.map(item => item.product.ProName))).map(label => {
//       return data.find(item => item.product.ProName === label);
//     }); 
//     return uniqueData;
//   }
//   const removeDuplicateQuantity = (data) => {
//     const quantity = Array.from(new Set(data.map(item => item.quantity))).map(quantity => {
//       return data.find(item => item.quantity === quantity);
//     }); 
//     return quantity;
//   }
  
  
  
// useEffect(() => {
//   const fetchData = async() => {
//     const url = `http://localhost:3000/cart`
//     const labelSet = [];
//     const dataSet = [];
//    await fetch(url, {
//       method: 'GET'
//     }).then(data => {
//       console.log('api Data', data)
//       const res = data.json();
//       return res
//     }).then((res) => {
//       console.log('response', res)
//       for (const val of res){
//         dataSet.push(val.id);
//         labelSet.push(val.product.ProName)
//       }
//       setData({
//         labels: labelSet,
//         datasets: [
//           {
//             label: 'จำนวนสินค้า',
//             // data: dataSet,
//             data: dataSet,
//             // borderColor: 'rgb(255, 99, 132)',
//             backgroudColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//           },
//           // {
//           //   label: 'Dataset 2',
//           //   data: [1,2,3,4,5],
//           //   borderColor: 'rgb(255, 99, 132)',
//           //   backgroudColor: 'rgba(255, 99, 132, 0.5)',
//           // }
//         ]
//       })
//     })
//     .catch(e => {
//       console.log('error', e)
//     })
//   }
//   fetchData();
// },[])


  return (
    <div>
      <Pie
      // id='pieChart'
      data={ChartData} 
      options={options}
      />
     {/* <BarChart
          width={600}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis dataKey="name" scale="point"  padding={{ left: 10, right: 10 }} />
          <YAxis dataKey="number" scale="auto" />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="จำนวนสินค้า" fill="#fc82c9" background={{ fill: '#eee' }} />
        </BarChart> */}
    </div>
  )
  
}

export default BarGraph;
