const bcrypt = require("bcryptjs");
const User = require('../models/users');

exports.signIn = (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.render('signIn', { error: false });
    }
}
exports.signUp = (req, res) => {
    if (req.session.userId) {
        res.redirect('/');
    } else {
        res.render('signUp');
    }
}

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Check if email is exist
    User.find({ email: email }).then(result => {
        if (result != "") {
            console.log(result + email + password);
            // if user exist, check given password with the encrypted password
            bcrypt.compare(password, result[0].password, function(err, passwordIsMatch) {
                if (passwordIsMatch) {
                    // if password is correct, return success, with cookie save
                    res.cookie('email', email, { expire: 3600 * 1000 });
                    res.cookie('logged-time', new Date().toISOString(), { expire: 3600 * 1000 });
                    // store user information to session
                    req.session.userId = result[0]._id;
                    res.redirect("/");
                } else {
                    // else return fail
                    res.render("signIn", { error: true, message: "Password incorrect" });
                }
            })
        } else {
            res.redirect("/signin");
        }
    }).catch(err => {
        console.log(err);
    })
}

exports.register = (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = false;
    const date = new Date();
    const salt = bcrypt.genSaltSync(10);
    const user = new User({
        isAdmin: isAdmin,
        username: username,
        email: email,
        password: bcrypt.hashSync(password, salt),
        registerAt: date.toISOString()
    }).save().then(result => {
        res.redirect("/signin");
    }).catch(err => {
        res.render('signup', { message: "Signup fail, try again" });
    })
}

exports.logout = (req, res) => {
    // clear session
    req.session.destroy();
    res.redirect('/');
}