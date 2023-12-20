import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = ({ apiKey }) => {
  const [topStocks, setTopStocks] = useState([]);

  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        // ARRAY OF STOCK SYMBOLS
        const stockSymbols = ["AAPL", "MSFT", "FB", "AMZN", "SNE"];

        // FETCHING DATA FOR EACH SYMBOL
        const stockDataPromises = stockSymbols.map(async (symbol) => {
          const response = await axios.get(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
          );

          // PROCESS THE DATA IN EACH RESPONSE
          const stockData = response.data;

          return {
            symbol,
            data: stockData,
          };
        });

        // WAIT FOR ALL PROMISES
        const stocksData = await Promise.all(stockDataPromises);

        setTopStocks(stocksData);
      } catch (error) {
        console.error("Error fetching top stocks data:", error);
      }
    };

    fetchTopStocks();
  }, [apiKey]);

  return (
    <div className="homeContainer">
      <div className="homeTopContainer">
        <div className="homeTitle"> Welcome to StockTracker </div>
      </div>
      <div className="homeContentContainer">
        <div className="top5Title">
          Here is the data for Apple, Microsoft, Facebook, Amazon, and Sony!
        </div>
        {topStocks.map((stock, index) => (
          <div key={index} className="stockInfo">
            <h3>{stock.symbol}</h3>
            {stock.data &&
            stock.data["Time Series (5min)"] &&
            Object.keys(stock.data["Time Series (5min)"]).length > 0 ? (
              <>
                <p>
                  <strong>Open:</strong>{" "}
                  {
                    stock.data["Time Series (5min)"][
                      Object.keys(stock.data["Time Series (5min)"])[0]
                    ]["1. open"]
                  }
                </p>
                <p>
                  <strong>High:</strong>{" "}
                  {
                    stock.data["Time Series (5min)"][
                      Object.keys(stock.data["Time Series (5min)"])[0]
                    ]["2. high"]
                  }
                </p>
                <p>
                  <strong>Low:</strong>{" "}
                  {
                    stock.data["Time Series (5min)"][
                      Object.keys(stock.data["Time Series (5min)"])[0]
                    ]["3. low"]
                  }
                </p>
                <p>
                  <strong>Close:</strong>{" "}
                  {
                    stock.data["Time Series (5min)"][
                      Object.keys(stock.data["Time Series (5min)"])[0]
                    ]["4. close"]
                  }
                </p>
                <p>
                  <strong>Volume:</strong>{" "}
                  {
                    stock.data["Time Series (5min)"][
                      Object.keys(stock.data["Time Series (5min)"])[0]
                    ]["5. volume"]
                  }
                </p>
                {/* Add more information as needed */}
              </>
            ) : (
              <p>Data not available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
