const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Blog = require("../../models/user/Blog.model");
const User = require("../../models/user/User.model");
const isLoggedIn = require("../../middleware/user/isLoggedIn");

//user dashboard routes
router.get("/user-dashboard", (req, res, next) => {
  const username = req.session.currentUser.username;
  Blog.find()
    .populate("creator")
    .then((data) => {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].likes);
      }
      let first = -1,
        second = -1;

      for (let i = 0; i <= arr.length - 1; i++) {
        if (arr[i] > first) {
          second = first;
          first = i;
        } else if (arr[i] > second && arr[i] != first) {
          second = i;
        }
      }

      const firstTwoObj=[
        {
            blogId:data[first]._id,
            creatorName:data[first].creator.username,
            title:data[first].title,
            description:data[first].entry,
            likes:data[first].likes,
            comments:data[first].comments,
            totalComments:data[first].comments.length
        },
        {
            blogId:data[second]._id,
            creatorName:data[second].creator.username,
            title:data[second].title,
            description:data[second].entry,
            likes:data[second].likes,
            comments:data[second].comments,
            totalComments:data[first].comments.length
        }
      ]
      res.render("user-content/dashboard", { username: username,firstTwoObj});

    })
    .catch(err => next(err))
});

router.post("/user-dashboard/:id", isLoggedIn, (req, res, next) => {
  const blogId = req.params.id
  const { comments } = req.body
  const commentsWithName=`${req.session.currentUser.username}:${comments}`
  Blog.findByIdAndUpdate(blogId, { $addToSet: { comments: commentsWithName } }, { new: true })
    .then(comments => res.redirect("/user-dashboard"))
    .catch(err => next(err))
})

//user profile routes
router.get("/user-profile", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser.username
    Blog.find()
    .populate("creator")
    .then(data=>{
        let userData=[]
        let totalLikes=0
        let totalComments=0

        data.filter((someData)=>{
            console.log(someData.creator.username)  
          if(user===someData.creator.username)
            {
                userData.push(someData)
                // console.log("found it")
            }
        })
        for(let i=0;i<userData.length;i++)
        {
            totalLikes+=userData[i].likes
            totalComments+=userData[i].comments.length
        }
     

        res.render("user-content/profile",{userData:userData,totalLikes:totalLikes,totalComments:totalComments, username: user});
    })
    .catch(err => next(err))
});

//blog detail view routes
router.get("/blog-detail/:id", (req, res, next) => {
  const blogId = req.params.id
  const username = req.session.currentUser.username

  Blog.findById(blogId)
    .then(blogToView => {
      let totalLikes=blogToView.likes
      let totalComments=blogToView.comments.length

      res.render("user-content/blog-detail", { blog: blogToView, username: username,totalLikes,totalComments})
    })
    .catch(err => next(err))
})

router.post("/blog-detail/:id", isLoggedIn, (req, res, next) => {
  const blogId = req.params.id
  const { comments } = req.body
  const commentsWithName=`${req.session.currentUser.username}:${comments}`
  Blog.findByIdAndUpdate(blogId, { $addToSet: { comments: commentsWithName } }, { new: true })
    .then(comments => res.redirect(`/blog-detail/${blogId}`))
    .catch(err => next(err))
})

//delete blog routes
router.post("/blog-detail/:id", isLoggedIn, (req, res, next) => {
  const blogId = req.params.id

  Blog.findByIdAndDelete(blogId)
    .then(() => res.redirect("/user-profile"))
    .catch(err => next(err))
})

//edit blog routes
router.get("/edit-blog/:id", isLoggedIn, (req, res, next) => {
  const topics = Blog.schema.path("topic").enumValues;
  const blogId = req.params.id

  Blog.findById(blogId)
    .then(blogToEdit => {
      res.render("user-content/edit-blog", { blog: blogToEdit, topics: topics })
    })
    .catch(err => next(err))
})

router.post("/edit-blog/:id", isLoggedIn, (req, res, next) => {
  const blogId = req.params.id
  const { title, topic, entry } = req.body

  Blog.findByIdAndUpdate(blogId, { title, topic, entry }, { new: true })
    .then(updatedBlog => {
      res.redirect("/user-profile")
    })
    .catch(err => next(err))
})

//user explore routes
router.get("/explore", isLoggedIn, (req, res, next) => {

    Blog.find()
    .populate("creator")
    .then((data) => {
      res.render("user-content/explore",{data:data});
    })
    .catch(err => next(err))
});

router.get("/explore-blog/:id",isLoggedIn,(req,res,next)=>{
    const blogId = req.params.id
    Blog.findById(blogId)
    .populate("creator")
    .then(data=>{
      let totalComments=data.comments.length
        res.render("user-content/explore-blog",{data,totalComments:totalComments})
    })
    .catch(err => next(err))
})

router.post("/explore-blog/:id", isLoggedIn, (req, res, next) => {
  const blogId = req.params.id
  const { comments } = req.body
  const commentsWithName=`${req.session.currentUser.username}:${comments}`
  Blog.findByIdAndUpdate(blogId, { $addToSet: { comments: commentsWithName } }, { new: true })
    .then(() => res.redirect(`/explore-blog/${blogId}`))
    .catch(err => next(err))
})

//like routes
router.post("/explore-blog-like/:id", (req, res, next) => {
  const userId = req.session.currentUser._id
  const blogId = req.params.id
  let likeStatus = false

  User.findById(userId)
      .then(user => {
        for (let i = 0; i < user.likedBlogs.length; i++) {
          if (blogId === user.likedBlogs[i].toString()) {
            likeStatus = true
          } 
        }
        console.log(likeStatus)
        if (likeStatus) {
          User.findByIdAndUpdate(userId, { $pull: { likedBlogs: blogId }}) 
          .then(() => {
            Blog.findByIdAndUpdate(blogId, { $inc: { likes: -1 } }, { new: true })
            .then(() => res.redirect(`/explore-blog/${blogId}`))
            .catch(err => next(err))
          })
        } else {
          User.findByIdAndUpdate(userId, { $addToSet: { likedBlogs: blogId }}) 
          .then(() => {
            Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } }, { new: true })
            .then(() => res.redirect(`/explore-blog/${blogId}`))
            .catch(err => next(err))
          }) 
        }
      })
})

//user create routes
router.get("/create-blog", isLoggedIn, (req, res, next) => {
  const topics = Blog.schema.path("topic").enumValues;

  res.render("user-content/create", { topics: topics });
});

router.post("/create-blog", isLoggedIn, (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { title, topic, entry } = req.body;

  Blog.create({ title, topic, entry, creator: userId })
    .then(() => {
      res.redirect("/user-profile");
  })
  .catch(err => next(err))
});

module.exports = router;
