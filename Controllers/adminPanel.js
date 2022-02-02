const User = require('../models/users');
const Product = require('../Models/products');
const fs = require('fs');

exports.adminPage = (req, res) => {
    // if (req.session.userId) {
    //     User.findOne({ _id: req.session.userId }).then(user => {
    //         // console.log(user);
    //         if (user) {
    //             if (user.isAdmin == true) {
    //                 res.render('adminPanel');
    //             } else {
    //                 res.render('homePage', { user: user });
    //             }

    //         } else {
    //             res.render('homePage', { user: null });
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //     })
    // } else {
    //     res.render('signIn');
    // }
    res.render('adminPanel');
}

exports.addProduct = async (req, res) => {

    const image = req.files.image;
    const uploadPath = __dirname + '/../Public/Assets/uploadImage/' + image.name;
    image.mv(uploadPath, function(err) {
        if (err) console.log(err);
    });

    const name = req.body.name;
    const qty = req.body.qty;
    const type = req.body.type;
    const date = new Date().toISOString().split("T")[0];
    const price = req.body.price;
    const discountPrice = req.body.discountPrice;
    const unit = req.body.unit
    const description = req.body.description;
    const product = new Product({
        name: name,
        qty: qty,
        type: type,
        date: date,
        price: price,
        discountPrice: discountPrice,
        description: description,
        unit: unit
    });

    await product.save().then((result) => {
        console.log("add new product success");
        const oldPath = __dirname + '/../Public/Assets/uploadImage/' + image.name;
        const newPath = __dirname + '/../Public/Assets/uploadImage/' + result._id;
        fs.rename(oldPath, newPath, function(err) {
            if (err) console.log('ERROR: ' + err);
        });
        res.redirect('admin');
    }).catch((err) => {
        console.log(err);
    })
}

exports.getProduct = (req, res) => {
    Product.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deleteProduct = (req, res) => {
    const postId = req.params.postId;

    Product.findByIdAndRemove(postId)
        .then((product) => {
            const path = __dirname + '/../Public/Assets/uploadImage/' + product._id;
            try {
                fs.unlinkSync(path)
                //file removed
            } catch (err) {
                console.error(err)
            }
            console.log('Product is deleted');
            res.json({ "message": "success" });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.updateProduct = (req, res) => {
    console.log(req.body);
    const postId = req.params.postId;
    const name = req.body.name;
    const qty = req.body.qty;
    const type = req.body.type;
    const date = new Date().toISOString().split("T")[0];
    const price = req.body.price;
    const discountPrice = req.body.discountPrice;
    const myImage = req.body.image;
    const detail = req.body.detail;

    Product.findByIdAndUpdate(postId)
        .then((product) => {
            if (!!myImage.name) {
                const path = __dirname + '/../Public/Assets/uploadImage/' + postId;
                try {
                    fs.unlinkSync(path)
                    //file removed
                } catch (err) {
                    console.error(err)
                }

                let uploadPath;
                uploadPath = __dirname + '/../Public/Assets/uploadImage/' + postId;
                myImage.mv(uploadPath, function(err) {
                    if (err) console.log(err);
                });
            }

            product.name = name;
            product.qty = qty;
            product.type = type;
            product.date = date;
            product.price = price;
            product.discountPrice = discountPrice;
            product.detail = detail;
            console.log('Product is updated');
            res.send(true);
            return product.save();
        })
        .catch(err => {
            console.log(err);
        })
}