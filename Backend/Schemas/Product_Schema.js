const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  selectedSizes: [String],
  colors: [String],
  priceRanges: [
    {
      minQuantity: { type: Number, required: true },
      maxQuantity: { type: Number, required: true },
      pricePerItem: { type: Number, required: true }
    }
  ],
  pictures: [String], // Assuming you are storing URLs or paths to pictures
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  additionalFields: mongoose.Schema.Types.Mixed // For storing dynamic additional fields based on subcategory
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
