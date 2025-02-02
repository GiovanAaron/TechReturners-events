# Backend API Documentation

This document provides an overview of the backend API endpoints, their functionalities, and error handling. The API is designed to manage users, events, and event attendance with role-based access control.

---

## **Authentication**

### **POST /api/users/login**
Authenticates a user and returns a JWT token.

#### **Request Body**
- `email` (string): User's email.
- `password` (string): User's password.

#### **Responses**
- **200 OK**: Returns a JWT token.
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **400 Bad Request**: Missing email or password.
  ```json
  {
    "error": "Email and password are required"
  }
  ```
- **401 Unauthorized**: Invalid password.
  ```json
  {
    "error": "Invalid password"
  }
  ```
- **404 Not Found**: User not found.
  ```json
  {
    "error": "User not found"
  }
  ```

---

## **Users**

### **POST /api/users**
Creates a new user.

#### **Request Body**
- `username` (string): User's username.
- `first_name` (string): User's first name.
- `last_name` (string): User's last name.
- `email` (string): User's email.
- `age` (number): User's age.
- `gender` (string): User's gender.
- `access_type` (string): User's access type (e.g., "Admin", "User").
- `avatar` (string): URL to the user's avatar.
- `password` (string): User's password.

#### **Responses**
- **201 Created**: Returns the newly created user.
  ```json
  {
    "newUser": {
      "id": 1,
      "username": "febiBuffay",
      "first_name": "Febi",
      "last_name": "Buffay",
      "email": "friends@gmail.com",
      "age": 28,
      "gender": "Female",
      "access_type": "Admin",
      "avatar": "febi_avatar.img",
      "created_at": "2023-10-01T12:00:00Z",
      "updated_at": "2023-10-01T12:00:00Z",
      "password_hash": "hashed_password"
    }
  }
  ```
- **400 Bad Request**: Invalid input (e.g., invalid gender, age, or access type).
  ```json
  {
    "error": "PSQL error(23514) found in constraint 'users_gender_check'"
  }
  ```
- **400 Bad Request**: Email already in use.
  ```json
  {
    "error": "Email is already in use"
  }
  ```

### **GET /api/users**
Returns a list of all users. **Admin access only.**

#### **Headers**
- `Authorization`: Bearer token.

#### **Responses**
- **200 OK**: Returns an array of users.
  ```json
  {
    "users": [
      {
        "id": 1,
        "username": "febiBuffay",
        "first_name": "Febi",
        "last_name": "Buffay",
        "email": "friends@gmail.com",
        "age": 28,
        "gender": "Female",
        "access_type": "Admin",
        "avatar": "febi_avatar.img",
        "created_at": "2023-10-01T12:00:00Z",
        "updated_at": "2023-10-01T12:00:00Z"
      }
    ]
  }
  ```
- **401 Unauthorized**: Missing or invalid token.
  ```json
  {
    "error": "Token missing"
  }
  ```

### **GET /api/users/:id**
Returns details of a specific user.

#### **Headers**
- `Authorization`: Bearer token.

