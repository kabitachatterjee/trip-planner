# TravelBug
This is an application allowing users to keep track of their upcoming and past trips to various destinations. It can be used to plan an itinerary for each trip.<br/>

Heroku Link:  https://floating-mesa-83747.herokuapp.com/

## Technologies used:
- JavaScript
- jQuery
- ajax
- MongoDB
- Express
- Node
- AngularJs
- handlebars
- Passport.js
- Materialize

## Existing Features:
- Users can sign up for the application
- Users can login to the application once signed up
- Users can add new trips
- Users can delete existing trips
- Users can update existing trips


## Planned Features:
- Social capabilities/sharing of trips, photos, comments, etc.
- Advanced search capabilities (back-end search)
- Realtime sending alerts one day prior to an upcoming trip

## Screenshots:
![screenshot #1](/public/images/TravelBug_login.png?raw=true "travel_bug_login")




## Endpoints:
- method: GET,
  path: "/api/trips",
  description: lists out all trips as a JSON object
- method: GET,
  path: "/api/trips/:id",
  description: a single JSON object with details about the trip with the provided ID
- method: POST,
  path: "/api/trips",
  description: creates a new trip as a JSON object by taking input from a form
- method: PUT,
  path: "/api/trips/:id",
  description: updates a trip as a JSON object by taking input from a form
- method: DELETE,
  path: "/api/trips/:id",
  description: removes the data for a single JSON object with the provided ID
