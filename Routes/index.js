const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const authenController = require("../controllers/authentication");
const adminPanelController = require("../Controllers/adminPanel");
const purchaseController = require("../Controllers/purchases");

router.get('/', homeController.getHomePage);
router.get('/product', homeController.getProductPage);
router.get('/payment', homeController.getPaymentPage);
router.get('/reciept', homeController.getRecieptPage);

router.get('/signin', authenController.signIn);
router.get('/signup', authenController.signUp);
router.post('/register', authenController.register);
router.post('/login', authenController.login);
router.post('/logout', authenController.logout);
router.get('/getUser', authenController.getUser);
router.delete('/deleteUser/:userId', authenController.deleteUser);

router.get('/admin', adminPanelController.adminPage);
router.post('/addProduct', adminPanelController.addProduct);
router.get('/getProduct', adminPanelController.getProduct);
router.delete('/deleteProduct/:postId', adminPanelController.deleteProduct);
router.post('/updateProduct/:postId', adminPanelController.updateProduct);

router.post('/addPurchase', purchaseController.addPurchase);
router.get('/getPurchase', purchaseController.getPurchase);
router.delete('/deletePurchase/:purchaseId', purchaseController.deletePurchase);
router.patch('/updatePurchase', purchaseController.updatePurchase);

module.exports = router;