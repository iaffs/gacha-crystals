# Gacha Crystals

### Exam PG6301 - Høyskolen Kristiania

Link: <http://localhost:8080/>

#### Intro

My learning curve has been very steep, and I am proud of what I have been able to achieve during this time.
Project is written in React, JS and Node.js from a boiler plate provided by Andrea Arcuri in lectures. In my project I have used quiz-game solution 9 as a starting point.
I have marked the files which have been copied from lectures in project as well.


#### Structure

Task was to make a Gacha game where user can buy and sell loot boxes.
In my solution I have chosen to start at a "not logged in page" where the user can either sign up, or logged in if user already have been signed up. When signed in or logged in, the user is able to see it's own items from loot boxes, which is empty at first. The user also gets 3 free "gifts" (= loot boxes -> random crystals where the most rare crystal is more seldom) to start off with. User also starts with 5 value in wallet.
When 3 gifts have been redeemed, it is no longer possible to redeem any more gifts. The user then has the option to "mill" or sell items, based on the worth of the items.
The user also has the possibility to check out all the available crystals when logged in, and is also shown at the starting page when the user is not logged in.

Commands:
+ `yarn test` - This runs coverage on the test files in the project
+ `yarn dev` - Starts both the client and the server to do development
+ `yarn build` - This is to build the project for production
+ `yarn watch:client` - This boots up the client for development
+ `yarn watch:server` - This boots up the server with help of Nodemon for development
+ `yarn start` - This will start the server node

### Starting up the application
+ `yarn install`
+ `yarn test`
+ `yarn dev`

#### Images of the project
![Structure of the project](https://github.com/iaffs/gacha-crystals/blob/master/public/img/structure.png "Project structure")

![Starting page](https://github.com/iaffs/gacha-crystals/blob/master/public/img/startingpage.png "Starting page")

### Tests
When I am writing this pre delivery 03.11 Monday morning, I have as much as 53.93% coverage and all tests are passing.

![Test coverage](https://github.com/iaffs/gacha-crystals/blob/master/public/img/coverage.png "Starting page")

### Functionality
+ Create user
+ Signup
+ Login/logout
+ Fake data to represent all the Gacha items
+ User items specifically
+ Session cookie
+ Open loot box and get random crystal
+ Sell crystal and get money that reflects the value and rarity of the crystal

### Extra functionality
+ I didn't really add any extra functionality to be honest, but I am happy I was able to make sure the user can't refresh the page and then redeem more gifts, because I used quite some time making this work. Same with logging in and then log out, and then logging in again.

## Evaluation

I have struggled a lot during this exam to make everything work, but stubborn as I am I wanted to be able to make it as good as possible and to master as much of the requirements as I could.
I am happy about the result regardless of the grade. The grade doesn't always reflect the effort and what the student learned. This exam has also made me want to do more React in personal projects, and also made me more curious about security in web applications.

## Missing functionality
+ Free gift every x amount of time - I am so sad about this actually because I really wanted to master this but since I am writing this in the middle of the night I am far from able to figure out the code to make it work.
As a part of this, there is now a code I started in ws-handler.js, but that I didn't get any further with. With more time I would probably have been able to implement this.

+ Tests - With more time I would have wanted to focus more on writing good test and get better coverage.
This is something I have learned a lot from, and that I will take with me into future projects both personally and professionally.
As far as I know, there's not any major missing funcionality, but I'm sure there's something I missed that I can't think of as of now
