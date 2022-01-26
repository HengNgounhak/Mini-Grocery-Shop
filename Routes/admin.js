const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authenController = require("../controllers/authentication");
const adminPanelController = require("../Controllers/adminPanel");

router.get('/', homeController.getHomePage);
router.get('/productDetail', homeController.getProductDetail);
router.get('/paymentPage', homeController.getPaymentPage);

router.get('/signin', authenController.signIn);
router.get('/signup', authenController.signUp);
router.post('/register', authenController.register);
router.post('/login', authenController.login);
router.post('/logout', authenController.logout);

router.get('/admin', adminPanelController.adminPage);
router.post('/addProduct', adminPanelController.addProduct);
router.get('/getProduct', adminPanelController.getProduct);
router.delete('/deleteProduct/:postId', adminPanelController.deleteProduct);
router.post('/updateProduct/:postId', adminPanelController.updateProduct);

module.exports = router;