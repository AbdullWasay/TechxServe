const express = require('express');
const Product = require('../Schemas/Product_Schema.js');
const router = express.Router();
const path = require('path');

// Route to add a product
router.post('/products', async (req, res) => {
    try {
        // Handle file uploads
        const files = req.files;
        const pictureUrls = files.map(file => `/uploads/${file.filename}`);

        const newProduct = {
            ...req.body,
            pictures: pictureUrls
        };

        const product = new Product(newProduct);
        await product.save();
        res.status(201).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to get all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.find(); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get a product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to delete a product by ID
router.delete('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
