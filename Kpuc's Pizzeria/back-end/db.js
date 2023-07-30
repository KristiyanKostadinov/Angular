// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/Kpuc's-Pizzeria")
//     .then(() => {
//         console.log("MongoDB connection succeeded.");
//     })
//     .catch((err) => {
//         console.log("Error in MongoDB connection: " + err);
//     });

// module.exports = mongoose;

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kristiqn57:113223@cluster0.4nfwui9.mongodb.net/Kpuc's_Pizzeria")
    .then(() => {
        console.log("MongoDB connection succeeded.");
    })
    .catch((err) => {
        console.log("Error in MongoDB connection: " + err);
    });

module.exports = mongoose;
