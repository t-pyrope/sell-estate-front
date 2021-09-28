# Sell Estate App

This is a front for Sell Estate App. [Backend is here](https://github.com/t-pyrope/sell-estate-api)

Check how it looks like here: [Sell Estate App](https://sell-estate-ezpbb.mongodbstitch.com/)

## How to use the app with backend repository
1. Download this repository
```
git clone https://github.com/t-pyrope/sell-estate-front.git
cd sell-estate-front
npm install
```
2. Run it locally
```
npm start
```
3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
4. Download backend repository
```
git clone https://github.com/t-pyrope/sell-estate-api.git
cd sell-estate-api
npm install
```
5. Run the server locally (make sure you have `nodemon` package installed globally)
```
nodemon server
```
6. The server will run on [http://localhost:5000](http://localhost:5000)

## How to use the app without downloading the server repository
1. Download this repository
```
git clone https://github.com/t-pyrope/sell-estate-front.git
cd sell-estate-front
npm install
```
2. Uncomment the commented code in `src/http-common.js` and `src/services/estates.js` and comment alternatives of the uncommented code
3. Run the app locally
```
npm start
```
The app will run on [http://localhost:3000](http://localhost:3000)
