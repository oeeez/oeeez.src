# Oeeez.online API Documentation

## Authentication

### Register a new user

```
POST /api/auth/register
```

**Request Body:**

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

### Login

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "username": "string",
    "email": "string"
  }
}
```

## Users

### Get user profile

```
GET /api/users/profile
```

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "id": "string",
  "username": "string",
  "email": "string"
}
```

... (continue with other API endpoints)
