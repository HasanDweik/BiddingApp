# Introduction 
This project has been created as a Web application Auction System for users to buy, bid or sell on items available in the marketplace. A user can create an item and move it to his inventory, or offer it on the marketplace and get credits in return. With these credits, the user can purchase other items available on the marketplace.
Every minute, auctioned items that are pending to be closed are handled automatically, being sent to either the owner if no bidder existed, or to the highest bidder's inventory. 

# Getting Started
1. Installation process

After cloning this project, you will need to run the following command for the backend:
`composer install`

And `npm install` for the frontend project.

Once the install has been finished, if you wish to run the minutely automatic update, you will need to either create a cron on Linux based systems through: `crontab -e`, or create a task on task scheduler if you're on windows.

# Demo

A small collection of pictures showcasing the web app:

Login:
![Login](/public/readmeImages/login.png)

Register:
![Register](/public/readmeImages/register.png)

Home Page:
![Home Page](/public/readmeImages/homepage.png)

Transfer Hub:
![Transfer hub](/public/readmeImages/transferhub.png)

Topup Page:
![Topup Page](/public/readmeImages/topuppage.png)

Inventory:
![Inventory](/public/readmeImages/inventory.png)

Settings:
![Settings](/public/readmeImages/Settings.png)

Create new Item:
![New item](/public/readmeImages/newitem.png)

Transfer List:
![Transfer List](/public/readmeImages/transferlist.png)

List item on transfer list:
![List item](/public/readmeImages/listitem.png)

Transfer Market:
![Login image](/public/readmeImages/transfermarket.png)

Bid or buy item on market place:
![Login image](/public/readmeImages/bidorbuy.png)