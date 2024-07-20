"use client";
"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
} from "recharts";

const Graph = ({ graphType }: any) => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.coingecko.com/api/v3/global/?x_cg_api_key=CG-tvKmAT1u9LEXA2qCF1dkeJHw"
  //       );
  //       const jsonData = await response.json();
  //       console.log(jsonData.data);
  //       const formattedData = jsonData.total_market_cap.map(
  //         ([name, marketCap]) => ({
  //           name: name,
  //           marketCap: marketCap / 1e9, // Convert to billions
  //         })
  //       );
  //       setData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  //   // const interval = setInterval(fetchData, 60000); // Fetch data every minute

  //   // return () => clearInterval(interval);
  // }, []);

  const renderLineChart = () => (
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis />
      {/* <Tooltip formatter={(value) => `$${value.toFixed(2)}B`} /> */}
      <Legend />
      <Brush dataKey="name" height={30} stroke="#8884d8" />
      <Line
        type="monotone"
        dataKey="marketCap"
        stroke="#8884d8"
        name="Global Market Cap"
      />
    </LineChart>
  );

  const renderCandlestickChart = () => (
    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="name" />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip
        // formatter={(value) => `$${value.toFixed(2)}B`}
        content={({ payload, label }) => {
          if (payload && payload.length) {
            const marketCap = payload[0].value;
            return (
              <div
                className="custom-tooltip"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <p>{`Date: ${label}`}</p>
                {/* <p>{`Global Market Cap: $${marketCap.toFixed(2)}B`}</p> */}
              </div>
            );
          }
          return null;
        }}
      />
      <Legend />
      <Brush dataKey="name" height={30} stroke="#8884d8" />
      <Bar dataKey="marketCap" fill="#8884d8" name="Global Market Cap">
        {data.map((entry, index) => (
          <ReferenceLine
            key={index}
            // y={entry.marketCap}
            stroke="#8884d8"
            strokeWidth={3}
            ifOverflow="extendDomain"
            segment={[{ x: index - 0.2 }, { x: index + 0.2 }]}
          />
        ))}
      </Bar>
    </BarChart>
  );

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ResponsiveContainer>
        {graphType === "line" ? renderLineChart() : renderCandlestickChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
