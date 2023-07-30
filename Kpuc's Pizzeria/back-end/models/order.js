const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: false
  },
  name: String,
  l_name: String,
  address: String,
  phone: String,
  email: String,
  ordered_items: String,
  price: Number,
  paid_by: String,
  description: String,
  status: String,
  accepted_by: String,
  accepted_at: String,
  ready_at: String,
  picked_up_at: String,
  delivered_by: String,
  delivered_at: String
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
