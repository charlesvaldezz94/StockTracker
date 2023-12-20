import React, { useState } from "react";
import axios from "axios";

const FindStock = ({ apiKey }) => {
  const [symbol, setSymbol] = useState("");
  const [stocks, setStocks] = useState([]);

  const addStock = async () => {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
      );

      if (
        !response.data["Global Quote"] ||
        !response.data["Global Quote"]["05. price"]
      ) {
        alert("Invalid stock symbol. Please try again.");
      } else {
        const newStock = {
          symbol: symbol.toUpperCase(),
          price: response.data["Global Quote"]["05. price"],
        };
        setStocks([...stocks, newStock]);
      }
    } catch (error) {
      console.error("Error fetching stock data:", error);
      alert("Error fetching stock data. Please try again.");
    }

    // Clear the input field
    setSymbol("");
  };

  return (
    <div className="findStockContainer">
      <div className="findStockInput">
        <span>
          <label htmlFor="symbol">Stock Symbol:</label>
          <input
            type="text"
            id="symbol"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter stock symbol"
          />
          <button onClick={addStock}>Add Stock</button>
        </span>
      </div>
      <div className="findStocksList">
        <ul>
          {stocks.map((stock, index) => (
            <div className="stocksCard" key={index}>
              <div className="stockCardTitle"> {stock.symbol} </div>
              <div className="stockCardPrice"> {stock.price} </div>
              <div className="stockCardRising"> {stock.symbol} </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FindStock;
