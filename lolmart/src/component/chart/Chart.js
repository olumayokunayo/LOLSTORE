import React from "react";
import styles from "./Chart.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Card from "../card/Card";
import { selectOrderHistory } from "../../redux/slice/orderSlice";
import { useSelector } from "react-redux";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};
const Chart = () => {
  const orders = useSelector(selectOrderHistory);

  // create a new array of order status
  const array = [];
  orders.map((item) => {
    const { orderStatus } = item;
    array.push(orderStatus);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "Order Placed...",
    "Processing",
    "Delivered",
    "Shipped",
  ];
  const placed = getOrderCount(array, q1);
  const processing = getOrderCount(array, q2);
  const delivered = getOrderCount(array, q4);
  const shipped = getOrderCount(array, q3);

  const data = {
    labels: ["Order Placed...", "Processing", "Delivered", "Shipped"],
    datasets: [
      {
        label: "Order Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "orangered",
      },
    ],
  };
  return (
    <div className={styles.charts}>
      <Card cardClass={styles.card}>
        <h3>Order Status Chart</h3>
        <Bar options={options} data={data} />
      </Card>
    </div>
  );
};

export default Chart;
