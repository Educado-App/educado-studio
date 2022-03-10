# Educado creator studio
Educado Creator studio + backend, a learning creation application based on the following tools:

- Nodejs
- express
- axious
- react
- material ui
- redux
- aws s3
- mongodb
- google Oauth

and much more.

## Basic overview
Educado is mainly split into:

- web client
- config
- models
- routing

## Requirements
Before running the app you must setup the following outside dependencies:

- Google Oauth
- Amazon S3 Bucket using the AWS key / secret key system
- A mongoDB database

## Getting started with Educado 
After cloning the repository run: npm install 

This should be done in both the root folder and in the client web folder.

(Optional): Run npm audit fix on both

Before starting the app, correct access keys must be setup for dev.
Within config create a dev.js file and insert your own:

1. googleClientID
2. googleClientSecret
3. mongoURI
4. cookieKey
5. s3 Bucket name

This is done within a module.exports function. 
NOTE: Your AWS key and Secret key must be stored locally on your PC and NOT on the dev.js file.

Once completed educado will run with the: npm run dev command.
By default it runs on port 3000 and port 8888. 