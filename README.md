# Ensolvers exercise

CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Installation
 * Starting the project
 * Using the page
 * Design Decisions


INTRODUCTION
------------

The exercise consists of making a web page which allows to register as a user, log in, create items, group them in folders, complete them and delete items and folders.
The final project is composed of 3 parts:

- Server: the server of the project is developed with Node.JS using the Express.js framework. It has at its disposal a series of APIs that allow the front-end to communicate with the database indirectly. For the communication with the database we used mysql2.

- Database: The database is a MySql DB mounted on a personal hosting to facilitate the production use of the site. It has 3 related tables:
	- Items: Stores the items created
	- Folders: Stores the created folders.
	- Users: Stores the registered users.
	In the following diagram you can see the relationships.![db](.\support\db.jpg)
	
- Fron-end: The front-end of the project is developed in Vue.JS. It has a single view which requests the Log In when it is required and the list of tasks when there is already a logged in user. Only the items created by the logged in user are shown. Axios is used for communication with the server, Sweetalert2 is used for log in, sign in and folder creation pop ups and crypto is used for user password encryption. The password for registration and login is encrypted with SHA256.

INSTALLATION
------------

To start the project you need to have the following installed:

* Node.JS 

  * Version: v10.16.3 (or higher)
  * Installation: https://nodejs.org/es/download/

* NPM 

  * Version: v6.14.5 (or higher)
  * Installation: installs together with Node.js

* Vue

  * Version: 4.5.16 (or higher)
  * Installation: "npm install -g @vue/cli".

Once all the requirements are installed the repository must be cloned with the command "git clone https://github.com/mariano9478/ensolvers.git". Once the repository is downloaded, look for the "instalation.bash" file and run it.

  


STARTING THE PROJECT
----------------

To start the project it is only necessary to execute the file "start.bat" found inside the downloaded folder. It will start the server at "localhost:3000" and the page at "localhost:8080".


USING THE PAGE
-------------

If you search for "localhost:8080" in the browser you will find the following view:

![login](.\support\login.jpg)

Here you have two options, register as a new user or login with your account. Once you have logged in you will see the following:
![page](.\support\page.jpg)
The page allows you to:

- Create items: using the section marked in orange you can create items by typing the text you want to display and assign it to a folder.
- Create folders: in the same section you can use the folder selector to create a new folder. Just select the "New Folder" option and a pop up will appear to enter the folder name.
- Expand folders: to navigate through the created folders just click on the arrow on the left in the blue section. In this way they will be expanded or hidden.
- Edit items: when you double click on an item in the red section, its data will be loaded in the orange section. Here you can change the text of the item and the folder it belongs to. At the end you have two options "save" to edit the item or "add" to create a new item from the previous one. This is used to use an existing item as a template.
- Delete items: If you click on the red cross located to the right of each item a pop up will appear to confirm that you want to delete it. The same can be done with folders. If a folder is deleted, all the items assigned to it will be deleted.
- Completing an item: If you click on the white box of an item it will be checked and will remain checked until you click again to uncheck it or delete it.
- Unlogin: By clicking on the "Log Out" button in the green section you can unlogin to log in with another account.

### To test the bot you can use the account:
* Username: admin
* Password: admin


DESIGN DECISIONS
----------------

At the time of starting the project there were several doubts such as "What is the right architecture for a project of this style? The main thing I thought at the time of making the decision of how to structure the project was to have in mind scalability, usability and professionalism. As for scalability, I know this is just an exercise but it is appropriate in any project to keep in mind the possibilities of the project and develop a project with quality. Usability is present when using Vue.js. This framework offers among other things a great user experience when everything will load dynamically and in very short times. And finally the professionalism that even if this is just a task list page the main objective is to show what I am capable of and that I can make an integrated project with competitive technologies in the market.
On the other hand, there are points that I didn't have time to complete but that I took into account in the design of the project such as error handling, automatic testing, security improvements, automatic deploy and best practices when using git.
Regarding git, I used the gitflow methodology which I think is excellent for teamwork and continuous improvement. Finally I didn't use git as I should because when developing I wouldn't have conflict problems because I wouldn't merge with code from other developers and I created a structured development plan which allowed me to develop all the features in a continuous way without errors.

For the deploy I had the idea of mounting the whole project on a Docker base but I could not dedicate the time I would have liked so I opted not to take that path.
