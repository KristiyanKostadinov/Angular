const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const fs = require("fs");
const cors = require("cors");
const { mongoose } = require("./db.js");
const customerController = require("./controllers/customerController.js");
const orderController = require("./controllers/orderController.js");
const adminController = require("./controllers/adminController.js")
const employeeController = require("./controllers/employeeController.js");
const rateController = require("./controllers/rateController.js");
const pizzaController = require("./controllers/pizzaController.js");
const saladController = require("./controllers/saladController.js");
const dessertController = require("./controllers/dessertController.js");
const companyInfoController = require("./controllers/companyInfoController.js");

let app = express();
app.use(bodyParser.json());
app.use(cors());

const options = {
    key: fs.readFileSync("./https-certificate/private.key"),
    cert: fs.readFileSync("./https-certificate/server.crt"),
};

const server = https.createServer(options, app);

app.use(express.static("public"));

app.use("/customers", customerController);
app.use("/orders", orderController);
app.use("/admins", adminController);
app.use("/employees", employeeController);
app.use("/rates", rateController);
app.use("/pizzas", pizzaController);
app.use("/salads", saladController);
app.use("/desserts", dessertController);
app.use("/company_info", companyInfoController);

server.listen(3000, () => console.log("Server started at port: 3000 (HTTPS)"));
