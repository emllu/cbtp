const express = require('express');
const router = express.Router();
const { register, registerLimiter, logs, adminRegister, check } = require('../components/user');
const authmiddleware = require('../authMiddleware/authmiddleware');
const {getAllItems,insertion,updation,deletion} = require('../components/items');
const {userinfo,verify} = require('../components/userinfo');
// const item=require('../components/itemcollection');
const forms=require('../components/forms'); 
const usermiddleware=require('../authMiddleware/usermiddleware');
const {purchase}=require('../components/purchase');
const {uploadfile,upload}=require('../components/upload')
const { uploadAndInsertItem ,uploadMiddleware}=require('../components/uplaodins')
router.post('/register',registerLimiter,register)
router.post('/logs', logs); // Correct
router.get('/check', authmiddleware, check); // Correctmon a
router.post('/adminRegister', adminRegister); // Correct
router.post('/items', getAllItems); // Correct
router.post('/userinfo', userinfo); // Correct
// router.post('/itemcollection', item);
router.post('/forms',forms); // Line 15 in userRoutes.js
router.post('/purchase',purchase)
router.post('/insert',insertion)
router.put('/items/:id',updation)
 router.delete('/items/:id', deletion)
router.post('/verify',verify)

router.post('/upload', upload.single('file'),uploadfile)
router.post('/upload-and-insert',uploadMiddleware,uploadAndInsertItem )
// Export the router
module.exports = router;

