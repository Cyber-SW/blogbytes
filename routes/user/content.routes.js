const express = require("express");
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
            creatorName:data[first].creator.username,
            title:data[first].title,
            description:data[first].entry,
            likes:data[first].likes
        },
        {
            creatorName:data[second].creator.username,
            title:data[second].title,
            description:data[second].entry,
            likes:data[second].likes
        }
      ]
    //   console.log(firstTwoObj)
      res.render("user-content/dashboard", { username: username,firstTwoObj});

    });
});

//user profile routes
router.get("/user-profile", isLoggedIn, (req, res, next) => {
  const user = req.session.currentUser.username
    Blog.find()
    .populate("creator")
    .then(data=>{
        let userData=[]
        let totalLikes=0
        data.filter((user)=>{
            if(req.session.currentUser.username===user.creator.username)
            {
                userData.push(user)
            }
        })
        for(let i=0;i<userData.length;i++)
        {
            totalLikes+=userData[i].likes
        }
        // userData.forEach((data,index)=>{
        //     console.log(data[index])
        //     // totalLikes=totalLikes+data.likes
        // })

        res.render("user-content/profile",{userData:userData,totalLikes:totalLikes, username: user});
    })
});

//blog detail view routes
router.get("/blog-detail/:id", (req, res, next) => {
  const blogId = req.params.id
  const username = req.session.currentUser.username

  Blog.findById(blogId)
    .then(blogToView => {
      res.render("user-content/blog-detail", { blog: blogToView, username: username })
    })
    .catch(err => next(err))
})

//delete blog routes
router.post("/blog-detail/:id", isLoggedIn, (req, res, next) => {
  const blogId = req.params.id
  console.log(blogId)

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
        // console.log(data)
      res.render("user-content/explore",{data:data});
    });
});
router.get("/explore-blog/:id",isLoggedIn,(req,res,next)=>{
    Blog.findById(req.params.id)
    .populate("creator")
    .then(data=>{
        
        res.render("user-content/explore-blog",{data})
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

  Blog.create({ title, topic, entry, creator: userId }).then(() => {
    res.redirect("/user-profile");
  });
});

module.exports = router;
