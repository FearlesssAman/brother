const express = require('express');
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        res.send([global.orders, global.category]);
    } catch (error) {
        console.log(error.message);
        console.log("error");
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
