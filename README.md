# goals forPhonebook backend project

## Exercise 3.1 step 1

- [x] create route to GET the persons list at address <http://localhost:3001/api/persons>

## Exercise 3.2 step 2

- [x] create a new GET request at address <http://localhost:3001/info>
- [x] The page has to show the time that the request was received
- [x] The page has to show how many entries are in the phonebook at the time of processing the request.

## Exercise 3.3 step 3

- [x] create route to GET one person by id at address type <http://localhost:3001/api/persons/:id>
- [x] If an entry for the given id is not found, the server has to respond with the appropriate status code.

## Exercise 3.4 step 4

- [x] create a route to delete a person by its id

## Exercise 3.5 step 5

- [x] create a POST route to add a person at address <http://localhost:3001/api/persons>.
- [x] id should be generated with Math.random with large enough number

## Exercise 3.6 step 6

- [x] implement error handling for creating a person entry if the name or number is missing
- [x] implement error handling for creating a person entry if the name already exists in the phonebook
- [x] Respond to requests with the appropriate status code, and also send back information that explains the reason for the error

## Exercise 3.7 step 7

- [x] add the morgan middleware for the logging
- [x] configure it to log messages to your console based on the "tiny" configuration.

## Exercise 3.8 step 8

- [x] configure morgan so that it shows data sent in HTTP POST request

## Exercise 3.9 step 9

- [x] Make the backend work with the phonebook frontend from the exercises of the previous part.

## Exercise 3.10 step 10

- [x] Deploy backend to internet with render. Link to the web app :
<https://fullstackopen-part3-fqnm.onrender.com/>

## Exercise 3.11 step 11

- [x] make sure you can run the front app in dev mode as well as with the online built

## Exercise 3.12 step 12

- [x] Create a mongo.js file in the project directory
- [x] that can be used for adding entries to the phonebook as follows :
  - command : node mongo.js yourpassword "Anna Name" 040-1234556
  - console output : added Anna number 040-1234556 to phonebook
- [x] and for listing all of the existing entries in the phonebook
  - command : node mongo.js yourpassword
  - console output :
        phonebook:
        Anna 040-1234556
        Arto Vihavainen 045-1232456
        Ada Lovelace 040-1231236

## Exercise 3.13 step 13, step 1

- [x] Change the fetching of all phonebook entries so that the data is fetched from the database. (GET)
- [x] Verify that the frontend works after the changes have been made. (GET)
- [x] In the following exercises, write all Mongoose-specific code into its own module

## Exercise 3.14 step 14, step 2

- [x] Change the backend so that new phonebook numbers are saved to the database. (POST)
- [x] At this stage, you can ignore whether there is already a person in the database with the same name as the person you are adding.
- [x] Verify that the frontend works after the changes have been made. (POST)

## Exercise 3.15 step 15, step 3

- [x] Change the backend so that deleting phonebook entries is reflected in the database.
- [x] Verify that the frontend still works after making the changes

## Exercise 3.16 step 16, step 4

- [x] Move the error handling of the application to a new error handler middleware.

## Exercise 3.17 step 17, step 5

- [x] Modify the backend to support a request where the user tries to create a new phonebook entry for a person whose name is already in the phonebook
- [x] Verify that the frontend works after making your changes.

## Exercise 3.18 step 18, step 6

- [x] update the handling of the api/persons/:id and info routes to use the database
- [x]  verify that they work directly with VS Code REST client

## Exercise 3.19 step 19, step 7

- [x] Expand the validation so that the name stored in the database has to be at least three characters long.
- [x] Expand the frontend so that it displays some form of error message when a validation error occurs.
- [x] You can display the default error message returned by Mongoose, even though they are not as readable as they could be, on the front end

## Exercise 3.20 step 20, step 8

- [ ] Add validation to your phonebook application, which will make sure that phone numbers are of the correct form. A phone number must:
  - have length of 8 or more
  - be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers
    - eg. 09-1234556 and 040-22334455 are valid phone numbers
    - eg. 1234556, 1-22334455 and 10-22-334455 are invalid
- [ ] Use a Custom validator to implement the second part of the validation.
- [ ] If an HTTP POST request tries to add a person with an invalid phone number, the server should respond with an appropriate status code and error message.

## Exercise 3.21 step 21, step 9

- [ ] Generate a new "full stack" version of the application by creating a new production build of the frontend, and copying it to the backend repository.
- [ ] Verify that everything works locally by using the entire application from the address <http://localhost:3001/>.
- [ ] Push the latest version to Render and verify that everything works there as well.
