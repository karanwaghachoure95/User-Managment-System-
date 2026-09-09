# User Management Application

A simple full-stack User Management Application built using React.js,
Node.js, Express.js and MySQL.

## Features

- Create User
- View All Users
- View User by ID
- Update User
- Delete User
- Form validation
- Email validation
- Duplicate email handling
- Error handling
- REST API

## Technologies Used

### Frontend
- React.js
- JavaScript
- HTML
- CSS
- Fetch API

### Backend
- Node.js
- Express.js
- REST API
- MySQL2
- CORS
- dotenv

### Database
- MySQL

## Project Structure

```text
User Management Application/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── userController.js
│   │   │
│   │   ├── routes/
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── db/
│   │   │   └── connection.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── UserForm.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── database/
│   └── database.sql
│
└── README.md