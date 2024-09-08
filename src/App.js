import React, { useState } from 'react';
import './App.css';
import SellerAdd from './Components/Seller/SellerAdd.js';
import SellerShow from './Components/Seller/SellerShow.js';

function App() {
  const [view, setView] = useState('');

  const handleAddClick = () => {
    setView('add');
  };

  const handleShowClick = () => {
    setView('show');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Management</h1>
        <div>
          <button onClick={handleAddClick} className="App-button">
            Add Product
          </button>
          <button onClick={handleShowClick} className="App-button">
            Show Shoes
          </button>
        </div>
        {view === 'add' && <SellerAdd />}
        {view === 'show' && <SellerShow />}
      </header>
    </div>
  );
}

export default App;
