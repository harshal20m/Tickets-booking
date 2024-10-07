# Tickets Booking Application                                      [Link](https://bookmyshow1hm.netlify.app/)

Welcome to the Tickets Booking Application! This is a full-stack application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js) that allows users to browse events, book tickets, and manage their bookings.

## Features

- User authentication and authorization
- Browse events with details
- Book tickets for selected events
- View and manage your bookings
- Admin panel for managing events and bookings
- Responsive design with Tailwind CSS
- Payment integration using Razorpay

## Technologies Used

- **Frontend:**
  - React.js
  - Vite
  - Tailwind CSS
  - Axios for API calls

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB for database management
  - Razorpay for payment integration

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/) (or use a cloud database service)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harshal20m/Tickets-booking.git
   cd Tickets-booking
   
2. **Navigate to the server directory and install dependencies:**
   ```bash
   cd server
   npm install
   ```

4. **Navigate to the client directory and install dependencies:**

   ```bash
   cd ../client
   npm install
   ```

## Configuration

1. **Create a .env file in the server directory and add the following environment variables:**
    ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_SECRET=your_razorpay_secret
    ```
2.**Replace the placeholders (your_mongodb_connection_string, your_jwt_secret, your_razorpay_key_id, and your_razorpay_secret) with your actual credentials.**

   **Start the server:**
  ```bash
  cd server
  npm start
  ```
   **Start the client:**
  ```bash
  cd ../client
  npm run dev
  ```

## Contributing
  Contributions are welcome! If you'd like to contribute to the project, please fork the   repository and submit a pull request.
