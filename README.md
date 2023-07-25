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
   git clone https://github.com/anirudh-nayak-172k/Backend-Microservice -Architecture.git
```  

2 . Navigate to the Directory and install the dependencies:
```
    cd Backend-Microservice-Architecture
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

    server
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
        |
        ├── shared
        │   └── src
        │       ├── configurations
        │       │   ├── logger.configurations.js
        │       │   └── redis.configurations.js
        │       ├── constants
        │       │   └── constants.js
        │       ├── models
        │       │   └── models.js
        │       └── utilities
        │           └── utilities.js
        |── sub-systems
        |    ├── Microservice-1
        |    │   ├── Processes
        |    │   │   └── process.js
        |    │   └── Process-Mappers
        |    │       └── processMappers.js
        |    ├── Microservice-2
        |    │   ├── Processes
        |    │   │   └── process.js
        |    │   └── Process-Mappers
        |    │       └── processMappers.js
        |    └── Microservice-3
        |        ├── Processes
        |        │   └── process.js
        |        └── Process-Mappers
        |            └── processMappers.js
        |
        ├── ecosystem.config.js
        ├── package.json
        ├── package-lock.json

## Scripts

    npm startDev: Starts the services using PM2 in development mode.
    
    npm start: Starts the API Gateway service.
    
    npm kill: Stops all running PM2 processes.
    
    npm monitor: Monitors the PM2 processes.
    
    npm displayLogs: Displays the logs from PM2 processes.
    
    npm test: Runs the test scripts.

## Dependencies

    Express: Fast, unopinionated, minimalist web framework for Node.js.
    
    Body Parser: Node.js body parsing middleware.
    
    Bunyan: Logging library for Node.js.
    
    Bunyan Format: Human-readable bunyan log formatter.
    
    DDoS: DDoS protection middleware for Express.js.
    
    Dotenv: Loads environment variables from a .env file.
    
    Helmet: Secure your Express apps by setting various HTTP headers.
    
    Joi: Object schema validation for Node.js. 
    
    JSONWebToken: JSON Web Token implementation for Node.js.
    
    Morgan: HTTP request logger middleware for Node.js.
    
    Nodemon: Automatically restarts the server on file changes during   development.
    
    PM2: Production process manager for Node.js applications.
    
    Express Rate Limit: Rate limiting middleware for Express.js.
    
    Redis: In-memory data structure store used as a database and cache.
    
    Rate Limit Redis: Redis-based store for express-rate-limit middleware.
    
    Response Time: Express.js middleware to record response times.

## License

    This project is licensed under the MIT License.
