# Roadmap #

Lets do the United States only.

1. Login Screen
	* Register
	* Login via Google/Facebook/Twitter
	* Forgot Password
	* Login Persists for 3 Days
	* Must work on all devices
	* Can we get people to provide where they are from, who they work for, years in the industry, others?
	* Logo: World Globe with Menu
	* Background color: td orange
	* 
2. Startup Screen
	* On first launch have popup to go to "How To Play Video (on YouTube)""
	* Setup Your Restuarant (if not created yet)
	* Otherwise tab view (w/ icons for "Restaurant", "Marketing", "Reviews", "Reports", "Help")
3. Setup Resturant
	* Name (must be unique)
	* Type: Bistro, Buffet, Cafe, Deli, Coffeehouse, Steakhouse, Gastropub, Carvery, Diner, Bar & Grill
	* Style: Fast Casual Dining, Causal Dining, Fine Dining
	* Menu: American, Asian, Barbeque, Caribbean/ Canjun/ Creole/ Southern, Chinese, Continental/ French, Deli/ Dessert,
			Eclectic/ American, Ethiopian, Indian, Italian, Jamaican, Japanese, Korean, Mediterranean, Mexican/ Texan/ Southern,
			Middle Eastern/ Greek, North African, Portugese/ Spanish, Puerto Rican, Russian, Seafood, Thai, Vegan Macrobiotic
	* Location: List of 50 major cities in the world
	* Starting Cash: Fixed Amount
	* "Go!"
4. Restuarant Screen
	* Edit your menu: Entrees, Beverages (can add/remove from menu, fixed number on the menu at any time, the fixed number depends on restaurant style, the list depends on the menu type)
	* Setup price for entrees/beverages
	* Ingredients/Purchasing?
	* Upgrade your resturant: (?)
5. Marketing Screen
	* IMM (start email campaign, in game campaign [not all browsers support sockets, twitter, otherwise wait till they reload a page])
	* Each campaign costs different amounts, let you target demographics within people playing the game helping your costs
	* Other users get an email, tweet, in game notice to check out another resturant. It costs them a bit of money but can go to your
	  resuarant helping your overall sales and then providing a review helps them gain $ in their game.
	* Can solve mini-puzzles about the top 100 resturants in the world and become friends with a top resturant owner in the world. This helps
	  boost your resturant in-game and other users can see this. Mini-puzzle involves clues to help you figure out which resturant/person, clues involve
	  location, food type, about the owner, some clues become available as you scan QR codes from booths.
    * Meeting people at the conference lets you enter a code into a game to help your sales: Meet Mike K., Scott Gnau, Carrie B., etc.. Tweeting about a talk
      with a specific hashtag "@TeraWorldCuisine Learned a lot about UDA setup and benefits. #tdpartners14 #[name of restaurant] #session267" helps your
      resturant also boost sales.
6. Review Screen
	* Twitter feed of people who did "@TeraWorldCuisine ... #tdpartners14 #[name of restaurant]"
	* Ability to filter by sentiment analysis
	* Total $ extra from reviews
	* How reviews have helped your restuarant
7. Reports Screen
	* By Week/Month/Day breakdowns
	* Dollars vs. % of revenue
	* Revenue: Food, Beverage
	* Cost of Goods: Food, Beverage, Waste, Depletion
	* Gross Margin
	* Staffing: Servers, Host, Cook, Washer
	* Graphs: Margin($) vs % of Unit Sales
	* Items: Qty Sold, Price, Cost, Margin, Gross Sales, Gross Profit, Food Cost %, % Unit Sales
8. Help Screen
	* Set Language Preference (i18n support, can be interrupt though?)
	* FAQs
	* Go to video link


At the booth:
  * One huge screen with a real-time dashboard of things going on in the game: top players list, total players, total online, twitter feed, etc...
  * Another huge screen with a real-time dashboard of everything going on on the system: total sessions, queries, queries by bucket(tactical, dss, etc..),
    queries by type (insert, select, update), cpu/io/memory utilization, ssd/hdd breakdown for IO, ssd/hdd breakdown of DB size, total DB size, along
    with Weatherbee view of the system maybe?
  * Question set at the booth lets users explore the DB and generate ad-hoc queries to answer questions: 1. Who are the top 5 players with the worst profit margin? 2. 	 Who have experienced the greatest number of tax hikes and tax decreases > 5% since entering the game? Etc... to win prizes.

Links:
http://www.theworlds50best.com/list/1-50-winners/
http://www.knowledgematters.com/hospitality-simulations/prosim-restaurant-management/#
http://www.sage.wisc.edu/iamdata/
https://explore.data.gov/catalog/raw?category=Agriculture
http://www.ers.usda.gov/data-products.aspx#.UnQ9b_msh8E

Data Sources:
Location information for all cities in the world
Demographics of all locations in the game
  * population density
  * avg household income
  * avg level of education
  * avg people per household
  * dining habits if available
  * weather data for entire world over past 100 years
  * transportation information
  * farming data (livestock and crops) [yield, cost, quality, ...]
  * taxes import/export
Exchange rates loaded every hour

To Get:
  1. ftp://ftp.ncdc.noaa.gov/pub/data/gsod/
  2. 

Target Data Set Size: 10-50TB (is this feasible?) {means some in HDD}