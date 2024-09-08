import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [price, setPrice] = useState('');
    const [pictures, setPictures] = useState([]);
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setPictures(files.map(file => URL.createObjectURL(file)));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            productName,
            description,
            selectedSizes,
            colors,
            price: parseFloat(price),
            pictures,
            quantity: parseInt(quantity),
            category,
            subCategory
        };

        try {
            const response = await axios.post('http://localhost:5000/api/products', newProduct);
            console.log('Product added:', response.data);
            // Clear form after submission
            setProductName('');
            setDescription('');
            setSelectedSizes([]);
            setColors([]);
            setPrice('');
            setPictures([]);
            setQuantity('');
            setCategory('');
            setSubCategory('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Product Name:
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            </label>
            <label>
                Description:
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
            </label>
            <label>
                Sizes:
                <input type="text" value={selectedSizes} onChange={(e) => setSelectedSizes(e.target.value.split(','))} placeholder="Comma separated sizes" required />
            </label>
            <label>
                Colors:
                <input type="text" value={colors} onChange={(e) => setColors(e.target.value.split(','))} placeholder="Comma separated colors" required />
            </label>
            <label>
                Price:
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </label>
            <label>
                Pictures:
                <input type="file" multiple onChange={handleFileUpload} required />
            </label>
            <label>
                Quantity:
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
            </label>
            <label>
                Category:
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
            </label>
            <label>
                SubCategory:
                <input type="text" value={subCategory} onChange={(e) => setSubCategory(e.target.value)} required />
            </label>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
