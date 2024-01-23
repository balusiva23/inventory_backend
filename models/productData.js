const mongoose = require("mongoose");

const productDataSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
    fsn: { type: String, required: true },
    wid: { type: String, required: true },
    warehouse_id: { type: String, required: true },
    seller_name: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    grade: { type: String, required: true },
    quantity: { type: Number, required: true },
    base_rate: { type: String,  },
    base_discount: { type: Number, required: true },
    billing_rate: { type: String,  },
  });
  
  const ProductDatas = mongoose.model('ProductDatas', productDataSchema);

module.exports = ProductDatas;
