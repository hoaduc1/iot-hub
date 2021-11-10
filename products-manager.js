const db = require("./db/models/index");
// var Product = require('./db/models/product.model.js');
const Products = db.pruduct;

module.exports.productsList = async (req, res) => {
    // console.log(Products);
    Products.find({})
        .then(products => {
            res.writeHead(200, {});
            res.write(JSON.stringify({
            msgCode: 10700,
            msgResp: products
            }));
            res.end();
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        });
  };

module.exports.addProduct = async (req, res) => {
    let newProduct = new Products({
        name: req.body.productName,
        type: req.body.productType,
        price: req.body.productPrice
    });
  
    newProduct.save()
        .then(doc => {
            res.writeHead(200, {});
            res.write(JSON.stringify({
            msgCode: 10700,
            msgResp: "Product added successfully"
            }));
            res.end();
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
}

module.exports.updateProduct = async (req, res) => {
    let productId = req.body.productId;
    Products.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, type: req.body.productType, price: req.body.productPrice } },
        { useFindAndModify: false })
        .then(doc => {
            res.writeHead(200, {});
            res.write(JSON.stringify({
            msgCode: 10700,
            msgResp: "Product update successfully"
            }));
            res.end();
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
}

module.exports.deleteProduct = async (req, res) => {
    let productId = req.body.productId;
    Products.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc);
    })
}
