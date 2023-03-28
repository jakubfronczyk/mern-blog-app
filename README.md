# Dev Dairies
[Check out live demo](https://mern-blog-app-blue.vercel.app/)
## General info

MERN Blog App is a full-stack web application built with MERN stack (MongoDB, Express.js, React.js, and Node.js) that allows users to create, read, update, and delete blog posts. The app uses JSON Web Tokens (JWTs) for authentication and authorization.

## Built With

MERN Blog App is built using the following technologies:

* MongoDB - NoSQL document-oriented database
* Express.js - Node.js web application framework
* React - JavaScript library for building user interfaces
* Node.js - JavaScript runtime environment
* React Router DOM - Library used for client-side routing in React applications
* React Quill - A React component for the Quill Rich Text Editor
* Multer - A middleware used for handling multipart/form-data, which is primarily used for uploading files
* bcryptjs - A library used for password hashing and verification
* cookie-parser - Middleware used for parsing cookies in requests
* cors - A package used to enable Cross-Origin Resource Sharing (CORS) for Express applications
* jsonwebtoken - A library used for generating and verifying JSON Web Tokens (JWTs) used for authentication and authorization
* mongoose - An Object Data Modeling (ODM) library used to interact with MongoDB databases

## Getting Started
### Prerequisites
* Node.js (v14 or higher)
* npm (v7 or higher)
* A Google account for Gmail authentication

### Installation
1 Clone the repository to your local machine:
```
git clone https://github.com/your-username/mern-blog-app.git
```
2. Install dependencies:
```
cd mern-blog-app
npm install
cd client
npm install
```
3. Create a .env file in the root directory of the project and add the following environment variables:
```
MONGODB_URL=your-mongo-db
JWT_SECRET=your-secret-key
```
Replace your-secret-key and your-mongo-db with your own value.

4. Start the development server:
```
npm run dev
```
The app should be running on http://localhost:3000.
