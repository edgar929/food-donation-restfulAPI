import mongoose from "mongoose";

require("dotenv").config();
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    short_description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    image: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    quantity: {
        type: String,
        required: true,
        trim: true,
    },
    pick_up_location: {
        type: String,
        required: true,
        trim: true,
    },
    pick_up_deadline: {
        type: Date,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
        default: "available"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;