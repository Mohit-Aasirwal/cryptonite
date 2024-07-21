"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TimeChart = ({ timeRange, coinId }: any) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const now = Math.floor(Date.now() / 1000);
      let from;

      switch (timeRange) {
        case "1D":
          from = now - 24 * 60 * 60;
          break;
        case "1W":
          from = now - 7 * 24 * 60 * 60;
          break;
        case "1M":
          from = now - 30 * 24 * 60 * 60;
          break;
        case "1Y":
          from = now - 365 * 24 * 60 * 60;
          break;
        case "2Y":
          from = now - 2 * 365 * 24 * 60 * 60;
          break;
        case "5Y":
          from = now - 5 * 365 * 24 * 60 * 60;
          break;
        case "ALL":
          from = 1367174841; // Bitcoin's first recorded price on CoinGecko
          break;
        default:
          from = now - 24 * 60 * 60;
      }

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${from}&to=${now}&precision=3`,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        const formattedData = response.data.prices.map(
          ([time, price]: any) => ({
            time: new Date(time).toLocaleDateString(),
            price: price,
          })
        );
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [timeRange]);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeChart;
