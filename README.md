# blogbytes

There will be user and admin portal .

From the index page,there will be Home,about,blogs,contacts us and log in links.(except log in link,all other links will be in index page,we dont have to make a new view for other links except log-in)
when user will click on log in,next page will have nothing except two links:Admin or user.

1:User:
	When we click on user,then sign in.on sign in page ,there will be one link for creating an account.when we will click on creating an account,after creating account,it will redirect to 	sign in page.
	Inside user portal,There will be links:Profile,Create your own blog,Read Blogs,logout(Remember it will be a navbar of user portal means user.layout.hbs).

	-Profile:
		it will show users total number of blogs posted by him,total likes on all his blogs,total number of reviews on all of his blogs.
		there will be link of :your blogs.
		
		-Your blogs:
				inside this link,there will be CRUD operations now.

	-Create your own blog:
		inside this,there will be a form of writting a blog .after submitting,it will redirect to  profile/yours blogs/

	-read blogs:
			in this,we will display all the blogs inside our database sorted according to number of likes.
	-Logout:
		it will redirect to index/user/signin


Admin:
when we click on admin,there will be only sign in page.we will not create any admin account but we will custom create 2 admin accounts in our database.not more than two.

inside admin portal,we will display all users name and number of blogs written(name of user will be a link which will take admin to users profile) and admin can delete any of the user.

There will be only one link of logout in admin portal which will be in navbar(admin.layout.hbs)


Views:
-index
-admin/user selection page
-admin sign-in
-admin dashboard
-admin users profile
-admin users profile blog(when admin will click on user profile and then click on any of this blog  then this view will be shown)

-user sign-in
-user sign-up
-user dashboard
-user profile
-user profile->your blogs
-user profile->your blogs->edit
-user create-your-own-blog
-user read-blogs
-




Routes:

-/
-/admin_user
-/admin_user/admin_sign-in
-/admin_user/admin_sign-in/:id/admin_dashboard
-/admin_user/admin_sign-in/:id/users/
-/admin_user/admin_sign-in/:id/users/blogs

-/admin_user/user_sign-in
-/admin_user/user_sign-in/sign-up(this will redirect to sign in)
-/admin_user/user_sign-in/:id/user-dashboard
-/admin_user/user_sign-in/:id/profile
-/admin_user/user_sign-in/:id/profile/your-blogs
-/admin_user/user_sign-in/:id/profile/your-blogs/edit
-/admin_user/user_sign-in/:id/profile/your-blogs/delete
-/admin_user/user_sign-in/:id/create-blogs
-/admin_user/user_sign-in/:id/read-blogs
-
-
-
