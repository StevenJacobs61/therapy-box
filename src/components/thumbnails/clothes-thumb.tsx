import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import Styles from './thumbnails.module.css';
import { ChartData, Chart, ArcElement } from 'chart.js';
Chart.register(ArcElement);


type ClothesItem = {
  id: string;
  date: string;
  clothe: string;
};

type Payload = ClothesItem[];

type ClothesObject = {
  [clothe: string]: number;
  total: number;
};



const ClothesThumb = () => {
  const [data, setData] = useState<Payload | null>(null);
  const [clothes, setClothes] = useState<ClothesObject>({ total: 0 });
  const [charData, setCharData] = useState<ChartData<"pie", number[], unknown>>({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    }],
  });

  useEffect(() => {
    async function fetchClothesData() {
      try {
        const clothesData = await fetch(`${process.env.REACT_APP_BASE_URL}/clothes`);
        const jsonData = await clothesData.json();
        setData(jsonData.payload);
      } catch (error) {
        console.error(error);
      }
    }
    fetchClothesData();
  }, []);

  useEffect(() => {
    if (data) {
      const clothesObject = data.reduce<ClothesObject>(
        (accumulator, currentValue) => {
          accumulator[currentValue.clothe] = (accumulator[currentValue.clothe] || 0) + 1;
          return accumulator;
        },
        { total: data.length }
      );
      const clothesCount = clothesObject.total;
      const percentageObject: any = Object.entries(clothesObject).reduce((acc, [clothe, count]) => {
        if (clothe !== "total") {
          const percentage = (count / clothesCount) * 100;
          acc[clothe] = parseFloat(percentage.toFixed(2));
        }
        return acc;
      }, {} as Record<string, number>);
      setClothes(percentageObject);
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(clothes).length === 0) {
      return;
    }
  
    const chartData: ChartData<"pie", number[], unknown> = {
      labels: Object.keys(clothes),
      datasets: [
        {
          data: Object.values(clothes),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    } as ChartData<"pie", number[], unknown>;
    setCharData(chartData);
  }, [clothes]);
  
    return (
    <div className={Styles.clothesContainer}>
          <div className={Styles.pieChartContainer} >
          <Pie data={charData} className={Styles.pieChart}/>
    </div>
          <ul>
            {charData?.labels?.map((item, index) => 
              <li key={index}
              className={Styles.keyItem}
              style={{backgroundColor: Array.isArray(charData.datasets) && 
                charData.datasets[0] && 
                Array.isArray(charData.datasets[0].backgroundColor) && 
                charData.datasets[0].backgroundColor[index]}}
              >{(item as string)} - 
              {charData?.datasets[0]?.data[index]}%
              </li>
            )}
           
          </ul>
      </div>
    )
  }

  export default ClothesThumb