const path = require("path");
const User = require("../models/user");



///SIGNUP
const signupPage = (req, res) => {
    res.redirect("/pages/signup.html");
};

const signupUser = async(req, res) => {
 try{
    let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registerdUser = await User.register(newUser, password);
    console.log(registerdUser);
    res.redirect("/index.html");
    }

 catch (e) {
    return res.redirect("/signup.html");
}

}

////LOGIN

const loginPage = (req, res) => {
    res.redirect("/pages/login.html");
};

const loginUser = async(req, res) => {
    try{
    res.redirect("/index.html");
    }
    catch(e){
        console.log(e);
    }
}

module.exports = {signupPage, signupUser, loginPage, loginUser};