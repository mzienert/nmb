# The Nugget Mountain Bar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2.

## Local Development

The frontend was initially developed using the Angular CLI version 7.0.2 and has since been upgraded.  It now requires the Angular CLI  > ^9.1.6

To run locally:
```
npm run start
```
## Frontend Deployment

The frontend application is hosted in AWS S3.  The deployment is handled by the AWS Amplify library.

You will need the AWS SDK installed on your local machine and to configure a profile using IAM credentials in order to deploy to S3.
```
amplify publish
```
Just a heads up, updates to the Amplify library usually break things in a painful way.  Update the Amplify library if you feel like punishing yourself.
