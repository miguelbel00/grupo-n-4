const { Router } = require("express");
const { updateUser } = require('../controllers/Users/userUpdateControllers');
const { getById } = require("../controllers/Users/userByIdcontrollers");
const { deleteUser } = require("../controllers/Users/userDeleteControllers");
const { getAllUsers } = require('../controllers/Users/userSearchController');
const { upload } = require('../helpers/imageService');
const { imageUpload } = require("../controllers/Users/imageUploadControllers");
const { Ownership } = require('../middlewares/ownership');

const router = Router();

router.put('/users/:id', Ownership, updateUser)
router.get("/users/:id", getById);
router.delete("/users/:id", deleteUser);
router.get('/users', getAllUsers)
router.post('/image', upload.single('image'), imageUpload)

module.exports = router;

