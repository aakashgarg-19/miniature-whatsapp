const { register, login, setAvatar, getAllUser, logOut } = require('../controllers/userController');
const passport = require('passport')

const router = require('express').Router();

router.post("/register", register);
// router.post("/login", passport.authenticate('local', { failureRedirect: '/api/auth/login-failure', successRedirect: '/api/auth/login-success' }));
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/allusers/:id", getAllUser);
router.get("/logout/:id", logOut);
router.get('/login-success', (req, res) => {
    console.log(req.isAuthenticated());
    if (req.user) {
        console.log("hello-sucess");
        delete user.password;
        res.json({ user: req.user, status: true});
    }
});
router.get('/login-failure', (req, res, next) => {
    res.json({ msg: "Incorrect Username or Password", status: false});
    next();
}, login);
 

module.exports.userRoutes = router;