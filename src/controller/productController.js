import Product from "../model/productModel";
import cloudinary from "cloudinary";


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

exports.createProduct = async (req, res) => {
    try {
        const file = req.files.image;
        const result = await cloudinary.v2.uploader.upload(file.tempFilePath);
        const product = new Product({
            ...req.body,
            image: result.secure_url,
            owner: req.user._id
        });
        const data = await product.save();
        res.send({
            message: "created successfully",
            product: data
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

exports.getProducts = async (req, res) => {
    try {
        const data = await Product.find();
        res.send({
            message: "get successfully",
            product: data
        });
    } catch (error) {
        res.status(400).send(error.message);
    }
}