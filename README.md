# The Nugget Mountain Bar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2. There are no CI/CD pipelines so deplyements are done manually.

## Local Development

The frontend was initially developed using the Angular CLI version 7.0.2 and has since been upgraded.  It now requires the Angular CLI  > ^9.1.6

To run locally:
```
npm run start
```
## Frontend Deployment

The frontend application is hosted in AWS S3.  The deployment is handled by the <a href="https://docs.amplify.aws/start/q/integration/js" target="_blank">AWS Amplify</a> library using the JavaScript integration.

You will need the AWS SDK as well as the AWS Amplify library installed on your local machine and to configure a profile using IAM credentials in order to deploy to S3.
```
amplify publish
```
Just a heads up, updates to the Amplify library usually break things in a painful way.  Update the Amplify library if you feel like punishing yourself.

## Backend Development
The Backend is a Restful Node/Express app that will expose the API on port 3000 for local development
```
node app.local.js
```
A .env file needs to be placed in the server root that contains an ACCESS_KEY_ID and SECRET_ACCESS_KEY, for local development.  

