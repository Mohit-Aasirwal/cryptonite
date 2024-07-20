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

const Graph = () => {
  const [data, setData] = useState([]);
  const [graphType, setGraphType] = useState("line");
  const [currencies, setCurrencies] = useState(["BTC", "ETH", "XRP"]);

  useEffect(() => {
    const fetchData = () => {
      // Simulating live data fetch
      const newDataPoint = currencies.reduce((acc, currency) => {
        const open = Math.random() * 1000;
        const close = Math.random() * 1000;
        acc[currency] = {
          price: (open + close) / 2,
          open: open,
          close: close,
          high: Math.max(open, close) + Math.random() * 50,
          low: Math.min(open, close) - Math.random() * 50,
        };
        return acc;
      }, {});

      setData((prevData) => [
        ...prevData.slice(-100),
        { time: new Date().toLocaleTimeString(), ...newDataPoint },
      ]);
    };

    const interval = setInterval(fetchData, 20000); // Fetch data every second

    return () => clearInterval(interval);
  }, [currencies]);

  const toggleGraphType = () => {
    setGraphType((prevType) => (prevType === "line" ? "candle" : "line"));
  };

  const renderLineChart = () => (
    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Brush dataKey="time" height={30} stroke="#8884d8" />
      {currencies.map((currency, index) => (
        <Line
          type="monotone"
          dataKey={`${currency}.price`}
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
          key={index}
        />
      ))}
    </LineChart>
  );

  const renderCandlestickChart = () => (
    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
      <XAxis dataKey="time" />
      <YAxis domain={["auto", "auto"]} />
      <Tooltip
        content={({ payload, label }) => {
          if (payload && payload.length) {
            return (
              <div
                className="custom-tooltip"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                  border: "1px solid #ccc",
                }}
              >
                <p>{`Time: ${label}`}</p>
                {payload.map((entry, index) => {
                  const currencyData = entry.payload[entry.name];
                  if (currencyData) {
                    return (
                      <p key={index} style={{ color: entry.color }}>
                        {`${entry.name}: Open: ${
                          currencyData.open?.toFixed(2) || "N/A"
                        }, Close: ${
                          currencyData.close?.toFixed(2) || "N/A"
                        }, High: ${
                          currencyData.high?.toFixed(2) || "N/A"
                        }, Low: ${currencyData.low?.toFixed(2) || "N/A"}`}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            );
          }
          return null;
        }}
      />
      <Legend />
      <Brush dataKey="time" height={30} stroke="#8884d8" />
      {currencies.map((currency, index) => {
        const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        return (
          <React.Fragment key={index}>
            <Bar dataKey={`${currency}.open`} fill={color} opacity={0} />
            <Bar dataKey={`${currency}.close`} fill={color} opacity={0} />
            <ReferenceLine
              yAxisId={0}
              ifOverflow="extendDomain"
              segment={[
                { x: "time", y: `${currency}.low` },
                { x: "time", y: `${currency}.high` },
              ]}
              stroke={color}
            />
            <Bar
              dataKey={`${currency}.open`}
              fill={color}
              stroke={color}
              yAxisId={0}
              name={currency}
            >
              {data.map((entry, entryIndex) => {
                const currencyData = entry[currency];
                if (currencyData && currencyData.close !== undefined) {
                  return (
                    <ReferenceLine
                      key={entryIndex}
                      y={currencyData.close}
                      stroke={color}
                      strokeWidth={3}
                      ifOverflow="extendDomain"
                      segment={[
                        { x: entryIndex - 0.2 },
                        { x: entryIndex + 0.2 },
                      ]}
                    />
                  );
                }
                return null;
              })}
            </Bar>
          </React.Fragment>
        );
      })}
    </BarChart>
  );

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <button onClick={toggleGraphType}>
        Switch to {graphType === "line" ? "Candlestick" : "Line"} Graph
      </button>
      <ResponsiveContainer>
        {graphType === "line" ? renderLineChart() : renderCandlestickChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default Graph;
