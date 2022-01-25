// const User = require('../models/users');
const Product = require('../Models/products');
const Purchase = require('../Models/purchases');
const fs = require('fs');

exports.addPurchae = async (req, res) => {
    const userId = req.body.userId;
    const products = req.body.products;
    const date = new Date().toISOString().split("T")[0];
    let canPurchase = false;

    for(const i in products){
        try {
            Product.findOne({ _id: products[i]._id }).then(product => {
                if (product) {
                    if(product.qty >= products[i].amount){
                        canPurchase = true
                    } else {
                        canPurchase = false
                        break
                    }
                } else {
                    canPurchase = false
                    break
                }
            }).catch(err => {
                console.log(err);
                canPurchase = false
                break
            })
        } catch (err) {
            console.log(err);
            canPurchase = false
            break
        }
        
    }

    if(canPurchase) {
        const purchase = new Purchase({
            userId: userId,
            products: products,
            buyAt: date
        });

        await purchase.save().then((result) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
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
            return Purchase.save();
        })
        .catch(err => {
            console.log(err);
        })
}