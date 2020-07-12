const mongoose = require("mongoose"),
    Product = require("./models/product");

mongoose.connect(
    "mongodb://localhost:27017/testing",
    { useNewUrlParser: true }
);
mongoose.Promise = global.Promise;

Product.remove({})
    .then(items => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return Product.remove({});
    })
    .then(items => console.log(`Removed ${items.n} records!`))
    .then(() => {
        return Product.create({
            brand: "Skala",
            name: "Dona",
            nameId: "dona",
            description: "",
            picture: "/images/Dona.png",
            price: 30000
        });
    })
    .then(product => {
        console.log(`Created Product: ${product}`);
    })
    .then(() => {
        return Product.findOne({
            name: "Dona"
        });
    })
    .then(product => {
        testProduct = product;
        console.log(`Found one product: ${product}`);
    })
    .catch(error => console.log(`It's fucked up: ${error.message}`));

    // Product.remove({})
    // .then(items => console.log(`Removed ${items.n} records!`))
    // .then(() => {
    //     return Product.remove({});
    // })
    // .then(items => console.log(`Removed ${items.n} records!`))
    // .then(() => {
    //     return Product.create({
    //         name: "Amido de milho",
    //         nameId: "amido de milho",
    //         picture: "/images/Kids.png",
    //         price: 30000
    //     });
    // })
    // .then(product => {
    //     console.log(`Created Product: ${product}`);
    // })
    // .then(() => {
    //     return Product.findOne({
    //         name: "Amido de milho"
    //     });
    // })
    // .then(product => {
    //     testProduct = product;
    //     console.log(`Found one product: ${product}`);
    // })