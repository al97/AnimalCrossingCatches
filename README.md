# AnimalCrossingCatches
Web app built through Node that tells you what fish, bugs, and deep sea creatures you can catch in animal crossing at any given moment.

Left out my database authentication info, and all the node_modules used in the express app because there's just too many files.

Now that it's finally done, let's go through the steps I had to go through to complete this project:

# Step 1: Web Scraping

I had to scrape the data regarding the catch times for each creature using Jupyter Notebook and the following links:
https://animalcrossing.fandom.com/wiki/Deep-sea_creatures
https://animalcrossing.fandom.com/wiki/Bugs_(New_Leaf)
https://animalcrossing.fandom.com/wiki/Fish_(New_Leaf)

Used this tutorial to learn the very very basics of web scraping:
https://www.learndatasci.com/tutorials/ultimate-guide-web-scraping-w-python-requests-and-beautifulsoup/

It was really simple with this guide. I installed Jupyter Notebooks and ripped the data straight out of the tables from these wikis - they're literally the same tables, honestly. Just needed to select with Beautiful Soup ('table tr td') and it was a done deal - it comes out in the form of a gigantic array that has like 1300 entries. It extracts each <td> entry from each table. From there, I just divided each of these into rows by counting the number of columns and extracted the according data, putting each row into an array and creating an array of arrays. All that was left to do at that point was to write this data into a csv, which I found the command for online.
  
  
# Step 2: Set-up AWS RDS

Not too difficult, at least from what I remember. Just did some research on the best option... and I'm most used to SQL queries and things of that nature on the MySQL platform so I went with RDS, MySQL. AWS Free Tier lets you provision an RDS instance for 12 months for free, so I went with that. Provisioning is simple and AWS handles a lot of it - the only thing I really needed to do was add different ports to access the instance on its security group.


# Step 3: Learning Node and Express, Populating MySQL Database

Hard. Node has been awesome to learn but it's tough...

First things first, to learn the ropes I created a few initial Node files to understand how to create servers and connect to databases.

Started with w3schools (love this site):
https://www.w3schools.com/nodejs/default.asp
to learn basic commands and get the hang of what Node can do.

To learn more about Node's purpose and theory behind the structure of it, I used this youtube video:
https://www.youtube.com/watch?v=fBNz5xF-Kx4

Finally, it was just a matter of writing some code.
Having gone through all the demo modules in the w3schools tutorial, I wrote createTables.js, populateTables.js, dropTables.js, and displayTableData.js as simple exercises to get used to working with Node and populate my database. The only difference between these files is the queries I run - everything else with the connecting to the database and such are all the same.

Run connection.connect - and the file names should be self explanatory. Got different functions for creating tables, populating them, dropping them, and displaying them through the console.


# Step 4: Displaying collected Node data on HTML through EJS

Where the fun starts...

Not really. First things first, wrote the query that would return all the fish, bugs, and DSC's that would be available to us at our given time (Date() object). Then, I use a function to set a variable to these query values (array), because of how SQL queries and database connections work in Node. They're... how should I say - they don't happen when they appear in the code, if that makes sense. So if I include a connection to a database, and I try to end it in the same code, the query doesn't work.

That should help explain why it's necessary to transport the SQL query results to a separate variable - otherwise, we don't know when we can access these results.

Then, I send this data into a viewing engine EJS. JavaScript template, lets me send objects to an html file with <% %>.

First things first, wrote for loops through <% %> in order to display all the rows and columns easily - just iterate through the array object passed in from the node code. Before this, I decided to use Datatables, a table plug-in through Jquery that I think is pretty clean and has some good functionality. So it was just a matter of using <td><%= fishrows[i].name %></td> a bunch of times, setting up the table tags, and including a link at the <head> of the html file that would convert it to Datatables' format.
  
That was all well and good, and I wanted to be able to choose which table I wanted to look at, like a slideshow. https://www.w3schools.com/howto/howto_js_slideshow.asp - used this link. So only one table is viewable at a time, can click on arrow buttons to move between them. Then, wanted to make sure the table stayed a certain size and not any larger, so I added scrolling options that Datatables provides for their tables.

Something that was a pain with adding the slideshows was that Datatables uses the table format you've given them, and shoves each table into its own wrapper. What that means is that the slideshow function didn't implement itself properly - I had to first rename the class that the slideshow was working with to the datatable wrapper, and even then it wouldn't work until I clicked the button to move slides first - you'll understand when you look at the code, but essentially the slideshow gathers all html elements of a certain kind of class and allows you to move between them, blocking from view the others. So, the elements wouldn't gather themselves until I clicked the arrow button because they were now under a different class - the datatable wrapper rather than the table element.
  
So I had to include a script that would execute the slideshow script AFTER the page was load and the tables were already at this point renamed to their proper wrapper names.

Then, I had to figure out how to deal with adding static files to EJS - this involved making this singular node file into an express app, in order to access the stylesheets and images that I had written.

Making it into an express app was relatively simple - just followed their tutorial which is the first thing you see when you visit their homepage. Had some trouble understanding what exactly was happening, but once I did I wrote my stylesheet, copy pasted my node code into app.js, and ran it through - it all worked, so background images and fonts could be added to my website.

