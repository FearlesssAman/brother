const mongoose = require('mongoose');
const MongoURL = 'mongodb+srv://palprincy161:RgcQ90zO2HfHLLax@brother.uyeuwmg.mongodb.net/brothermern?retryWrites=true&w=majority&appName=brother';

const connectToMongo = async () => {
    try {
        await mongoose.connect(MongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected");

        const fetched_data = mongoose.connection.db.collection("orders");
        const data = await fetched_data.find().toArray();
        const fetched_category= mongoose.connection.db.collection("category");
        const catdata = await fetched_category.find().toArray();
        global.category = catdata;
        console.log()
         global.orders = data;
        console.log("Data fetched and stored in orders");
    } catch (err) {
        console.log("---", err);
    }
};

module.exports = connectToMongo;
