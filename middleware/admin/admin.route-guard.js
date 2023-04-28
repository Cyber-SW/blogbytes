const session = require("express-session")

const isLoggedIn=(req,res,next)=>{
    if(!req.session.currentUser)
    {
        return res.redirect("/admin")
    }

    next();
}

const isLoggedOut=(req,res,next)=>{
    if(req.session.currentUser){
        return res.redirect("/admin/profile")
    }
    next()
}

module.exports={
    isLoggedIn,
    isLoggedOut
}