# Social Media API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [User Routes](#user-routes)
- [Post Routes](#post-routes)
- [Board Routes](#board-routes)
- [Like Routes](#like-routes)
- [Comment Routes](#comment-routes)
- [Follow Routes](#follow-routes)
- [Error Responses](#error-responses)

## Overview

Base URL: `http://localhost:5000` (or your configured PORT)

This Base URL is applicable if running locally.

This API provides endpoints for a social media platform with features including user authentication, posts, boards, likes, comments, and following functionality.

## Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## User Routes
Base path: `/auth`

### 1. Register User
**POST** `/auth/register`

Register a new user account.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response:**
```json
{
  "message": "user registered successfully"
}
```

**Error Responses:**
- `403` - Missing fields: `{"error": "all fields required"}`
- `403` - Email exists: `{"error": "user with this email exists"}`
- `403` - Username exists: `{"error": "user with this username exists"}`
- `500` - Server error: `{"error": "internal server error"}`

### 2. Login User
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepassword123"
}
```

**Success Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Responses:**
- `403` - Missing fields: `{"error": "all fields required"}`
- `403` - User not found: `{"error": "user doesn't exist"}`
- `403` - Wrong password: `{"error": "password doesn't match"}`
- `500` - Server error: `{"error": "internal server error"}`

### 3. Logout User
**GET** `/auth/logout`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
{
  "message": "You are logged out!"
}
```

**Error Responses:**
- `403` - No token: `{"error": "access denied"}`
- `400` - Already logged out: `{"error": "Already logged out"}`
- `403` - User not found: `{"error": "user not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 4. Change Password
**PATCH** `/auth/change-password`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "oldPassword": "currentpassword",
  "newPassword": "newsecurepassword"
}
```

**Success Response:**
```json
{
  "message": "password updated successfully!"
}
```

**Error Responses:**
- `400` - Missing fields: `{"error": "all fields required"}`
- `400` - User not found: `{"error": "user not found"}`
- `400` - Same password: `{"error": "new password cant be same as old password"}`
- `400` - Wrong old password: `{"error": "old password doesn't match"}`
- `500` - Server error: `{"error": "internal server error"}`

### 5. Reset Password Request
**POST** `/auth/password-reset-request`

**Request Body:**
```json
{
  "username": "johndoe"
}
```

**Success Response:**
```json
{
  "message": "password reset email sent!"
}
```

**Error Responses:**
- `400` - Missing username: `{"error": "all fields required"}`
- `400` - User not found: `{"error": "no user found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 6. Reset Password Confirm
**POST** `/auth/password-reset-confirm/:token`

**Request Body:**
```json
{
  "newPassword": "newsecurepassword",
  "confirmPassword": "newsecurepassword"
}
```

**Success Response:**
```json
{
  "message": "password reset successfully"
}
```

**Error Responses:**
- `400` - No token: `{"error": "token not provided"}`
- `400` - Missing fields: `{"error": "all fields required"}`
- `400` - Invalid token: `{"error": "invaild or expired token"}`
- `400` - Same as old password: `{"error": "new password can't be same as old one"}`
- `400` - Passwords don't match: `{"error": "both password should match"}`
- `500` - Server error: `{"error": "internal server error"}`

---

## Post Routes
Base path: `/posts`

### 1. Create Post
**POST** `/posts/create`

**Headers:** `Authorization: Bearer <token>`

**Request:** Form-data with file upload
- `content`: Image file
- `caption`: String (optional)

**Success Response:**
```json
{
  "message": "post created successfully",
  "post": {
    "_id": "postId",
    "caption": "My awesome post",
    "owner": "userId",
    "content": "cloudinary_url",
    "publicId": "cloudinary_public_id",
    "likeCount": 0,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `404` - User not found: `{"error": "user not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 2. Get My Posts
**GET** `/posts/me`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
[
  {
    "_id": "postId",
    "caption": "My post",
    "owner": "userId",
    "content": "cloudinary_url",
    "publicId": "cloudinary_public_id",
    "likeCount": 5,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `404` - User not found: `{"error": "user not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 3. Get User Posts
**GET** `/posts/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response:** Same as "Get My Posts"

**Error Responses:**
- `404` - User not found: `{"error": "user not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 4. Update Post
**PATCH** `/posts/update/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "caption": "Updated caption"
}
```

**Success Response:**
```json
{
  "message": "post updated successfully!",
  "post": {
    "_id": "postId",
    "caption": "Updated caption",
    "owner": "userId",
    "content": "cloudinary_url",
    "publicId": "cloudinary_public_id",
    "likeCount": 5,
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `404` - Post not found: `{"message": "post not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 5. Delete Post
**DELETE** `/posts/delete/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
{
  "message": "post deleted successfully"
}
```

**Error Responses:**
- `403` - Post not found or no permission: `{"error": "post not found"}`
- `500` - Server error: `{"error": "internal server error"}`

---

## Board Routes
Base path: `/boards`

### 1. Get My Boards
**GET** `/boards/me`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
[
  {
    "_id": "boardId",
    "name": "My Board",
    "owner": "userId",
    "posts": ["postId1", "postId2"],
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `500` - Server error: `{"error": "internal server error"}`

### 2. Get User Boards
**GET** `/boards/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response:** Same as "Get My Boards"

**Error Responses:**
- `400` - No ID: `{"error": "id not provided"}`
- `404` - User not found: `{"error": "user not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 3. Create Board
**POST** `/boards/create`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "My New Board",
  "posts": ["postId1", "postId2"]
}
```

**Success Response:**
```json
{
  "message": "new board created successfully!",
  "newBoard": {
    "_id": "boardId",
    "name": "My New Board",
    "owner": "userId",
    "posts": ["postId1", "postId2"],
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Missing name: `{"error": "name field required"}`
- `500` - Server error: `{"error": "internal server error"}`

### 4. Update Board
**PATCH** `/boards/update/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name": "Updated Board Name",
  "posts": ["newPostId1", "newPostId2"]
}
```

**Success Response:**
```json
{
  "message": "board updated successfully!",
  "post": {
    "_id": "boardId",
    "name": "Updated Board Name",
    "owner": "userId",
    "posts": ["postId1", "postId2", "newPostId1", "newPostId2"],
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `400` - No ID: `{"error": "id not provided"}`
- `404` - Board not found: `{"message": "board not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 5. Delete Board
**DELETE** `/boards/delete/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
{
  "message": "board deleted successfully"
}
```

**Error Responses:**
- `400` - No ID: `{"error": "id not provided"}`
- `400` - Board not found: `{"error": "board not found"}`
- `500` - Server error: `{"error": "internal server error"}`

---

## Like Routes
Base path: `/likes`

### 1. Get Post Likes
**GET** `/likes/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
{
  "likesCount": 5,
  "likes": [
    {
      "_id": "likeId",
      "post": "postId",
      "user": "userId",
      "createdAt": "2023-01-01T00:00:00.000Z",
      "updatedAt": "2023-01-01T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**
- `400` - No post ID: `{"error": "post id not provided"}`
- `400` - Post not found: `{"error": "post not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 2. Toggle Like
**GET** `/likes/post/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response (Like):**
```json
{
  "message": "post liked!"
}
```

**Success Response (Unlike):**
```json
{
  "message": "post disliked!"
}
```

**Error Responses:**
- `404` - No ID: `{"error": "id not provided"}`
- `404` - Post not found: `{"error": "post not found"}`
- `500` - Server error: `{"error": "internal server error"}`

---

## Comment Routes
Base path: `/comments`

### 1. Get Post Comments
**GET** `/comments/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
[
  {
    "_id": "commentId",
    "post": "postId",
    "user": "userId",
    "content": "Great post!",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

**Error Responses:**
- `404` - No ID: `{"error": "id not provided"}`
- `404` - Post not found: `{"error": "post not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 2. Add Comment
**POST** `/comments/add/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "This is my comment"
}
```

**Success Response:**
```json
{
  "message": "comment added",
  "comment": {
    "_id": "commentId",
    "post": "postId",
    "user": "userId",
    "content": "This is my comment",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `404` - No ID: `{"error": "id not provided"}`
- `404` - Missing content: `{"error": "all fields required!"}`
- `404` - Post not found: `{"error": "post not found"}`
- `500` - Server error: `{"error": "internal server error"}`

### 3. Update Comment
**PATCH** `/comments/update/:id`

**Headers:** `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "content": "Updated comment content"
}
```

**Success Response:**
```json
{
  "message": "comment updated",
  "updatedComment": {
    "_id": "commentId",
    "post": "postId",
    "user": "userId",
    "content": "Updated comment content",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `403` - No comment or access denied: `{"error": "no comment or access denied"}`
- `500` - Server error: `{"error": "internal server error"}`

### 4. Delete Comment
**DELETE** `/comments/delete/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response:**
```json
{
  "error": "comment deleted!"
}
```

**Error Responses:**
- `404` - No ID: `{"error": "id not provided"}`
- `404` - Comment not found: `{"error": "comment not found"}`
- `403` - No permission: `{"error": "no permission to delete the comment"}`
- `500` - Server error: `{"error": "internal server error"}`

---

## Follow Routes
Base path: `/follow`

### 1. Toggle Follow/Unfollow
**GET** `/follow/:id`

**Headers:** `Authorization: Bearer <token>`

**Success Response (Follow):**
```json
{
  "message": "followed!"
}
```

**Success Response (Unfollow):**
```json
{
  "message": "unfollowed!"
}
```

**Error Responses:**
- `403` - No ID: `{"error": "id not provided"}`
- `400` - Self follow: `{"error": "you can't follow yourself"}`
- `500` - Server error: `{"error": "internal server error"}`

---

## Error Responses

### Common HTTP Status Codes:
- **200** - Success
- **201** - Created successfully
- **400** - Bad request (missing parameters, validation errors)
- **403** - Forbidden (authentication issues, permission denied)
- **404** - Not found (resource doesn't exist)
- **500** - Internal server error

### Authentication Errors:
All protected routes will return `401 Unauthorized` if:
- No Authorization header is provided
- Token is invalid or expired
- Token is blacklisted (user logged out)

### Notes:
1. All timestamps are in ISO 8601 format
2. ObjectIds are MongoDB ObjectId strings
3. File uploads use multipart/form-data
4. All other requests use application/json
5. The username is automatically converted to lowercase and spaces are removed during registration
6. JWT tokens expire after 7 days
7. Password reset tokens expire after 10 minutes