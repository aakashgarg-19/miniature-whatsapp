const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./model/userModel");
const bcrypt = require("bcrypt");
const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};
passport.use(new LocalStrategy(customFields,
    function(username, password, done) {
            User.findOne({ username: username }, async function (err, user) {
            if (err) { console.log("11"); return done(err); }
            if (!user) { console.log("22"); return done(null, false); }
            const isPasswordValid = await bcrypt.compare(password,user.password);
            console.log(user, isPasswordValid);
            if (!isPasswordValid) { console.log("33"); return done(null, false); }
            console.log(done());
            return done(null, user);
        });
    }
));

passport.serializeUser((user, done) =>{ 
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
})