#### **Responses**
- **200 OK**: Returns the user details.
  ```json
  {
    "user": {
      "id": 1,
      "username": "febiBuffay",
      "first_name": "Febi",
      "last_name": "Buffay",
      "email": "friends@gmail.com",
      "age": 28,
      "gender": "Female",
      "access_type": "Admin",
      "avatar": "febi_avatar.img",
      "created_at": "2023-10-01T12:00:00Z",
      "updated_at": "2023-10-01T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**: Invalid user ID.
  ```json
  {
    "error": "Bad Request"
  }
  ```
- **404 Not Found**: User not found.
  ```json
  {
    "error": "User not found"
  }
  ```

### **PATCH /api/users/:id**
Updates user details. **Users can only update their own details.**

#### **Headers**
- `Authorization`: Bearer token.

#### **Request Body**
- Fields to update (e.g., `first_name`, `last_name`, `avatar`).

#### **Responses**
- **200 OK**: Returns the updated user.
  ```json
  {
    "updatedUser": {
      "id": 1,
      "username": "febiBuffay",
      "first_name": "Dereck",
      "last_name": "Buffay",
      "email": "friends@gmail.com",
      "age": 28,
      "gender": "Female",
      "access_type": "Admin",
      "avatar": "new_updated_avatar.png",
      "created_at": "2023-10-01T12:00:00Z",
      "updated_at": "2023-10-01T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**: Invalid input (e.g., invalid column name).
  ```json
  {
    "error": "PSQL error: 42703"
  }
  ```
- **500 Internal Server Error**: Invalid value for column.
  ```json
  {
    "error": "PSQL error: 23514"
  }
  ```

### **DELETE /api/users/:id**
Deletes a user. **Users can only delete their own account.**

#### **Headers**
- `Authorization`: Bearer token.

#### **Responses**
- **200 OK**: Returns the deleted user.
  ```json
  {
    "erasedUser": {
      "id": 1,
      "username": "febiBuffay",
      "first_name": "Febi",
      "last_name": "Buffay",
      "email": "friends@gmail.com",
      "age": 28,
      "gender": "Female",
      "access_type": "Admin",
      "avatar": "febi_avatar.img",
      "created_at": "2023-10-01T12:00:00Z",
      "updated_at": "2023-10-01T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**: Invalid user ID.
  ```json
  {
    "error": "Bad Request"
  }
  ```
- **404 Not Found**: User not found.
  ```json
  {
    "error": "User not found"
  }
  ```

---

## **Events**

### **GET /api/events**
Returns a list of all events.

#### **Responses**
- **200 OK**: Returns an array of events.
  ```json
  {
    "events": [
      {
        "id": 1,
        "owner_id": 1,
        "title": "Test Event",
        "description": "Test Description",
        "category": "Job Fair",
        "start_datetime": "2023-06-01T10:00:00Z",
        "end_datetime": "2023-06-01T11:00:00Z",
        "location_type": "In-Person",
        "price": 10.99,
        "photo_1_url": "https://example.com/test-image.jpg",
        "photo_2_url": "https://example.com/test-image2.jpg",
        "photo_3_url": "https://example.com/test-image3.jpg",
        "region": "England",
        "city": "London",
        "address": "Test Address",
        "tickets_remaining": 100,
        "capacity": 100
      }
    ]
  }
  ```

### **GET /api/events/:id**
Returns details of a specific event.

#### **Responses**
- **200 OK**: Returns the event details.
  ```json
  {
    "event": {
      "id": 1,
      "owner_id": 1,
      "title": "Test Event",
      "description": "Test Description",
      "category": "Job Fair",
      "start_datetime": "2023-06-01T10:00:00Z",
      "end_datetime": "2023-06-01T11:00:00Z",
      "location_type": "In-Person",
      "price": 10.99,
      "photo_1_url": "https://example.com/test-image.jpg",
      "photo_2_url": "https://example.com/test-image2.jpg",
      "photo_3_url": "https://example.com/test-image3.jpg",
      "region": "England",
      "city": "London",
      "address": "Test Address",
      "tickets_remaining": 100,
      "capacity": 100
    }
  }
  ```
- **400 Bad Request**: Invalid event ID.
  ```json
  {
    "error": "PSQL error(22P02)"
  }
  ```
- **404 Not Found**: Event not found.
  ```json
  {
    "error": "Event not found"
  }
  ```

### **POST /api/events**
Creates a new event. **Admin and Moderator access only.**

#### **Headers**
- `Authorization`: Bearer token.

#### **Request Body**
- `owner_id` (number): ID of the event owner.
- `title` (string): Event title.
- `description` (string): Event description.
- `category` (string): Event category.
- `start_datetime` (string): Event start date and time.
- `end_datetime` (string): Event end date and time.
- `location_type` (string): Event location type (e.g., "In-Person", "Remote").
- `price` (number): Event price.
- `photo_1_url` (string): URL to the event's primary photo.
- `photo_2_url` (string): URL to the event's secondary photo.
- `photo_3_url` (string): URL to the event's tertiary photo.
- `region` (string): Event region.
- `city` (string): Event city.
- `address` (string): Event address.
- `tickets_remaining` (number): Number of tickets remaining.
- `capacity` (number): Event capacity.

#### **Responses**
- **201 Created**: Returns the newly created event.
  ```json
  {
    "newEvent": {
      "id": 1,
      "owner_id": 1,
      "title": "Test Event",
      "description": "Test Description",
      "category": "Job Fair",
      "start_datetime": "2023-06-01T10:00:00Z",
      "end_datetime": "2023-06-01T11:00:00Z",
      "location_type": "In-Person",
      "price": 10.99,
      "photo_1_url": "https://example.com/test-image.jpg",
      "photo_2_url": "https://example.com/test-image2.jpg",
      "photo_3_url": "https://example.com/test-image3.jpg",
      "region": "England",
      "city": "London",
      "address": "Test Address",
      "tickets_remaining": 100,
      "capacity": 100
    }
  }
  ```
- **400 Bad Request**: Invalid input (e.g., missing title, invalid category).
  ```json
  {
    "error": "PSQL error(23502) found in 'title' column"
  }
  ```
- **403 Forbidden**: User does not have permission to create an event.
  ```json
  {
    "error": "Access denied"
  }
  ```

### **PATCH /api/events/:id**
Updates an event. **Admin and Moderator access only.**

#### **Headers**
- `Authorization`: Bearer token.

#### **Request Body**
- Fields to update (e.g., `title`, `description`, `end_datetime`).

#### **Responses**
- **200 OK**: Returns the updated event.
  ```json
  {
    "updatedEvent": {
      "id": 1,
      "owner_id": 1,
      "title": "Updated Event Title",
      "description": "Updated Description",
      "category": "Job Fair",
      "start_datetime": "2023-06-01T10:00:00Z",
      "end_datetime": "2023-06-01T11:00:00Z",
      "location_type": "In-Person",
      "price": 10.99,
      "photo_1_url": "https://example.com/test-image.jpg",
      "photo_2_url": "https://example.com/test-image2.jpg",
      "photo_3_url": "https://example.com/test-image3.jpg",
      "region": "England",
      "city": "London",
      "address": "Test Address",
      "tickets_remaining": 100,
      "capacity": 100
    }
  }
  ```
- **400 Bad Request**: Invalid input (e.g., invalid category).
  ```json
  {
    "error": "PSQL error(23514) found in constraint 'event_category_check'"
  }
  ```
- **404 Not Found**: Event not found.
  ```json
  {
    "error": "Event not found"
  }
  ```

### **DELETE /api/events/:id**
Deletes an event. **Admin and Moderator access only.**

#### **Headers**
- `Authorization`: Bearer token.

#### **Responses**
- **200 OK**: Event deleted successfully.
  ```json
  {}
  ```
- **400 Bad Request**: Invalid event ID.
  ```json
  {
    "error": "Bad Request: id must be a number"
  }
  ```
- **404 Not Found**: Event not found.
  ```json
  {
    "error": "Event not found"
  }
  ```

---

## **Attendance**

### **GET /api/events/:eventId/attendees**
Returns a list of attendees for a specific event. **Admin access only.**

#### **Headers**
- `Authorization`: Bearer token.

#### **Responses**
- **200 OK**: Returns an array of attendees.
  ```json
  {
    "attendees": [
      {
        "event_id": 1,
        "user_id": 1,
        "status": "Interested",
        "registered_at": "2023-10-01T12:00:00Z"
      }
    ]
  }
  ```
- **400 Bad Request**: Invalid event ID.
  ```json
  {
    "error": "Bad Request: id must be a number"
  }
  ```
- **404 Not Found**: Event not found.
  ```json
  {
    "error": "Bad Request: Event not found"
  }
  ```

### **POST /api/events/:id/attendances**
Creates a new attendance record.

#### **Headers**
- `Authorization`: Bearer token.

#### **Request Body**
- `status` (string): Attendance status (e.g., "Interested", "Registered").

#### **Responses**
- **201 Created**: Returns the new attendance record.
  ```json
  {
    "newAttendee": {
      "event_id": 1,
      "user_id": 1,
      "status": "Interested",
      "registered_at": "2023-10-01T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**: Invalid status or duplicate attendance.
  ```json
  {
    "error": "User has already registered for this event"
  }
  ```
- **404 Not Found**: Event not found.
  ```json
  {
    "error": "Bad Request: Event not found"
  }
  ```

### **PATCH /api/events/:id/attendances**
Updates an attendance record.

#### **Headers**
- `Authorization`: Bearer token.

#### **Request Body**
- `status` (string): New attendance status.

#### **Responses**
- **200 OK**: Returns the updated attendance record.
  ```json
  {
    "updatedAttendance": {
      "event_id": 1,
      "user_id": 1,
      "status": "Registered",
      "registered_at": "2023-10-01T12:00:00Z"
    }
  }
  ```
- **400 Bad Request**: Invalid status.
  ```json
  {
    "error": "Bad Request: status must be 'Interested', 'Registered' or 'Cancelled'"
  }
  ```
- **404 Not Found**: Attendance record not found.
  ```json
  {
    "error": "No record of Attendance between the user and event provided"
  }
  ```

### **DELETE /api/events/:id/attendances**
Deletes an attendance record.

#### **Headers**
- `Authorization`: Bearer token.

#### **Request Body**
- `user_id` (number): ID of the user whose attendance is to be deleted.

#### **Responses**
- **200 OK**: Attendance deleted successfully.
  ```json
  {
    "msg": "Attendance Deleted"
  }
  ```
- **400 Bad Request**: Invalid input (e.g., missing `user_id`).
  ```json
  {
    "error": "Bad Request: user_id must be provided"
  }
  ```
- **401 Unauthorized**: User not authorized to delete the attendance.
  ```json
  {
    "error": "Unauthorized: You are not authorized to delete this attendance"
  }
  ```

---

## **User Attendances**

### **GET /api/users/:id/attendances**
Returns a list of attendance records for a specific user.

#### **Headers**
- `Authorization`: Bearer token.

#### **Responses**
- **200 OK**: Returns an array of attendance records.
  ```json
  {
    "attendances": [
      {
        "event_id": 1,
        "user_id": 1,
        "status": "Interested",
        "registered_at": "2023-10-01T12:00:00Z"
      }
    ]
  }