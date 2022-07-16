const bcrypt = require("bcryptjs");
const User = require('../models/users');

exports.signIn = (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.render('signIn', { message: null });
    }
}
exports.signUp = (req, res) => {
    // res.render('signUp', { message: null });
    if (req.session.userId) {
        User.findOne({ _id: req.session.userId }).then(user => {
            if (user) {
                res.render('signUp', { message: null });
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

exports.login = async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Check if email is exist
    await User.find({ email: email }).then(result => {
        if (result != "") {
            // if user exist, check given password with the encrypted password
            bcrypt.compare(password, result[0].password, function(err, passwordIsMatch) {
                if (passwordIsMatch) {
                    // if password is correct, return success, with cookie save
                    res.cookie('email', email, { expire: 3600 * 1000 * 24 });
                    res.cookie('logged-time', new Date().toISOString(), { expire: 3600 * 1000 * 24 });
                    // store user information to session
                    req.session.userId = result[0]._id;
                    req.session.username = result[0].username;
                    res.redirect("/");
                } else {
                    // else return fail
                    res.render("signIn", { error: true, message: "Email and password are incorrect" });
                }
            })
        } else {
            res.redirect("/signin");
        }
    }).catch(err => {
        console.log(err);
    })
}

exports.register = async(req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = false;
    const date = new Date();
    const salt = bcrypt.genSaltSync(10);
    await User({
        isAdmin: isAdmin,
        username: username,
        email: email,
        password: bcrypt.hashSync(password, salt),
        registerAt: date.toISOString()
    }).save().then(result => {
        res.redirect("/admin");
    }).catch(err => {
        res.render('signup', { message: "Signup fail, try again" });
    })
}

exports.logout = (req, res) => {
    // clear session
    req.session.destroy();
    res.redirect('/');
}

exports.getUser = (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deleteUser = (req, res) => {
    const userId = req.params.userId;

    User.findByIdAndRemove(userId)
        .then((user) => {
            console.log('User is deleted');
            res.json({ "message": "success" });
        })
        .catch(err => {
            console.log(err);
        })
}
