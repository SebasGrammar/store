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
//not working with name yet... // gonna have to fix this so that it works with names instead of ids.

// app.get("/products/:id", (req, res, next) => {
//     console.log(req.params)
//     let productId = req.params.id;
//     Product.findById(productId)
//         .then(product => {
//             res.locals.product = product;
//             next();
//         })
//         .catch(error => {
//             console.log(`Error fetching product by ID: ${error.message}`);
//             next(error);
//         });
// }, (req, res) => {
//     res.render("test")
// })


/* THIS IS A FUCKING TEST SO WATCH OUT */

// app.get("/products/:product", (req, res) => {
//     console.log("AYYYY")
//     Product.find()
//         .then(products => {
//             res.locals.products = products
//         })
//         .catch(error => {
//             console.log("Error")
//         })
// })

/* */

/**  THIS IS THE ONE **/
// app.get("/products/:product", (req, res, next) => {
//     console.log(req.params.product)
//     let productId = req.params.id;
//     Product.findOne({ nameId: req.params.product })
//         .then(product => {
//             res.locals.product = product;
//             next();
//         })
//         .catch(error => {
//             console.log(`Error fetching product by ID: ${error.message}`);
//             next(error);
//         });
// }, (req, res) => {
//     res.render("test")
// })
/****/


// app.get("/products/:product", (req, res) => {
//     console.log("AYYYY")
//     Product.find()
//         .then(products => {
//             res.locals.products = products
//         })
//         .catch(error => {
//             console.log("Error")
//         })
// })

/*************/
// app.get("/products/:product", (req, res, next) => {
//     console.log(req.params.product)
//     let productId = req.params.id;
//     Product.findOne({ nameId: req.params.product })
//         .then(product => {
//             res.locals.product = product;
//             next();
//         })
//         .catch(error => {
//             console.log(`Error fetching product by ID: ${error.message}`);
//             next(error);
//         })
//         .then(Product.find()
//             .then(things => {
//                 console.log("AYE")
//                 res.locals.things = things
//                 console.log(things)
//             })
//             .catch(console.log("FUCK"))

//         ).catch(console.log("BUUUUUUU"))
// }, (req, res) => {
//     res.render("test")
// })

/**************/

// app.get("/products/:product", (req, res, next) => {
//     console.log(req.params.product)
//     let productId = req.params.id;
//     Product.find()
//         .then(things => {
//             res.locals.things = things
//             console.log(things)
//             // next();
//         }).then(
//     Product.findOne({ nameId: req.params.product })
//         .then(product => {
//             res.locals.product = product;
//             next();
//         }))
//         .catch(error => {
//             console.log(`Error fetching product by ID: ${error.message}`);
//             next(error);
//         })



// }, (req, res) => {
//     res.render("test")
// })

// app.get("/products/:product", async function(req, res, next) {
//     let productId = req.params.id

//     try {
//     let things = await Product.find()
//     //console.log(things)
//     res.locals.things = things

//     let product = await Product.findOne({nameId: req.params.product})
//     console.log(product)
//     res.locals.product = product // this is the name you're going to use to refer to whatever this returns, from EJS.
//     // if it were pato instead of product, then in test.ejs, I would have to change product for pato.
//     // as opposed to find(), this returns an object (not an array of objects).
//     next()
//     } catch {
//         console.log("Error")
//     }
// }, (req, res) => res.render("test"))

function getItem() {

}

app.get("/products/:product", async function (req, res, next) {
    let productId = req.params.id

    try {
        //let things = 

        let results = []
        let all = await Product.find()

        for (let index = 0; index < 3; index++) {
            //results.push(all[index])
            results.push(all[Math.floor(Math.random() * Math.floor(all.length))])
        }

        console.log(results)

        //await Product.find()
        //console.log(things)
        res.locals.things = results

        // let results = []

        let product = await Product.findOne({ nameId: req.params.product })
        console.log(product)
        res.locals.product = product // this is the name you're going to use to refer to whatever this returns, from EJS.
        // if it were pato instead of product, then in test.ejs, I would have to change product for pato.
        // as opposed to find(), this returns an object (not an array of objects).
        next()
    } catch {
        console.log("Error")
    }
}, (req, res) => res.render("test"))

app.listen(3000, function () {
    console.log(`port listening in port 3000`)
})