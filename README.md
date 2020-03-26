# The App - Mountainbiker

Platform connecting mountainbikers with trails, where they can search trails by name and by locationcan add them to their favorite adventures. Users can post opinions about favorite trails and see all details including Google Maps location. 
Built with RESTful API architecture and CRUD functionalities.

## Motivations
Build a fullstack app that uses Ruby for the backend with PostgreSQL and React for the frontend.

## Demo 
<a href="https://mountain-biker.herokuapp.com/home">Here!</a>

## Technical details and Resources
- Front-end built with React and React Router.
- Styling with pure CSS and Semantic UI.
- PostgreSQL database.
- Authentication with JWT.
- Developed a Ruby on Rails API backend with 4 different endpoints: for users, paths, comments and adventures.
- Used serializer to format the JSON file.
- APIs: The Mountainbike Project Data API and Google Maps API

## Installation
- Fork and clone the project frontend: https://github.com/SoniaDumitru/Mountainbiker-Frontend 
- Fork and clone the project backend: https://github.com/SoniaDumitru/Mountainbiker-Backend
- Have Ruby, Rails and Node.js installed.
- In your terminal, go to Mountainbiker-Backend
```bash
    $ rails db:create
    $ rails db:migrate
    $ rails s
```
The server will start on http://localhost:3001

- In your terminal, go to Mountainbiker-Frontend
```bash
    $ npm install
    $ npm install
    $ npm start
````
The app will run on http://localhost:3000

## Visuals
### Login
- Username: sonia@gmail.com
- Password: sonia

* Home Page: 

<img width="1430" alt="Screen Shot 2020-03-09 at 4 29 28 PM" src="https://user-images.githubusercontent.com/44908424/76259281-4937ea00-6223-11ea-94a4-c0f1b081b5f1.png">

* MTB Trails Page: 

<img width="1435" alt="Screen Shot 2020-03-09 at 4 42 59 PM" src="https://user-images.githubusercontent.com/44908424/76260557-104d4480-6226-11ea-8323-4f46aab603f3.png">

* Search By Name or By Location -> MTB Trails Page:

<img width="1432" alt="Screen Shot 2020-03-09 at 4 44 45 PM" src="https://user-images.githubusercontent.com/44908424/76260413-bfd5e700-6225-11ea-965e-e7a14e29d94a.png">

* Trail Details Page:

<img width="1425" alt="Screen Shot 2020-03-09 at 5 03 36 PM" src="https://user-images.githubusercontent.com/44908424/76261787-c2860b80-6228-11ea-85cf-25019e7ceadc.png">

* Post Comment for Trail -> Trail Details Page:

<img width="1438" alt="Screen Shot 2020-03-09 at 4 54 39 PM" src="https://user-images.githubusercontent.com/44908424/76260835-b00ad280-6226-11ea-9749-be02ee639196.png">

* Signup Page:

<img width="1435" alt="Screen Shot 2020-03-09 at 5 11 50 PM" src="https://user-images.githubusercontent.com/44908424/76261922-18f34a00-6229-11ea-9a4e-03d6012399f1.png">

* Logged in users can save trails to their favorites list -> Profile Page: 

<img width="1433" alt="Screen Shot 2020-03-09 at 5 23 42 PM" src="https://user-images.githubusercontent.com/44908424/76262594-c4e96500-622a-11ea-86ec-926bb9d07977.png">

* Login -> Login Page: 

<img width="1432" alt="Screen Shot 2020-03-09 at 5 11 10 PM" src="https://user-images.githubusercontent.com/44908424/76261929-1db7fe00-6229-11ea-9352-88ecaba8c6ee.png">

* Update Account -> Update Account Page: 

<img width="1433" alt="Screen Shot 2020-03-09 at 4 57 00 PM" src="https://user-images.githubusercontent.com/44908424/76260989-024bf380-6227-11ea-95b3-4aab0e52707f.png">

## Author
* Sonia Dumitru 
