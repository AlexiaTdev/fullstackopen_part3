# goals forPhonebook backend project

## Exercise 3.1 step 1
- [x] create route to GET the persons list at address http://localhost:3001/api/persons

## Exercise 3.2 step 2
- [x] create a new GET request at address http://localhost:3001/info
- [x] The page has to show the time that the request was received
- [x] The page has to show how many entries are in the phonebook at the time of processing the request.

## Exercise 3.3 step 3
- [x] create route to GET one person by id at address type http://localhost:3001/api/persons/:id
- [x] If an entry for the given id is not found, the server has to respond with the appropriate status code.

## Exercise 3.4 step 4
- [x] create a route to delete a person by its id

## Exercise 3.5 step 5
- [x] create a POST route to add a person at address http://localhost:3001/api/persons.
- [x] id should be generated with Math.random with large enough number

## Exercise 3.6 step 6
- [x] implement error handling for creating a person entry if the name or number is missing
- [x] implement error handling for creating a person entry if the name already exists in the phonebook
- [x] Respond to requests with the appropriate status code, and also send back information that explains the reason for the error

## Exercise 3.7 step 7
- [x] add the morgan middleware for the logging
- [x] configure it to log messages to your console based on the "tiny" configuration. 

## Exercise 3.8 step 8
- [ ] configure morgan so that it shows data sent in HTTP POST request