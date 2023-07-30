const mongoose = require("mongoose");

const rateSchema = new mongoose.Schema({
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
    comment: String,
    rate: Number
});

const Rate = mongoose.model("Rate", rateSchema);

module.exports = Rate;
