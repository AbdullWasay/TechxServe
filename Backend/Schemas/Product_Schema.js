const mongoose = require('mongoose');

// Define Product schema
const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    description: { type: String, required: true },
    selectedSizes: { type: [String], required: true },
    colors: { type: [String], required: true },
    price: { type: Number, required: true },
    pictures: { type: [String], required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
}
);
// Create Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
