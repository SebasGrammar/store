const mongoose = require("mongoose"),
    {Schema} = mongoose,
    productSchema = new Schema({

        brand: {
            type: String,
            required: true
        },

        name: {
            type: String,
            required: true
        },

        nameId: {
            type: String,
            required: true
        },

        description: {
            type: String,
        },

        picture: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        }
    });
module.exports = mongoose.model("Product", productSchema)