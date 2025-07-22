# Navbar

From the top of the screen, you can navigate to all the different pages on the site.

If logged in, the rightmost item shows the user's profile pic and name.
Under this is the menu where pages only accessible to logged in users are.
Note that admins (see below) have access to some more pages that will also show up here. 

# Login/Register

From here, you can log in, register or reset your password.

Note that both "Login with Google" buttons do the same thing, it is not necessary
to use the one on the register page even if that Google account has never been
used on this site before. When a user logs in for the first time with Google,
their email, profile picture and name will be obtained from Google.

If registering outside of Google, users must enter their name, email and password.
There is currently no way to set a profile picture if registering this way.

Users can type in their email to get a link to reset their password.

# Menu

Here, users can view products sorted by category and place orders if they are logged in.

Upon adding the first item to the cart, the user will be prompted to select a delivery time (timeslot).
This prompt can be cancelled, however the item will not be added to the cart.
Once a delivery time is selected, only other products available for that timeslot will be shown.
This is because for simplicity, each order can only have one timeslot.
Users can place multiple orders if they want products with separate timeslots.

Once added to the cart, users can increase or decrease the quantity.
Reducing the quantity to zero will remove that item from the cart but keep the timeslot selected.
If the user wants to see all products again, they must click 'Start Over' on the top left.

Users can click the cart button on the top right to review their cart.
Products can also be removed from here.
Once the user is finished, they can check out from here.
Users will be prompted to login here if they have not already.
The cart is saved to the user's browser storage and will not be lost even if the user leaves to log in.

Once 'Checkout' is clicked, an order is created and the user is redirected to Stripe to complete payment.
We handle three cases here:
1. Stripe has a back button on the checkout page. If that is clicked, the order will be cancelled and the user will be redirected back to the menu page (the cart will still have the same products in it).
2. If the user closes the page or uses the browser back button, the order is not cancelled but the user can still go back to the menu page the cart will not be cleared.
3. If the user completes payment, they will be redirected to a confirmation screen.

# My orders

Here the user can view their orders. Completed orders are hidden by default.

If the user closed the checkout page as described in case (2) above, for a short time they can complete their payment from here.
If this time has expired, they must cancel the order and place a new order.

Users can cancel their order as long as it hasn't been paid yet (regardless of whether it has expired).

# Order Admin

Admins can use this page to view all customer orders. Completed orders are hidden by default.

Order status is used to advise the customer on the progress of their order. The two options are "pending" and "completed" for now.

Checkout status tells you whether the customer has finished entering their payment details with Stripe. Do not fulfill their order unless this says "Complete" in green.

Payment processing status tells you whether the money has reached your Stripe account. It is up to you whether you start making their order if it says "Pending".

Admins can cancel the order at any time, however **the system will not automatically inform the customer or issue a refund**.

# Menu Admin

From here, admins can add new products or edit existing products.

Most of the product fields are self explanatory except for timeslots. This is where you select what times your product is available for delivery.

For example, if it says
```
Start Date/Time: 01/07/2025 10:00am
End Date/Time: 21/07/2025 10:00am
Repeat every _ weeks: 1
```
this means the product will be available on 1, 8 and 15 July at 10am. The next timeslot would be 22 July but that is past the end date/time so it will not be available.

You can add multiple timeslots in case you want something like "available every Wednesday and also every second Friday".

You can also add or delete categories on this page.
Note that when creating a new product, it will be placed in the category that is currently selected.
You cannot move a product to a new category after creating it.

# User Admin

Here you can search for basic information about a user from their email.

Most importantly, you can make another user an admin from here.

Note this page is only accessible to admins, so the first admin account must be set in the database as described in the deployment guide.