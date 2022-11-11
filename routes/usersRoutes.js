const { Router } = require("express");
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { deleteUser } = require("../controllers/Users/userDeleteControllers");
const { getAllUsers } = require('../controllers/Users/userSearchController')
const {upload} = require('../helpers/imageService');
const {imageUpload} = require("../controllers/Users/imageUploadControllers");
const{verify}= require("../middlewares/JWT");
const{verifyUser}=require("../middlewares/verifyUser");
const router = Router();

router.put('/users/:id',[verify, verifyUser], updateUser);
router.get("/users/:id",[verify, verifyUser], getById);
router.delete("/users/:id",[verify, verifyUser], deleteUser);
router.get('/users',[verify, verifyUser], getAllUsers);
router.post('/image',upload.single('image'),imageUpload);

module.exports = router;

