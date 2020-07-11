const express = require("express"),
    app = express(),
    layouts = require("express-ejs-layouts"),
    mongoose = require("mongoose");

const Product = require("./models/product");

mongoose.Promise = global.Promise;

mongoose.connect(
    "mongodb://localhost:27017/testing",
    { useNewUrlParser: true }
);

mongoose.set("useCreateIndex", true);

const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app
    .use(
        express.urlencoded({
            extended: false
        })
    )
    .use(express.json())
    .use(express.static("public"))
    .use(layouts);

// app.get("/", function (req, res) {
//     res.render("index")
// })

/**********************/

// app.get("/", function(req, res) {
//     res.render("home")
// })


app.get("/", function (req, res, next) {
    Product.find()
        .then(products => {
            res.locals.products = products;
            next()
        })
        .catch(error => {
            console.log(`Error fetching products: ${error.message}`)
            next(error)
        })
}, (req, res) => {
    res.render("home")
})

app.get("/products", (req, res, next) => { // "/" npt working either...
    Product.find()
        .then(products => {
            res.locals.products = products;
            next()
        })
        .catch(error => {
            console.log(`Error fetching products: ${error.message}`)
            next(error)
        })
}, (req, res) => {
    res.render("index")
})
// not working with name yet...
app.get("/products/:id", (req, res, next) => {
    let productId = req.params.id;
    Product.findById(productId)
        .then(product => {
            res.locals.product = product;
            next();
        })
        .catch(error => {
            console.log(`Error fetching product by ID: ${error.message}`);
            next(error);
        });
}, (req, res) => {
    res.render("test")
})


app.listen(3000, function () {
    console.log(`port listening in port 3000`)
})