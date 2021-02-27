# Recover password

**Functional Requisites (FR)**

- User should be able to recover his password by informing his email;
- User should receive an email with instructions of how to recover password;
- User should be able to reset his password;

**Non Functional Requisites (NFR)**

- Use Mailtrap to test email exchange in development environment.
- Use Amazon SES to send emails in production environment.
- Sending an email should be happening on the background (backgound job).

**Business Rules (BR)**

- The link sent to email to reset password should expire in 2h;
- User need to confirm new password when reseting his password.

# Profile update

**Functional Requisites (FR)**

- User should be able to update his name, email and password.

**Business Rules (BR)**

- User can not change his email to another one that is already used in the system.
- User must inform old password in order to update it to a new one.
- User must confirm new password in order to update it to a new one.

# Service provider panel

**Functional Requisites (FR)**

- User must be able to list his bookings of a specific day;
- Service provider must receive a notification when there's a new booking;
- Service provider must be able to see non read notifications;

**Non Functional Requisites (NFR)**

- Bookings from a service provider should be stored in cache;
- Service provider notifications should be stored in MongoDB;
- Service provider notifications should be sent in real time using Socket.io;

**Business Rules (BR)**

- Notification should have a "READ" or "NOT READ" so the service provider has better control.

# Booking/Scheduling service

**Functional Requisites (FR)**

- User must be able to list all registered service providers;
- User must be able to list the days from a month with at least one available slot of a service provider;
- User must be able to list availabe time slot of a specific day of a service provider;
- User must be able to schedule a a new service with the service provider.;

**Non Functional Requisites (NFR)**

- The list of service providers should be stored in cashe (so it won't cost too mutch to the device processor);

**Business Rules (BR)**

- Each booking must last 1h;
- Bookings must be available between 8h to 18h (First at 8h, last one at 17h);
- User can not book a slot that is already booked;
- User can not book a time slot that is passed current date/time;
- User can not book service with themself;


