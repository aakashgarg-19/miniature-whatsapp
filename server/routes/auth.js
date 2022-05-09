const { register, login, setAvatar, getAllUser, logOut } = require('../controllers/userController');

const router = require('express').Router();

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUser);
router.get("/logout/:id", logOut);

module.exports.userRoutes = router;