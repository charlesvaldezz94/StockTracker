import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../auth/authContext";
import "./Home.css";

const Home = ({ apiKey }) => {
  const { currentUser } = useAuth();
  const [topStocks, setTopStocks] = useState([]);
  const [exampleStocks, setExampleStocks] = useState([
    {
      symbol: "EX-STOCK",
      data: {
        "Time Series (5min)": {
          "2023-01-01 09:30:00": {
            "1. open": "150.00",
            "2. high": "155.00",
            "3. low": "148.50",
            "4. close": "152.75",
            "5. volume": "1000000",
          },
        },
      },
    },
  ]);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);

  useEffect(() => {
    const fetchTopStocks = async () => {
      try {
        if (currentUser) {
          const stockSymbols = ["MSFT", "META", "AMZN", "SONY"];
          const stockDataPromises = stockSymbols.map(async (symbol) => {
            const response = await axios.get(
              `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`
            );

            // Check for rate limit message
            if (
              response.data.Information &&
              response.data.Information.includes(
                "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests per day."
              )
            ) {
              setRateLimitExceeded(true);
              return;
            }

            const stockData = response.data;

            return {
              symbol,
              data: stockData,
            };
          });

          const stocksData = await Promise.all(stockDataPromises);

          setTopStocks(stocksData);
        } else {
          console.log("User not authenticated. Redirect to login page.");
        }
      } catch (error) {
        console.error("Error fetching top stocks data:", error);
      }
    };

    fetchTopStocks();
  }, [apiKey, currentUser]);

  return (
    <div className="homeContainer">
      <div className="homeTopContainer">
        <div className="homeTitle">
          <img src="/images/stocks.png" className="titleStockImage" />
          Welcome to StockTrackr
          {currentUser && <span> {currentUser.email}!</span>}
          <img src="/images/stocks.png" className="titleStockImage" />
        </div>
      </div>
      <div className="homeContentContainer">
        {currentUser ? (
          <>
            <div className="top5Title">
              Here is some data for Apple, Microsoft, Facebook, Amazon, and
              Sony! You can go to the FindStock page to search for more specific
              stocks.
            </div>

            <div className="stockInfoContainer">
              {/* Render example stocks */}
              {exampleStocks.map((exampleStock, index) => (
                <div key={index} className="stockInfo">
                  <h3>{exampleStock.symbol}</h3>
                  {/* Display example stock data */}
                  {exampleStock.data &&
                  exampleStock.data["Time Series (5min)"] &&
                  Object.keys(exampleStock.data["Time Series (5min)"]).length >
                    0 ? (
                    <div className="stockInformation">
                      <p>
                        <strong>Open:</strong>
                        {
                          exampleStock.data["Time Series (5min)"][
                            Object.keys(
                              exampleStock.data["Time Series (5min)"]
                            )[0]
                          ]["1. open"]
                        }
                      </p>
                      <p>
                        <strong>High:</strong>
                        {
                          exampleStock.data["Time Series (5min)"][
                            Object.keys(
                              exampleStock.data["Time Series (5min)"]
                            )[0]
                          ]["2. high"]
                        }
                      </p>
                      <p>
                        <strong>Low:</strong>
                        {
                          exampleStock.data["Time Series (5min)"][
                            Object.keys(
                              exampleStock.data["Time Series (5min)"]
                            )[0]
                          ]["3. low"]
                        }
                      </p>
                      <p>
                        <strong>Close:</strong>
                        {
                          exampleStock.data["Time Series (5min)"][
                            Object.keys(
                              exampleStock.data["Time Series (5min)"]
                            )[0]
                          ]["4. close"]
                        }
                      </p>
                      <p>
                        <strong>Volume:</strong>
                        {
                          exampleStock.data["Time Series (5min)"][
                            Object.keys(
                              exampleStock.data["Time Series (5min)"]
                            )[0]
                          ]["5. volume"]
                        }
                      </p>
                    </div>
                  ) : (
                    <p>Data not available</p>
                  )}
                </div>
              ))}
              {/* Render actual stocks */}
              {topStocks.map((stock, index) => (
                <div key={index} className="stockInfo">
                  <h3>{stock.symbol}</h3>
                  {/* Display stock data */}
                  {stock.data &&
                  stock.data["Time Series (5min)"] &&
                  Object.keys(stock.data["Time Series (5min)"]).length > 0 ? (
                    <div className="stockInformation">
                      <p>
                        <strong>Open:</strong>
                        {
                          stock.data["Time Series (5min)"][
                            Object.keys(stock.data["Time Series (5min)"])[0]
                          ]["1. open"]
                        }
                      </p>
                      <p>
                        <strong>High:</strong>
                        {
                          stock.data["Time Series (5min)"][
                            Object.keys(stock.data["Time Series (5min)"])[0]
                          ]["2. high"]
                        }
                      </p>
                      <p>
                        <strong>Low:</strong>
                        {
                          stock.data["Time Series (5min)"][
                            Object.keys(stock.data["Time Series (5min)"])[0]
                          ]["3. low"]
                        }
                      </p>
                      <p>
                        <strong>Close:</strong>
                        {
                          stock.data["Time Series (5min)"][
                            Object.keys(stock.data["Time Series (5min)"])[0]
                          ]["4. close"]
                        }
                      </p>
                      <p>
                        <strong>Volume:</strong>
                        {
                          stock.data["Time Series (5min)"][
                            Object.keys(stock.data["Time Series (5min)"])[0]
                          ]["5. volume"]
                        }
                      </p>
                    </div>
                  ) : (
                    <p>Data not available</p>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="nonMemberTitle">Please log in to view stock data.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
