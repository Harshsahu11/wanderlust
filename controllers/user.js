const User = require("../models/user.js");

module.exports.signUp = async (req, res) => {
    try {
        let { username, password, email } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to WanderLust!");
            res.redirect("/listings");
        });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    }
};

module.exports.login = async(req, res) => {
    let redirectUrl = res.locals.redirectUrl || "/listings";
    req.flash("success", "Welcome to WanderLust! You are logged in!");
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err)return next(err);
        req.flash("success", "You are logged out!");
        res.redirect("/listings");
    });
};