// const User = require('../models/users');
const Product = require('../Models/products');
const Purchase = require('../Models/purchases');

exports.addPurchase = async (req, res) => {
    const userId = req.session.userId;
    const products = req.body.products;
    const date = new Date().toISOString().split("T")[0];
    let outOfStock = [];
    try {
        //check if products in stock
        for(const i in products){
            await Product.findOne({ _id: products[i].id }).then(product => {
                if (product) {
                    if(product.qty < products[i].qty){
                        outOfStock.push({
                            name: product.name,
                            qty: product.qty
                        })
                    } 
                } 
            }).catch(err => {
                console.log(err);
            })
        }
    } catch (err) {
        console.log(err);
    }

    if((outOfStock.length ==0) && products) {
        for(const i in products){
            await Product.findByIdAndUpdate({ _id: products[i].id }).then(product => {
                if (product) {
                    product.qty -= products[i].qty
                    return product.save();
                } 
            }).catch(err => {
                console.log(err);
            })
        }

        const purchase = new Purchase({
            totalCost: req.body.totalCost,
            username: req.session.username,
            userId: userId,
            products: products,
            buyAt: date
        });

        await purchase.save().then((result) => {
            res.json({
                success: true
            });
            console.log("purchase success")
        }).catch((err) => {
            console.log(err);
        }) 
    } else {
        res.json({
            success: false,
            outOfStock: outOfStock
        })
    }
}

exports.getPurchase = (req, res) => {
    Purchase.find()
        .then(purchase => {
            res.json(purchase);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deletePurchase = (req, res) => {
    const purchaseId = req.params.purchaseId;

    Purchase.findByIdAndRemove(purchaseId)
        .then(() => {
            console.log('Purchase is deleted');
            res.json({ "message": "success" });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.updatePurchase = (req, res) => {
    const products = req.body.products;

    Purchase.findByIdAndUpdate(purchaseId)
        .then((purchase) => {
            purchase.products = products
            console.log('Purchase is updated');
            res.send(true);
            return purchase.save();
        })
        .catch(err => {
            console.log(err);
        })
}