import axios from 'axios'; // Make sure to install axios with `npm install axios`
import React, { useEffect, useState } from 'react';

const SellerShow = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the API endpoint
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products'); // Updated URL
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Sub-Category</th>
            <th>Description</th>
            <th>Price Ranges</th>
            <th>Colors</th>
            <th>Sizes</th>
            <th>Pictures</th> {/* New column for pictures */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}> {/* Adjusted to use MongoDB ObjectId */}
              <td>{product._id}</td> {/* Adjusted field name */}
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>{product.subCategory}</td>
              <td>{product.description}</td>
              <td>
                {product.priceRanges.map((range, index) => (
                  <div key={index}>
                    {`Qty ${range.minQuantity}-${range.maxQuantity}: $${range.pricePerItem}`}
                  </div>
                ))}
              </td>
              <td>{product.colors.join(', ')}</td> {/* Joined colors array */}
              <td>{product.selectedSizes.join(', ')}</td> {/* Joined sizes array */}
              <td>
                {product.pictures.map((picture, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5000/uploads/${picture}`} // Assuming this is the URL path
                    alt={`Product Image ${index + 1}`}
                    style={styles.image}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  image: {
    width: '100px', // Adjust as needed
    height: 'auto',
    marginRight: '5px', // Adjust as needed
  },
};

export default SellerShow;
