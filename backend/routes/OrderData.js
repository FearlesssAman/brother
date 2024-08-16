const express = require('express');
const router = express.Router();
const cartorder = require('../models/CartOrder'); 

// Example POST route for handling order data
router.post('/orderData', async (req, res) => {
    try {
        let data = req.body.order_data;
        // Add order_date to the beginning of the data array
        await data.splice(0, 0, { Order_date: req.body.order_date });

        console.log("User email:", req.body.email);

        // Example logic for inserting order data into the database
        let eId = await Order.findOne({ 'email': req.body.email });
        console.log(eId);

        if (eId === null) {
            try {
                await Order.create({
                    email: req.body.email,
                    order_data: [data]
                });
                res.json({ success: true });
            } catch (error) {
                console.log(error.message);
                res.send("Server Error", error.message);
            }
        } else {
            try {
                await Order.findOneAndUpdate(
                    { email: req.body.email },
                    { $push: { order_data: data } }
                );
                res.json({ success: true });
            } catch (error) {
                console.log(error.message);
                res.send("Server Error", error.message);
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
