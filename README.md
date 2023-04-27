# blogbytes

In this team project my partner Muhammad Hussain (https://github.com/MuhammadHussain1701) and me Shawn Wolter worked together to create a blogging website where users can write, read, create, update, delete, like, comment, and explore blogs. The timeframe for this project was 6 days.

We used HTML5, CSS3, JavaScript (ES6), Handlebars, MongoDB, Express, and Cyclic for the deployment.

The application is structured in two parts. The admin portal is where all users get displayed and the admin has the ability to see details of all the users and to delete them if necessary. The admin portal can be reached at this route https://blogbytes/admin/profile. The second part is the user portal, where the user experience starts at the user dashboard. On the user dashboard, the user can see the two most liked blogs out of every blog on the page and their likes and comments and also can comment on these blogs. From the dashboard, the user can navigate to explore, profile, and create a blog page, and also logout. On the explore page all blogs get listed and when the user clicks on a blog he gets directed to the detailed view of the specific blog where he can read it and also like and comment on it. The profile shows all the blogs a user created and by clicking on a specific blog the detailed view of that blog opens and gives the user the ability to edit and delete the blog and also see all its comments and comments on it. The create blog view let users choose a title and a topic and write a blog entry. Both parts are accessible through the index page via login or signup for new users and admins.

The most challenging thing was implementing the like blogs feature because every user needs the ability to like multiple blogs and also unlike specific blogs by clicking on the like button again while increasing or decreasing the total number of likes of that specific blog. We solved that problem by giving the user model an additional property, basically, an array where all the ObjectIds from the blogs he pressed the like button get stored. And every time the user clicks on a like button we loop over the array inside the user model with the stored ObjectIds and have an if statement that compares the ObjectIds from the blog where he clicked the like button and the ObjectIds inside the array. When the loop finds an ObjectId where the condition is true the likes property inside the blog model gets decreased and the ObjectId of that specific log gets deleted from the array. And when the condition is false the ObjectId from the blog gets stored inside the array and the likes of that specific blog get increased. 

What we learned: 
> Working as a team
> Structuring files and work to guarantee an issueless merge or at least an easily fixable issue
> Creating, structuring, and using databases specifically MongoDB
> Working with a server specifically Express
> Creating a dynamic website by passing different views from the back end to the front end
> Communicating everything in English since Hussains native language is Pakistani and my is German
