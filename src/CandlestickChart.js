import React, { useEffect, useState, useRef } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

// Register necessary components for the chart, including TimeScale
ChartJS.register(
    CategoryScale,
    LinearScale,
    TimeScale,
    CandlestickController,
    CandlestickElement,
    Title,
    Tooltip,
    Legend
);

const CandlestickChart = ({ symbol, interval }) => {
    const [chartData, setChartData] = useState([]);
    const ws = useRef(null);

    useEffect(() => {
        // Restore previous data from localStorage, if available
        const savedData = localStorage.getItem(`${symbol}-${interval}`);
        if (savedData) {
            setChartData(JSON.parse(savedData));
        }

        // WebSocket URL
        const wsUrl = `wss://stream.binance.com:9443/ws/${symbol}@kline_${interval}`;
        ws.current = new WebSocket(wsUrl);

        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.k) {
                const { t, o, h, l, c } = data.k; // t = time, o = open, h = high, l = low, c = close

                setChartData((prevData) => {
                    const newData = [...prevData, { t: new Date(t), o, h, l, c }];
                    localStorage.setItem(`${symbol}-${interval}`, JSON.stringify(newData));
                    return newData;
                });
            }
        };

        // Clean up WebSocket connection when unmounting or symbol/interval change
        return () => {
            if (ws.current) ws.current.close();
        };
    }, [symbol, interval]);

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: 'time', // Use time scale for the X-axis
                time: {
                    unit: 'minute', // Set unit to 'minute'
                    stepSize: 50, // Increase step size to 5 minutes
                    displayFormats: {
                        minute: 'MMM d, HH:mm', // Format the time labels
                    },
                },
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Price (USDT)',
                },
            },
        },
        plugins: {
            title: {
                display: true,
                text: `${symbol.toUpperCase()} Candlestick Chart (${interval} minute)`,
            },
        },
    };

    // Correctly format the candlestick chart data
    const chartDataFormatted = {
        datasets: [
            {
                label: `${symbol.toUpperCase()} Price`,
                data: chartData.map(({ t, o, h, l, c }) => ({
                    x: t,
                    o: parseFloat(o),
                    h: parseFloat(h),
                    l: parseFloat(l),
                    c: parseFloat(c),
                })),
                type: 'candlestick',
                borderColor: '#1e3a8a',
                backgroundColor: 'rgba(30, 58, 138, 0.5)',
                upColor: 'green',
                downColor: 'red',
                color: '#1e3a8a', // For general candle color
            },
        ],
    };

    return <Chart type="candlestick" data={chartDataFormatted} options={chartOptions} />;
};

export default CandlestickChart;
