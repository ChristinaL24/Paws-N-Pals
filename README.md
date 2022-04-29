# Paws-N-Pals 🐾

A full stack web application for prospective pet owners who want to find adoptable pets.

The inspiration behind this application stems from my strong love for all animals. Besides being a dog mom, there was a point in time where I spent four years of my time working on a farm. What made this opportunity special was the fact that I got to bond with the animals I worked with. Paws N Pals is a modern twist on your everyday dating app; rather than match individuals with other people, it matches people with adoptable animals(or "pals") within their area. 

# Technologies Used
- HTML5
- CSS3
- JavaScript
- ReactJS
- PostgreSQL
- Node.js
- Babel
- Webpack
- Express.js

# Live Demo

Try the application live at [https://paws-n-pals.herokuapp.com/](https://paws-n-pals.herokuapp.com/)

# Current Features
- User can search for a type of pet in their area
- User can 'heart'(save) animals they matched with
- User can 'x'(unmatch) the animals that they are not interested in
- User can view saved matches list
- User can view details of each pal
- User can delete pals they are no longer interested in
- User can view the location of the pal on google maps

# Features in Progress
- User can sign up for an account
- User can log in
- User can log out

# Stretch Features
- User can get directions to shelter/organization with google maps

# Preview
![Kapture 2022-04-29 at 13 02 08](https://user-images.githubusercontent.com/97194651/166062154-c2be8159-b142-4b54-b282-7ef03c4c58b8.gif)
![Kapture 2022-04-29 at 13 05 48](https://user-images.githubusercontent.com/97194651/166062162-76217fd8-6a0c-4d0d-84b8-4050a78830a3.gif)

# Development

### System Requirements
- Node.js 16 or higher
- NPM 8 or higher
- PostgreSQL

### Getting Started

1. Clone the repository

    ```shell
    git clone git@github.com:ChristinaL24/paws-n-pals.git
    cd paws-n-pals
    ```

2. Install all dependencies with NPM

    ```shell
    npm install
    ```

3. Make a copy of the .env.example file

    ```shell
    cp .env.example .env
    ```

4. Start postgreSQL (use sudo service postgresql status to check if postgreSQL is online)

    ```shell
    sudo service postgresql start
    ```
  
5. Create a new database

    ```shell
    createdb pets
    ```

6. Import the example database to postgreSQL

    ```shell
    npm run db:import
    ```
    
7. Create a new database

    ```shell
    createdb pets
    ```

8. Start the database (optional - if pgweb is installed). Once the database is running, open the database at http://localhost:8081/ in your browser

    ```shell
    pgweb --db=pets
    ```
    
9. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser

    ```shell
    npm run dev
    ```
