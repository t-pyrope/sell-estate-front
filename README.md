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
To use it without downloading the server repository, change the following code in this one:

- in `src/http-common.js` replace this:
```javascript
baseURL: "http://localhost:5000/lead",
```
to this
```javascript
baseURL: "https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/sell-estate-ezpbb/service/lead/incoming_webhook/lead",
```
