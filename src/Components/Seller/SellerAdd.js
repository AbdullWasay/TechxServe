import axios from 'axios';
import React, { useState } from 'react';

const categoryOptions = {
  Electronics: ['Phones', 'Laptops', 'Cameras'],
  Clothing: ['Men', 'Women', 'Kids'],
};

const specificFields = {
  Phones: {
    brand: '',
    model: ''
  },
  Laptops: {
    brand: '',
    ram: '',
    storage: ''
  },
  Cameras: {
    brand: '',
    resolution: ''
  },
  Men: {
    size: '',
    material: ''
  },
  Women: {
    size: '',
    material: ''
  },
  Kids: {
    size: '',
    ageRange: ''
  },
  // Add other specific fields for subcategories
};

const SellerAdd = () => {
  const [productDetails, setProductDetails] = useState({
    productName: '',
    description: '',
    selectedSizes: [],
    colors: [''],
    priceRanges: [{ minQuantity: '', maxQuantity: '', pricePerItem: '' }],
    pictures: [],
    quantity: '',
    category: '',
    subCategory: '',
    additionalFields: {}
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      [name]: value
    });
  };

  const handlePriceRangeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRanges = [...productDetails.priceRanges];
    updatedRanges[index][name] = value;
    setProductDetails({
      ...productDetails,
      priceRanges: updatedRanges
    });
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    let updatedSizes = [...productDetails.selectedSizes];

    if (checked) {
      updatedSizes.push(value);
    } else {
      updatedSizes = updatedSizes.filter((size) => size !== value);
    }

    setProductDetails({
      ...productDetails,
      selectedSizes: updatedSizes
    });
  };

  const handleColorChange = (index, e) => {
    const updatedColors = [...productDetails.colors];
    updatedColors[index] = e.target.value;
    setProductDetails({
      ...productDetails,
      colors: updatedColors
    });
  };

  const addColorField = () => {
    setProductDetails({
      ...productDetails,
      colors: [...productDetails.colors, '']
    });
  };

  const addPriceRange = () => {
    setProductDetails({
      ...productDetails,
      priceRanges: [...productDetails.priceRanges, { minQuantity: '', maxQuantity: '', pricePerItem: '' }]
    });
  };

  const handlePictureChange = (e) => {
    const files = Array.from(e.target.files);
    setProductDetails({
      ...productDetails,
      pictures: files
    });
  };

  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    setProductDetails({
      ...productDetails,
      subCategory,
      additionalFields: specificFields[subCategory] ? {} : productDetails.additionalFields
    });
  };

  const handleAdditionalFieldChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({
      ...productDetails,
      additionalFields: {
        ...productDetails.additionalFields,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();
    formData.append('productName', productDetails.productName);
    formData.append('description', productDetails.description);
    formData.append('selectedSizes', JSON.stringify(productDetails.selectedSizes));
    formData.append('colors', JSON.stringify(productDetails.colors));
    formData.append('priceRanges', JSON.stringify(productDetails.priceRanges));
    formData.append('quantity', productDetails.quantity);
    formData.append('category', productDetails.category);
    formData.append('subCategory', productDetails.subCategory);
    formData.append('additionalFields', JSON.stringify(productDetails.additionalFields));

    // Append pictures
    productDetails.pictures.forEach((file, index) => {
      formData.append('pictures', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Product added:', response.data);
      setProductDetails({
        productName: '',
        description: '',
        selectedSizes: [],
        colors: [''],
        priceRanges: [{ minQuantity: '', maxQuantity: '', pricePerItem: '' }],
        pictures: [],
        quantity: '',
        category: '',
        subCategory: '',
        additionalFields: {}
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.fieldContainer}>
        <label style={styles.label}>Product Name:</label>
        <input
          type="text"
          name="productName"
          value={productDetails.productName}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={productDetails.description}
          onChange={handleChange}
          style={styles.textarea}
        />
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Category:</label>
        <select
          name="category"
          value={productDetails.category}
          onChange={handleChange}
          style={styles.select}
        >
          <option value="">Select Category</option>
          {Object.keys(categoryOptions).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {productDetails.category && (
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Sub-Category:</label>
          <select
            name="subCategory"
            value={productDetails.subCategory}
            onChange={handleSubCategoryChange}
            style={styles.select}
          >
            <option value="">Select Sub-Category</option>
            {categoryOptions[productDetails.category].map((subCat) => (
              <option key={subCat} value={subCat}>
                {subCat}
              </option>
            ))}
          </select>
        </div>
      )}

      {productDetails.subCategory && (
        <>
          {Object.keys(specificFields[productDetails.subCategory] || {}).map((field) => (
            <div key={field} style={styles.fieldContainer}>
              <label style={styles.label}>{field}:</label>
              <input
                type="text"
                name={field}
                value={productDetails.additionalFields[field] || ''}
                onChange={handleAdditionalFieldChange}
                style={styles.input}
              />
            </div>
          ))}
        </>
      )}

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Sizes:</label>
        {['Small', 'Medium', 'Large'].map((size) => (
          <label key={size} style={styles.checkboxLabel}>
            <input
              type="checkbox"
              value={size}
              checked={productDetails.selectedSizes.includes(size)}
              onChange={handleSizeChange}
              style={styles.checkbox}
            />
            {size}
          </label>
        ))}
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Colors:</label>
        {productDetails.colors.map((color, index) => (
          <div key={index} style={styles.colorContainer}>
            <input
              type="text"
              value={color}
              onChange={(e) => handleColorChange(index, e)}
              style={styles.input}
            />
            <button type="button" onClick={addColorField} style={styles.addButton}>
              Add Color
            </button>
          </div>
        ))}
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Price Ranges:</label>
        {productDetails.priceRanges.map((range, index) => (
          <div key={index} style={styles.rangeContainer}>
            <input
              type="number"
              name="minQuantity"
              value={range.minQuantity}
              onChange={(e) => handlePriceRangeChange(index, e)}
              placeholder="Min Quantity"
              style={styles.input}
            />
            <input
              type="number"
              name="maxQuantity"
              value={range.maxQuantity}
              onChange={(e) => handlePriceRangeChange(index, e)}
              placeholder="Max Quantity"
              style={styles.input}
            />
            <input
              type="number"
              name="pricePerItem"
              value={range.pricePerItem}
              onChange={(e) => handlePriceRangeChange(index, e)}
              placeholder="Price per Item"
              style={styles.input}
            />
            <button type="button" onClick={addPriceRange} style={styles.addButton}>
              Add Price Range
            </button>
          </div>
        ))}
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Pictures:</label>
        <input
          type="file"
          multiple
          onChange={handlePictureChange}
          style={styles.fileInput}
        />
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={productDetails.quantity}
          onChange={handleChange}
          style={styles.input}
        />
      </div>

      <button type="submit" style={styles.submitButton}>
        Add Product
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  fieldContainer: {
    marginBottom: '15px'
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  textarea: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px'
  },
  select: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  fileInput: {
    width: '100%'
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  checkboxLabel: {
    display: 'inline-block',
    marginRight: '10px'
  },
  checkbox: {
    marginRight: '5px'
  },
  colorContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  addButton: {
    marginLeft: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  rangeContainer: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  }
};

export default SellerAdd;
