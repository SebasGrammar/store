const mongoose = require("mongoose"),
    {Schema} = mongoose,
    productSchema = new Schema({
        name: {
            type: String,
            required: true
        },

        nameId: {
            type: String,
            required: true
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