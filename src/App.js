
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Coin from './Coin';// 
// import Coin from './Coin';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      
      <div className='coin-search'>
        <h1 className='coin-text'>Search a currency</h1>
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search'
          />
        </form>
      </div>


      <div className='coin-row'>
        <div className='coin'>
          <h1>img </h1>
          <h1>Name</h1>
          <p className='coin-symbol'>Symbol</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>Price</p>
          <p className='coin-ath'>ATH</p>
          <p className='coin-volume'>Vol</p>

          
            <p className='coin-percent red'>Price Change</p>
         
            {/* <p className='coin-percent green'>+{priceChange.toFixed(2)}%</p> */}
          

          <p className='coin-marketcap'>
            Mkt Cap
          </p>
        </div>
      </div>

      
      {filteredCoins.map(coin => {
        return (
          <div>
         
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.total_volume}
            volume={coin.market_cap}
            image={coin.image}
            priceChange={coin.price_change_percentage_24h}
            ath={coin.ath}
          />
          </div>
        );
      })}
    </div>
  );
}

export default App;