const express = require("express");
const router = express.Router();
const Topic = require("../../models/user/Topic.model");
const isLoggedOut = require("../../middleware/user/isLoggedOut");
const isLoggedIn = require("../../middleware/user/isLoggedIn");

//user dashboard routes
router.get("/user-dashboard", isLoggedIn, (req, res, next) => {
    const username = req.session.currentUser.username
    res.render("user-content/dashboard", { username: username })
})

router.post("/user-dashboard", isLoggedIn, (req, res, next) => {

})

//user profile routes
router.get("/user-profile", isLoggedIn, (req, res, next) => {
    res.render("user-content/profile")
})

//user explore routes
router.get("/explore-blog", isLoggedIn, (req, res, next) => {
    res.render("user-content/explore")
})

//user create routes
router.get("/create-blog", isLoggedIn, (req, res, next) => {
    Topic.find()
    .then((topicsFromDB)=> {
        res.render("user-content/create", { topics: topicsFromDB })
    })
})




module.exports = router;