const express = require("express");
const router = express.Router();
const Blog = require("../../models/user/Blog.model");
const isLoggedIn = require("../../middleware/user/isLoggedIn");


//user dashboard routes
router.get("/user-dashboard", isLoggedIn, (req, res, next) => {
    const username = req.session.currentUser.username
    res.render("user-content/dashboard", { username: username })
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
    const topics = Blog.schema.path("topic").enumValues
    
    res.render("user-content/create", { topics: topics })
})

router.post("/create-blog", isLoggedIn, (req, res, next) => {
    const userId = req.session.currentUser._id
    const { title, topic, entry } = req.body

    Blog.create({ title, topic, entry, creator: userId })
        .then(() => { res.redirect("/user-dashboard") })
})




module.exports = router;