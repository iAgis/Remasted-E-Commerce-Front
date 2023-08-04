import "../../components/Admin/Admin.css";
import { useSelector } from "react-redux";
import { Line, Bar } from "react-chartjs-2";
import axios from "axios";
import { useState, useEffect } from "react";

function Dashboard() {
  const [carsSoldSeeder, setCarsSoldSeeder] = useState([]);

  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const getData = () => {
      axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/products",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
      }).then((response) => {
        setProducts(
          response.data.map((product) => {
            return product.name;
          })
        );
        setCarsSoldSeeder(() => {
          let carsSoldRandom = [];
          for (let i = 1; i <= response.data.length; i++) {
            carsSoldRandom.push(Math.ceil(Math.random() * 40));
          }
          return carsSoldRandom;
        });
      });
    };
    getData();
    // eslint-disable-next-line
  }, []);

  const dataBarChart = {
    labels: products,
    datasets: [
      {
        label: `Total Cars Sold`,
        data: carsSoldSeeder,
        backgroundColor: `rgb(0,191,255)`,
        borderColor: `rgba(30,144,255,0.2)
        `,
      },
    ],
  };

  const dataLineChart = {
    labels: [
      `January`,
      `February`,
      `May`,
      `April`,
      `March`,
      `June`,
      `August`,
      `September`,
      `October`,
      `November`,
      `Dicember`,
    ],
    datasets: [
      {
        label: `Earnings`,
        data: [
          545000, 12000000, 300000, 100000, 200000, 3500000, 2500000, 310000,
          400000,
        ],
        backgroundColor: `rgb(124,252,0)`,
        borderColor: `rgba(124,240,0, 0.2)`,
      },
    ],
  };
  /* const products = orders.map((order) => {
    return order.products;
  });

  console.log(orders);
  /* const axiosDataProducts = axiosDataOrders.map((products) => {
    return products.map((product) => {
      return product.name;
    });
  }); */
  /* console.log(axiosDataProducts);
  const axiosProducts2 = axiosDataProducts.map((product) => {
    return product.name;
  }); */
  //console.log(axiosProducts2); */

  //async function setChartData() {}

  const optionsBarChart = {
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true },
        },
      ],
    },
  };

  const optionsLineChart = {
    scales: {
      yAxes: [
        {
          ticks: { beginAtZero: true },
        },
      ],
      xAxes: [
        {
          type: `time`,
          time: {
            unit: `month`,
          },
        },
      ],
    },
  };
  return (
    <div className="d-flex flex-column w-100 p-4">
      <div className="d-flex flex-column">
        <span className="d-flex titles-commerce fw-bold fs-4">Dashboard</span>
        <div>
          <Line data={dataLineChart} options={optionsLineChart} />
        </div>
        <div>
          <Bar data={dataBarChart} options={optionsBarChart} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
