# Social Media API 🌐

This project is a RESTful API built with Node.js, Express, and MongoDB, designed to power a social media platform. It provides functionalities for user authentication, post management (creation, retrieval, updating, deletion), and comment management. The API uses JSON Web Tokens (JWT) for secure authentication and Cloudinary for media storage. It aims to provide a robust and scalable backend for social media applications.

## 🚀 Key Features

- **User Authentication:** Secure user registration and login using bcrypt for password hashing and JWT for session management. 🔐
- **Post Management:** Create, read, update, and delete posts with support for media uploads to Cloudinary. ✍️
- **Comment Management:** Add, retrieve, update, and delete comments on posts. 💬
- **Authentication Middleware:** Protects API endpoints, ensuring only authenticated users can access certain functionalities. 🛡️
- **Cloud Media Storage:** Utilizes Cloudinary for storing and serving media files associated with posts. ☁️
- **RESTful API Design:** Follows REST principles for predictable and easy-to-use endpoints. ⚙️

## 🛠️ Tech Stack

- **Backend:**
    - Node.js
    - Express
- **Database:**
    - MongoDB
    - Mongoose
- **Authentication:**
    - JSON Web Tokens (JWT)
    - bcrypt
- **Media Storage:**
    - Cloudinary
- **Middleware:**
    - cors
    - multer
- **Utilities:**
    - dotenv
    - streamifier
- **Build Tools:**
    - npm

## 📦 Getting Started / Setup Instructions

### Prerequisites

- Node.js (v14 or higher) installed
- MongoDB installed and running
- Cloudinary account set up with API keys
- npm or yarn package manager

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

    or

    ```bash
    yarn install
    ```

3.  Create a `.env` file in the root directory and add the following environment variables:

    ```
    PORT=5000
    MONGO_URI=<Your MongoDB Connection URI>
    JWT_SECRET=<Your JWT Secret Key>
    CLOUD_NAME=<Your Cloudinary Cloud Name>
    CLOUD_API_KEY=<Your Cloudinary API Key>
    CLOUD_API_SECRET=<Your Cloudinary API Secret>
    ```

    Replace the placeholders with your actual values.

### Running Locally

1.  Start the server:

    ```bash
    npm start
    ```

    or

    ```bash
    yarn start
    ```

2.  The server will start running on the port specified in the `.env` file (or 5000 by default).

## 📂 Project Structure

```
social-media-api/
├── middleware/
│   └── authMiddleware.js     # Authentication middleware
├── models/
│   ├── Comment.js            # Comment model
│   ├── Post.js               # Post model
│   └── User.js               # User model
├── routes/
│   ├── auth.js               # Authentication routes
│   ├── comments.js           # Comment routes
│   └── posts.js              # Post routes
├── utils/
│   └── uploadToCloud.js      # Cloudinary upload utility
├── index.js                  # Main entry point
├── package.json
├── package-lock.json
└── .env                      # Environment variables (not committed)
```



## 📬 Contact

[Daveed Gangi] - [daveeddaveedd@gmail.com]

## 💖 Thanks Message

Thank you for checking out this project! We hope it's helpful.

