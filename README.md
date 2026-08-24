# CS 465 Full Stack Development
## Travlr Getaways

Travlr Getaways is a full-stack travel application built using the MEAN stack with MongoDB, Express, Angular, and Node.js. The application has a customer-facing website for viewing available trips along with a separate Angular SPA for administrative functions. The final version also includes authentication and protected API endpoints so that changes to trip information can only be made by an authenticated user.

## Architecture

This project gave me experience with a few different approaches to frontend development. The customer-facing portion uses Express and Handlebars to build and render pages on the server. JavaScript is used throughout the application for routing, controllers, API calls, database access, and most of the application logic. The administrator side uses Angular as a single-page application, which works differently because the interface can move between different functions and update information without having to reload an entirely new page every time.

The Angular side is broken into components for things like the trip listing, individual trip cards, adding and editing trips, login, and navigation. Services handle shared functions such as communicating with the API and managing authentication. This ended up making the Angular application easier to organize as more functionality was added because the interface and the logic behind it did not all have to be kept in the same place.

MongoDB also worked well for the backend because the trip information fits naturally into documents and can be passed through the application in a format that is very similar to JSON. Mongoose adds a schema and gives the Express server a consistent way to interact with that data. This made it relatively straightforward to move the project away from the original JSON data and into a database without having to completely change the structure of the trip information.

## Functionality

JSON and JavaScript are closely related, but they are not the same thing. JavaScript is a programming language that can contain functions, variables, conditions, and other application logic. JSON is mainly a format for storing and transferring data. In Travlr Getaways, JSON is one of the main things tying the frontend and backend together. The Express API can return trip data from MongoDB as JSON, Angular can use that data to build the trip interface, and changes made in Angular can then be sent back through the API.

There were also several places where the project was refactored as it became more complex. The original static pages were moved into Handlebars templates and shared partials so repeated sections like the header and footer did not need to exist separately on every page. Trip information was moved from local JSON files into MongoDB and then accessed through Mongoose and REST API endpoints.

The Angular application was also separated into reusable components instead of putting the entire interface into one large component. A trip card, for example, can be reused for every trip instead of rebuilding the same layout each time. Services were used for API and authentication logic, and I later added an HTTP interceptor so the JWT could automatically be included with protected requests. These changes made the application easier to maintain and kept repeated code from spreading throughout the project.

## Testing

Working with the REST API made the relationship between HTTP methods and endpoints much clearer to me. GET requests retrieve information, POST requests can create new information, PUT requests update existing information, and DELETE requests remove it. The endpoint identifies which part of the application the request is working with. For example, `/api/trips` works with the trip collection, while `/api/trips/:tripCode` can be used to work with one specific trip.

I tested these endpoints throughout the project using Postman as well as the Angular application itself. GET requests were used to make sure MongoDB data was being returned correctly, and POST, PUT, and DELETE requests were used to confirm that the API could actually modify the database. I also used the browser developer tools to look at requests coming directly from Angular, which was useful for seeing exactly what the SPA was sending to the server.

Security made the testing process a little more complicated because a request could now fail even when the endpoint itself was working correctly. After a successful login, the server generates a JSON Web Token and Angular includes that token with protected requests. I tested requests using a valid token as well as invalid or missing tokens to make sure unauthorized users could still view trip information but could not add, edit, or delete it. That made it easier to see that testing an API is not just about whether the request works, but also whether the correct users are allowed to make that request.

## Reflection

This course helped connect a lot of topics that I had previously worked with more independently. Instead of looking at frontend development, APIs, databases, and authentication as separate areas, this project required all of them to work together inside the same application. I became much more comfortable following data through the entire process, from something happening in the Angular interface, through an HTTP request and Express controller, into Mongoose and MongoDB, and then back to the frontend.

I also got more experience working with an application as it changed from a relatively simple prototype into something with several different layers. That included refactoring repeated code, building reusable Angular components, creating REST API endpoints, working with MongoDB, and adding authentication with JSON Web Tokens. Debugging was also a big part of the project because problems were not always isolated to one layer. Sometimes the issue was in Angular, sometimes it was in the API, and sometimes it was in the data being sent between them.

Overall, I think the course made me more comfortable working with a complete web application instead of only one part of the stack. The experience with Angular, Express, MongoDB, REST APIs, authentication, Git, and debugging across multiple layers gives me a stronger base for moving into software development work and continuing into more advanced projects.
