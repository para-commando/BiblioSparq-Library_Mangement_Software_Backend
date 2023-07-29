# BiblioSparq-Library_Mangement_Software_Backend

This repository contains the backend microservices for the Library Management System. These microservices provide various APIs to manage books, notifications, and user-specific history related to the library system.  It follows the RESTful architectural style, employing HTTP methods like GET, POST, PUT, and DELETE for communication. JSON is used as the data exchange format, making it lightweight and widely compatible with modern web and mobile applications.

![Example Image](./shared/src/assets/library.jpeg)

## Technologies Used
- Node.js
- Express.js
- Sequelize (ORM)
- Twilio (for SMS notifications)
- Sendinblue (for email notifications)
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [Directory Structure](#directory-structure)
- [Dependencies](#dependencies)
- [License](#license)

## Introduction

This Backend Microservices architecture showcasing Library Management system software allows you to efficiently manage and interact with a library system, providing comprehensive functionalities to handle books, borrowers, notifications, and more. With a well-organized set of endpoints, you can seamlessly integrate this API into your library management application to enhance its capabilities and offer an exceptional user experience to your patrons.

## Middleware

The project includes several middleware components that enhance the functionality and security of the API Gateway service:

- Response Time Middleware: Measures the response time of each request and adds it to the response headers.

- Morgan Middleware: Logs HTTP requests to the console, providing useful information for debugging and monitoring.

- Helmet Middleware: Sets various security-related HTTP headers to protect the API from common vulnerabilities.

- JWT Middleware: Handles JSON Web Token (JWT) authentication, ensuring secure access to protected routes.

- DDoS Middleware: Provides protection against Distributed Denial-of-Service (DDoS) attacks by limiting request rates.

- Body Parser Middleware: Parses incoming request bodies in JSON format, allowing easy access to request data.

Feel free to explore the individual middleware modules located in the 'Middlewares/Gateway-Middlewares' directory for more details on their implementation and usage.

## API Endpoints

The API offers a diverse range of endpoints, each catering to specific aspects of library management. Here are the key endpoints provided by the Library Management System API:

### Authentication-subsystem

This Subsystem contains APIs for user authentication, The base URL for all the endpoints in this subsystem is `/Authentication/`, the details of the endPoints in this are:

### 1. `user-authentication/sign-up`
This API allows a user to create a new account by providing their details in the request body. Upon successful registration, the user can use the same credentials to log in to the system.

### 2. `user-authentication/login`
This API allows an existing user to log in to the system by providing their phone number and password.

### Book-Management subsystem

This Subsystem contains APIs for user Book Management, The base URL for all the endpoints in this subsystem is `/BookManagement`, the details of the endPoints in this are:

### 1. `/create-book`
This API creates a new book in the library by accepting required arguments such as ISBN, book title, author, genre, year of publication, book availability status, original number of copies, and number of copies left. The `ISBN` must be a unique identifier for the book.

### 2. `/delete-book`
This API is used to delete a book by accepting its ISBN number as input

### 3. `/update-book`
This API Updates the book information for a given ISBN by accepting the ISBN in the path parameter and the updated book data in the request body.

### 4. `/update-ISBN`
This API is used to update ISBN number of a book by accepting its existing/old isbn number as input path parameter

### 5. `/list-books`
This API retrieves a list of books based on optional filters such as author name, title, genre, year of publication, availability status, book subtitle, book added date, and ISBN number. The API supports pagination through the use of the numberOfRecordsPerPage and numberOfPagesToBeSkipped

### 6. `/search-books`
This API is used to search a book mainly by its title along with optional advanced filters.Optional advanced filters for the search results. The filter parameter should be a list of JSON objects,where each object contains filter criteria for a specific field. Available fields are: `authorName`, `genre`, `yearOfPublication`, `availabilityStatus`, `ISBN`, `bookSubtitle`, `bookAddedDate`. The `yearOfPublication` and `bookAddedDate` fields can take additional filter criteria using the following keys: `between`, `before`, `on`, `after`. The `bookAddedDate` field can also take additional filter criteria using the following keys: `lastSevenDays`, `thisMonth`, `thisQuarter`, `thisYear`, `lastQuarter`, `lastSixMonths`, `LastXmonthsBack`. The `between`, `before`, and `after` keys should have a list of two integers representing the range of years to search for. The `on` key should have a list of integers representing the specific year(s) to search for. The `lastSevenDays`, `thisMonth`, `thisQuarter`, `thisYear`, `lastQuarter`, and `lastSixMonths` keys should have a value of `1` if the corresponding time frame is to be included in the search and `0` otherwise. The `LastXmonthsBack` key should have a value of an integer representing the number of months to search for. The `authorName`, `genre`, `availabilityStatus`, ISBN`, and `bookSubtitle` fields should have a value of the filter criteria to search for. If a field is not included
in the filter criteria, then it will not be filtered on.

### 7. `/book-availability`
'This API outputs whether a book is available or not along with information on the number of copies

### Borrowing-Management subsystem

This Subsystem contains APIs for book borrowing Management, The base URL for all the endpoints in this subsystem is `/BorrowingManagement`, the details of the endPoints in this are:

### 1. `/transact-book/:borrowOrReturn`
This API reserves a book for a user or returns a reserved book by accepting the user\'s contact number and the book\'s ISBN number, along with an additional parameter to differentiate between reserving and returning a book.

### 2. `/all-borrowed-books`
This API lists all the borrowed books with their borrowed date, due date, along with the information of the user who borrowed it. An optional filter can be applied to get specific books based on their due date. Valid options for the filter are: overdue, dueInXDays:2, dueInXDays:13, dueInXDays:14, dueInXDays:15.

### 3. `/user-specific-history`
This API retrieves the borrowing history of a user by taking their contact number as input along with an optional filter to narrow down the search results.

### Notification-Management subsystem

This Subsystem contains APIs for notification Management, The base URL for all the endpoints in this subsystem is `/NotificationManagement`, the details of the endPoints in this are:
### 1. `/notify-user`
This API is used to notify a user via both email and SMS by accepting a custom message as input. The API accepts a message and a phone number as input. It sends the message to the user via SMS using the Twilio API and to the user's email via Sendinblue email service

### 2. `/notify-all`
This API Sends a custom message to all users via SMS and email. Uses Twilio for SMS messaging and Sendinblue email service for emailing the users.

### 3. `/notify-User-Groups/:groupName`
This API notifies specific user groups based on certain conditions with a custom message. Users will receive both SMS and email notifications. The SMS notifications will be sent using Twilio and the email notifications will be sent using Sendinblue.
## Features

- **Microservices**: The architecture is based on microservices, where each service represents a specific business functionality or feature.
- **RESTful APIs**: Each microservice exposes RESTful APIs for communication and interaction with other services.
- **Logging and Monitoring**: Built-in logging and monitoring capabilities are implemented to track service performance and troubleshoot issues.
- **Database Integration**: Services integrate with appropriate databases for data storage and retrieval.
- **Error Handling**: Error handling mechanisms are implemented to provide meaningful error messages and handle exceptions gracefully.
- **Authentication and Authorization**: Services implement authentication and authorization mechanisms to ensure secure access to resources.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
```  
   git clone https://github.com/anirudh-nayak-172k/BiblioSparq-Library_Mangement_Software_Backend.git
```  

2 . Navigate to the Directory and install the dependencies:
```
    cd BiblioSparq-Library_Mangement_Software_Backend
    npm install
```

3 . Run the startDev script to start the application

```    
    npm run startDev
   
```
4 . Access the APIs:
Each service exposes its own set of APIs.

5. To see the Logs:

```    
    npm run displayLogs
   
```
 6. To stop the application entirely,

```    
    npm run kill
   
```
## Directory Structure

BiblioSparq-Library_Mangement_Software_Backend
|
├── API-Gateway
│   └── src
│       ├── app.js
│       ├── Microservice-Routers
│       │   └── microserviceRouters.js
│       └── Middlewares
│           ├── Gateway-Middlewares
│           │   ├── ddos.middleware.js
│           │   ├── helmet.middleware.js
│           │   ├── jwt.middleware.js
│           │   ├── morgan.middleware.js
│           │   └── responseTime.middleware.js
│           └── Route-Middlewares
│               └── expressRateLimit.middleware.js
├── ecosystem.config.js
├── package.json
├── package-lock.json
├── README.md
├── shared
│   └── src
│       ├── assets
│       │   └── library.jpeg
│       ├── configurations
│       │   ├── logger.configurations.js
│       │   ├── postgresConnection.configurations.js
│       │   └── redis.configurations.js
│       ├── constants
│       │   └── constants.js
│       ├── migrations
│       │   ├── 20230312195800-create-sign-up.js
│       │   ├── 20230323195343-create-book-management.js
│       │   └── 20230408194107-create-borrowing-management.js
│       ├── models
│       │   ├── bookmanagement.js
│       │   ├── borrowingmanagement.js
│       │   ├── index.js
│       │   └── signup.js
│       ├── seeders
│       ├── thirdPartyServices
│       │   ├── sendInBlue.services.js
│       │   └── twilio.services.js
│       └── utilities
│           ├── bookManagementUtilities.js
│           ├── genricUtilities.js
│           └── notificationManagementUtilities.js
└── sub-systems
    ├── authentication
    │   ├── Processes
    │   │   └── process.js
    │   └── Process-Mappers
    │       └── processMappers.js
    ├── book-Management
    │   ├── Processes
    │   │   └── process.js
    │   └── Process-Mappers
    │       └── processMappers.js
    ├── borrowing-Management
    │   ├── Processes
    │   │   └── process.js
    │   └── Process-Mappers
    │       └── processMappers.js
    └── notification-Management
        ├── Processes
        │   └── process.js
        └── Process-Mappers
            └── processMappers.js

## Scripts

    npm startDev: Starts the services using PM2 in development mode.
    
    npm start: Starts the API Gateway service.
    
    npm kill: Stops all running PM2 processes.
    
    npm monitor: Monitors the PM2 processes.
    
    npm displayLogs: Displays the logs from PM2 processes.
    
    npm test: Runs the test scripts.

## Dependencies

    bcryptjs: A library for hashing and comparing passwords securely.

    csv-parser: A CSV parsing library for Node.js.

    body-parser: Middleware for parsing request bodies in Express.

    pg: A PostgreSQL client library for Node.js.

    sequelize: An ORM (Object-Relational Mapping) for Node.js and databases like PostgreSQL, MySQL, SQLite, etc.

    sib-api-v3-sdk: A library for integrating with SendinBlue's API v3.

    bunyan: A simple and fast JSON logging library for Node.js.

    twilio: A library for integrating with Twilio's communication services.

    bunyan-format: A bunyan log formatter for human-readable console output.

    ddos: A package for preventing and handling DDoS attacks in Node.js applications.

    dotenv: A zero-dependency module for loading environment variables from a .env file.

    express: A popular web framework for Node.js.

    express-rate-limit: Middleware for rate-limiting requests in Express applications.

    helmet: A collection of security-related middleware for Express to enhance security headers.

    joi: A powerful schema validation library for JavaScript.

    jsonwebtoken: A library for creating and validating JSON Web Tokens (JWT).

    morgan: HTTP request logger middleware for Express.

    nodemon: A utility to automatically restart Node.js applications during development.

    pm2: A process manager for Node.js applications in production environments.

    rate-limit-redis: Rate limiting using Redis as a store.

    redis: A popular in-memory data store often used as a database, cache, and message broker.

    response-time: Middleware for adding X-Response-Time header to responses in Express.

## License

    This project is licensed under the MIT License.
