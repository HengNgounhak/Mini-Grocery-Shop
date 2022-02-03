const User = require('../models/users');

exports.getHomePage = (req, res) => {
    // res.render('homePage');
    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            if (user) {
                res.render('homePage', { user: user });
            } else {
                res.redirect('/signin');
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.redirect('/signin');
    }
}

exports.getProductPage = (req, res) => {
    // res.render('productPage');
    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            if (user) {
                res.render('productPage', { user: user });
            } else {
                res.redirect('/signin');
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.redirect('/signin');
    }
}

exports.getRecieptPage = (req, res) => {
    // res.render('recieptPage');
    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            if (user) {
                res.render('recieptPage', { user: user });
            } else {
                res.redirect('/signin');
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.redirect('/signin');
    }
}
exports.getPaymentPage = (req, res) => {
    // res.render('paymentPage');
    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            if (user) {
                res.render('paymentPage', { user: user });
            } else {
                res.redirect('/signin');
            }
        }).catch(err => {
            console.log(err);
        })
    } else {
        res.redirect('/signin');
    }
}
