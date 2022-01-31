const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authenController = require("../controllers/authentication");
const adminPanelController = require("../Controllers/adminPanel");

router.get('/', homeController.getHomePage);
router.get('/productDetail', homeController.getProductDetail);
router.get('/checkDetail', homeController.getcheckDetail);
router.get('/signin', authenController.signIn);
router.get('/signup', authenController.signUp);

router.get('/admin', adminPanelController.adminPage);

module.exports = router;