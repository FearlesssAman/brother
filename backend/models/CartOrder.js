const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the Order schema
const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true // Corrected the spelling of "unique"
    },
    order_data: { // Changed "order_id" to "order_data" to store order details
        type: Array, // This should be an array to store multiple orders
        required: true
    }
});

// Export the Order model
module.exports = mongoose.model('cartorder', OrderSchema);
