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
