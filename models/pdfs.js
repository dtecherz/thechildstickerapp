const mongoose = require("mongoose");

const pdfs = new mongoose.Schema({
    template: { type: String, required: false },
    image: { type: String, required: false },
    pdf: { type: String, required: false },
    orderName: { type: String, required: false },
    orderId: { type: Number, required: false },
    productId: { type: Number, required: false },
    imageUrl: { type: String, required: false },
    processed: { type: Boolean,default:false, required: false },
    timestamp: { type: Number, default: Date.now, required: true }
});


module.exports = mongoose.model("pdfs", pdfs);