#Steps For Greatness

Set-up
1) Ensure you have the correct .env values
2) npm install

Test Locally
npm start

Getting Ready to Deploy?
Check here for Firebase Documentation: https://firebase.google.com/docs/hosting/test-preview-deploy
And here: https://firebase.google.com/docs/hosting/manage-hosting-resources

1) Log into Firebase: firebase login (Download firebase cli tools)
2) Authenticate with appropriate google account
3) Delete build file if it exists
4) npm run-script build
5) Test using firebase: 
    firebase emulators:start
6) Test using Firebase Preview Channel
    (deploy) firebase hosting:channel:deploy CHANNEL_ID --expires 1d
    (delete) firebase hosting:channel:delete CHANNEL_ID

4) After using the steps above:
Deploy Live --> firebase deploy --only hosting

