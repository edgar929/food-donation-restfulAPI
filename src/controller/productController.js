import Product from "../model/productModel";

exports.createProduct = async (req, res) => {
    const product = new Product({
        ...req.body,
        owner: req.user._id
    });
    try {
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