const router = require("express").Router();
const Admin = require("../../models/admin/admin.model");
const User = require("../../models/user/User.model");
const {isLoggedIn,isLoggedOut}=require("../../middleware/admin/admin.route-guard")
const bcrypt = require("bcrypt");
const saltRounds = 10;

router.get("/admin",isLoggedOut,(req, res, next) => {
  res.render("admin/admin-signin");
});

router.post("/admin", (req, res, next) => {
  // console.log("session:",req.session)
  const { username, password } = req.body;

  if (username === "" || password === "") {
    res.render("admin/admin-signin", {
      errorMessage: "Please enter both username and password",
    });
    return;
  }

  Admin.findOne({ username })
    .then((user) => {
      // console.log(user)
      if (!user) {
        res.render("admin/admin-signin", {
          errorMessage: "Username is not registered,try another username",
        });
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        // res.render("admin/admin-profile",{user})

        req.session.currentUser = user;
        res.redirect("/admin/profile");
      } else {
        res.render("admin/admin-signin", {
          errorMessage: "Incorrect Password",
        });
      }
    })
    .catch((err) => next(err));
});
router.get("/admin/profile",isLoggedIn, (req, res) => {
  res.render("admin/admin-profile", { userInSession: req.session.currentUser });
});

router.post('/admin/profile/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err){
        next(err);
      }
      res.redirect('/');
    });
  });

router.get("/admin/signup", (req, res, next) => {
  res.render("admin/admin-signup");
});
router.post("/admin/signup", (req, res, next) => {
  const { fullname, username, password } = req.body;

  if (!fullname || !username || !password) {
    res.render("admin/admin-signup", {
      errorMessage:
        "All fields are mandatory. Please provide your username, email and password.",
    });
  }

  bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      // console.log("hashed password:",hashedPassword)

      return Admin.create({
        fullname,
        username,
        password: hashedPassword,
      });
    })
    .then((userFromDb) => console.log("newly created user is :", userFromDb))
    .catch((err) => next(err));

  // Admin.create(fullname,username,password)
});

// EXPORTING

module.exports = router;
