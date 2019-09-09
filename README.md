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


# Step 4: Creating Express App (displaying collected Node data on HTML)

Where the fun starts...





# Step 5: Migrating Express App into AWS Elastic Beanstalk

My goodness, this part was actually kind of difficult. So many bugs / errors ran into...


# What's Next?

- Adding pictures to each row.
- Adding login system so that I can help people catalogue their collections - I'll let them bulk import through CSV since that was something people wanted from what I've read about the ACNL guide app on the App Store.
- Adding landing page that's simple but clean.
- Making mobile views much cleaner (adjusting background image to the browser) and making it less vulnerable to changing browser sizes.
