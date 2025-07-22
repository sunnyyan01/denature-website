# Setting up a Firebase project

Firebase is the main external provider we use for this program. We use 3 of their services:
* Authentication (for logging in, registering etc)
* Firestore (their database solution - for storing user, product and order data)
* Storage (for storing product images)

All of these services can be configured from the [Firebase Console](https://console.firebase.google.com/). You log into this with your Google account.

To start, click on "Create a Firebase Project" and follow the prompts. I recommend just naming the project "DeNature". We don't need Google Analytics but you can set it up if you want.

Now you will be taken to the project overview page. Click on the Web icon (</>) to set up a new web app. The name doesn't matter, I used "denature-web". You don't need to enable Firebase Hosting. It will then give you some code, look for this part:
```
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
  measurementId: "..."
};
```

Create a file on your computer called `.env` (put this in the same folder as the code if you have it on your computer). Copy the keys from the code provided by Firebase to this file in this format:
```
NEXT_PUBLIC_FB_API_KEY=...
NEXT_PUBLIC_FB_AUTH_DOMAIN=...
NEXT_PUBLIC_FB_PROJECT_ID=...
NEXT_PUBLIC_FB_STORAGE_BUCKET=...
NEXT_PUBLIC_FB_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FB_APP_ID=...
NEXT_PUBLIC_FB_MEASUREMENT_ID=...
```

## Setting up Firebase Authentication
From the left sidebar, open Product Categories > Build > Authentication. Once you set this up, it should stay at the top under "Project Shortcuts".

Go to the "Sign-in method" tab, click on "Add new provider" and select "email/password". Don't allow email link sign-in.

Then repeat and add Google as another provider. Follow the prompts - I think the only thing you need to enter is a support email.

Now go to the "Settings" tab and select "Authorised domains".
Basically, for security reasons, you need to give it a link to the website you are logging in from.
You only need the part between `https://` and the first slash.
For your current website this is `denature.org.au`.
You may also want to add the free domain that Vercel gives you (e.g. mine is `denature-website-chi.vercel.app`).

Now everything is set up. You can monitor user accounts using the "Users" tab.
If a user needs help with their account, you can send a password reset email from here.
Please do not use the "Add user" button, some user info is stored elsewhere and will not be created if you create a user here.

Firebase Auth is free for up to 50k monthly active users.

## Setting up Firestore
From the left sidebar, open Product Categories > Build > Firestore Database. Once you set this up, it should stay at the top under "Project Shortcuts".

Leave database ID blank and location on its default setting. Mine defaults to `nam5 (United States)`. There are minor differences in pricing between locations, US is usually the cheapest.

For the security rules, selected "Locked mode".

Click "Create".

Now go to the rules tab and paste this in:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	function isAdmin() {
    	return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
    match /users/{user_id} {
    	allow read: if request.auth.uid == user_id;
      allow write: if request.resource.data.admin == false && request.auth.uid == user_id;
      allow read, write: if isAdmin();
    }
  	match /categories/{category_id} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /products/{product_id} {
      allow read: if true;
      allow write: if isAdmin();
    }
    match /orders/{order_id} {
    	allow read: if true;
      allow create: if request.resource.data.user_id == request.auth.uid;
      allow update, delete: if resource.data.user_id == request.auth.uid || isAdmin();
    }
  }
}
```

Now go to the "Indexes" tab and add an index with the following details: \\
Collection ID: `orders` \\
Fields to index: \\
1. `user_id` Ascending \\
2. `status` Ascending \\
3. `__name__` Ascending \\
You can also try using this link: https://console.firebase.google.com/project/denature-463911/firestore/databases/-default-/indexes?create_composite=Cllwcm9qZWN0cy9kZW5hdHVyZS00NjM5MTEvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL29yZGVycy9pbmRleGVzL0NJQ0FnT2pYaDRFSxABGgsKB3VzZXJfaWQQARoKCgZzdGF0dXMQARoMCghfX25hbWVfXxAB

Everything is set up now. You will see data being added as the app is used in the "Data" tab.

Firestore pricing is complicated, it charges for data storage as well as reading, writing or deleting records.
The free tier covers 1GB of storage per month and 20k writes per day.

## Setting up Firebase Storage
From the left sidebar, open Product Categories > Build > Storage. Once you set this up, it should stay at the top under "Project Shortcuts".

If you haven't already, you will be prompted to link your payment method.
There is still a free tier for Storage, however you must link a card to access it.

Leave the bucket reference as the default.
To access the free tier, set the location to a no-cost location.
I use `US-WEST1` because it is the closest to Australia.
Set the rules to "Start in production mode".

Go to the rules tab and paste the following in:
```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /menu/{productId} {
      allow read: if true;
      allow write: if firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.admin;
    }
  }
}
```

Everything is set up now. You will see images in the menu folder as menu items are created.

Storage is free for up to 5GB per month. Even if you go over, it is only 2 cents per GB per month.

# Stripe Setup
For this part, you will have to follow the prompts as I can't complete this part on my account.

Sign up at https://stripe.com/au and follow the prompts.

If it asks "How do you want to accept payments?", select "Pre-built checkout form".

Don't worry about creating products or prices, these will automatically be created when you create a product through the website.

Once you are finished, it should give you two API keys labelled "Publishable key" and "Secret key".

There are also two corresponding keys that have the word "test" in them, these are for sandbox mode.
You can use these keys instead to test the program.
In sandbox mode, you can use [test card numbers](https://docs.stripe.com/testing?testing-method=card-numbers#cards) and no actual money is transferred.

To connect Stripe to our code, go back to the `.env` file from before and add the following entries:
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk...
STRIPE_SECRET_KEY=sk...
```

# Deployment to Vercel
I will give you the code by creating a pull request on your Github repo. Once you accept this, my code will replace yours.

As you have already set up Vercel to automatically deploy changes to your code,
all you need to do is give it the `.env` file to link the Firebase and Stripe services.

To do this, open up your Vercel project and go to the Settings tab.
Click "Environment Variables" on the left, and then "Import .env" and give it the file you have created.

# Setting the first user as admin
After creating your account on the website, you will need log back into the Firebase Console to make yourself admin.

1. Go to the "Data" tab under "Firestore Database".
2. Click on "users" on the left, then select a user ID (there should only be one if only you have registered).
3. Then you will see "admin: false" on the right. Click the pencil icon, click the false dropdown and change it to true, then click "Update".
4. Refresh the website and you should see the admin functions.
