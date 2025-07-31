# Social Media Backend

A robust and scalable backend API for a social media platform built with `Node.js`,`Express.js`,`Mongodb` along with `several dependencies`. This project provides core social media functionalities including user management, posts, comments, likes, follows, and much more features.

## 🚀 Features

### User Management

- User registration and authentication
- JWT-based authorization
- Password change functionality
- Password reset functionality
- Email verification

### Social Features

- Create, read, update, and delete posts
- Like and unlike posts
- Comment on posts
- Follow/unfollow users

### Media Handling

- Image upload and storage
- Support for multiple image formats

### Collections

- Create, read, update and delete boards
- View other users boards

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer and Cloudinary
- **Security**: bcrypt
- **Environment**: dotenv
- **Mailing**: Nodemailer

## 📁 Project Structure

```
social-media-backend/
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   ├── mailing.js
│   └── multer.js
├── controllers/
│   ├── board.controller.js
│   ├── comment.controller.js
│   ├── follow.controller.js
│   ├── like.controller.js
│   ├── post.controller.js
│   └── user.controller.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   ├── blacklist.model.js
│   ├── board.model.js
│   ├── comment.model.js
│   ├── follow.model.js
│   ├── like.model.js
│   ├── post.model.js
│   └── user.model.js
├── routes/
│   ├── board.routes.js
│   ├── comment.routes.js
│   ├── follow.routes.js
│   ├── like.routes.js
│   ├── post.routes.js
│   └── user.routes.js
├── scripts/
│   └── jwt_secret.js
├── .gitignore
├── index.js
├── package.json
└── README.md
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Tushar57517/social-media-backend.git
   cd social-media-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   PORT=5000
   PROD_MONGO_URI=your-mongodb-atlas-uri

   JWT_SECRET=your-secret-key

   MONGO_URI=your-mongodb-compass-uri

   GOOGLE_MAIL=your-email
   GOOGLE_APP_PASSWORD=your-email-password

   AUTH_BASE_URL=http(s)://your-domain/auth

   PRODUCTION=false     # true for production

   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Start the server**

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Tushar** - [GitHub](https://github.com/Tushar57517)

⭐ If you found this project helpful, please give it a star on GitHub!