Running it locally, it looks all good. Time to set it up on Elastic Beanstalk and make it accessible to the web.


# Step 5: Migrating Express App into AWS Elastic Beanstalk

My goodness, this part was actually kind of difficult. So many bugs / errors ran into...

Elastic Beanstalk is incredibly convenient. However, importing the Node app to elastic beanstalk was pretty difficult... had to deal with reinstalling Node and npm on the EC2 instance, ran into lots of errors regarding symbolic links that were setup properly on my own system but weren't once they were transported to EC2.

Didn't have to reinstall in the end - just needed to install mysql on my own system into the node_modules folder that I have in the express app. Although I sure tried reinstalling...

Finally, made my Route 53 domain name bertkim.com reroute to the Elastic Beanstalk url - relatively simple, but this brought a styling error that I presume was because google chrome uses webkit? I'm really not sure what happened here since it worked fine with the original Elastic Beanstalk url, but when I rerouted the traffic through my domain name, the headers were misaligned with the columns of the table. Adding width=100% to each <html> tag worked here to make it look better - it works on all browsers just fine now.


# What's Next?

- Adding pictures to each row.
- Adding login system so that I can help people catalogue their collections - I'll let them bulk import through CSV since that was something people wanted from what I've read about the ACNL guide app on the App Store.
- Adding landing page that's simple but clean.
- Making mobile views much cleaner (adjusting background image to the browser) and making it less vulnerable to changing browser sizes.

# Step 6 - Adding Login System and Navigation (Home Page, About Page)

Adding a login system entails a lot of things:
- 2 more tables: one to store user login data, one to store catalogs
- Different links to move to and from each place
- Link that leads you to input where you can add your catches
- Ability to register
- Error handling for login information

As soon as you add the ability for the user to do something, the web app becomes much more complicated...
First things first, added a simple form that let's you login on html and had it send this post data to /auth, which will handle all the verification - check to see that it's a registered user and that the password is correct. If all qualifications are met, it'll redirect you to your catalogue, which is initially empty. Also tracks percentage to completion based on simple query.

Did the same for a register.html link - this one checks to see if your user information exists in the table, and if it doesn't, you're allowed to register with your username and password.

Adding your catch data was also handled the same way as both login and register - I know, there's probably way better ways to do this, and this doesn't allow you to bulk import your catches - I should probably add CSV support at some point. But for now, you add your catch, its record weight, and the type of creature it is so that I know to add it to the Fish, Bugs, or DSC table.

Before we move on, I wanted to program error handling for login and register: I wanted different messages to pop up that were context-sensitive, like if you entered the wrong information, or if your register information exists in the table already, or when you're inputting catch data if the creature you inputted actually does exist in the game. Installed connect-flash for this. Basically, you can store messages when the request is made and output them in EJS if a message is stored. So, if a message was stored (an error occurred), I stored the message so that it could be printed on the client-side javascript view. If you try to add something that's not a fish, it'll redirect to the add catch page and display the message. If you login with the wrong information, it'll redirect to login and tell you that you did. If you register and your info is added to the table, you are redirected to the login page with the message that says you succesfully registered - now login!

The messaging was actually difficult because I had to deal with this HTTP header issue where you can't send two responses in a row - beautiful explanation here https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client?rq=1, but basically I wasn't really understanding how asynchronous IO worked in Node and needed to understand how states worked. Also, I was tearing my hair out with the issue until I realized I called res.end() after submitting a response to redirect already. You can’t send responses past a certain point so you gotta comb through to find all the responses you are sending incorrectly / extraneously - this was typically the bug but the explanations really helped me understand Node better.

Now that we have all these links, it's time to give them access to each other. I used a navbar template from Bootstrap, which messed up the styling of alot of different pages used here because I wasn't using Bootstrap previously. HTML tag select was getting cut in half, the padding was all messed up. After customizing the CSS for each of these elements (particularly the datatables), I also had to make sure that you could see two different navbars - one that reflected your login information, and one that reflected the fact that you weren't logged in yet. Simple matter of using EJS to display login information if you were logged in, and take away the login and register button and replace it with a logout button. If you weren't logged in, show the login and register button and take away your logout button. Redirected the Your Catalog button to the login page if you weren't logged in yet.

Home page and about page are very simple - Home page is a homage to Animal Crossing: Wild World, where the bulletin board would show random messages every week or so. I had it pull a random message from all the messages in the game (credits to https://github.com/Helmasaur/ac-keijiban for the messages) by using Math.random() and shoving all the messages in an array. The about page is a simple description about what this project is and who I am.

# Back to Step 1 - Actually getting the user's time

The final thing I had to fix was actually the entire idea behind the project - my Express application was reflecting UTC time because the app was pulling the time from the hosting server and pulling the queries according to the server's datetime. To get around this, I decided to use an auto submit form that took your current hour and month, and automatically submitted it as a post request to the app, which would then use this information to return the accurate data. 

# More?
- Front-end work. This site... reminds me of much older webpages where the background is always a static image. I'm sure this site looks terrible on mobile and barely adapts to changing browser sizes (other than the navbar). I'll definitely work on this soon.
- Adding catches - I want people to be able to bulk import their catch data so that they can add more than one catch at a time.
- 

