# User Registration Endpoint Documentation

## Endpoint

`POST /user/ragister`

This endpoint is used to register a new user. Upon successful registration, it returns a JWT token and the created user object.

---

## Request Body

The request body must be sent as `application/json` and include the following fields:

```json
{
  "fullname": {
    "firstname": "string, required, minimum 3 characters",
    "lastname": "string, optional, minimum 3 characters"
  },
  "email": "string, required, valid email format",
  "password": "string, required, minimum 6 characters"
}
```

### Example Request Body

```json
{
  "fullname": {
    "firstname": "test_fristname",
    "lastname": "test_lastname"
  },
  "email": "test@example.com",
  "password": "securePassword123"
}
```

---

## Validation Rules

- `fullname.firstname`: Required, must be a string with at least 3 characters.
- `fullname.lastname`: Optional, must be a string with at least 3 characters (if provided).
- `email`: Required, must be a valid email address.
- `password`: Required, must be a string with at least 6 characters.

---

## Responses

### Success

- **201 Created**
  - Registration successful.
  - Example response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "64f8c0e5b9d2f8a1b2c3d4e5",
        "fullname": {
          "firstname": "John",
          "lastname": "test_lastname"
        },
        "email": "test@example.com"
      }
    }
    ```

---

## Example cURL Request

```bash
curl -X POST http://localhost:3000/user/ragister \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "test_fristname",
      "lastname": ""
    },
    "email": "test@example.com",
    "password": "securePassword123"
  }'
```

---

## Notes

- Passwords are hashed using `bcrypt` before being stored in the database.
- A JWT token is generated and returned upon successful registration.
- Ensure the `JWT_SECRET` environment variable is set for token generation.



# User Login Endpoint Documentation

## Endpoint

`POST /user/login`

This endpoint is used to authenticate a user. Upon successful login, it returns a JWT token and the user object.

---

## Request Body

The request body must be sent as `application/json` and include the following fields:

```json
{
  "email": "string, required, valid email format",
  "password": "string, required, minimum 6 characters"
}
```

### Example Request Body

```json
{
  "email": "test@example.com",
  "password": "securePassword123"
}
```

---

## Validation Rules

- `email`: Required, must be a valid email address.
- `password`: Required, must be a string with at least 6 characters.

---

## Responses

### Success

- **200 OK**
  - Login successful.
  - Example response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "_id": "64f8c0e5b9d2f8a1b2c3d4e5",
        "fullname": {
          "firstname": "test_firstname",
          "lastname": "test_lastname"
        },
        "email": "test@example.com"
      }
    }
    ```



## Example cURL Request

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "securePassword123"
  }'
```

---

## Notes

- Passwords are compared using `bcrypt` to ensure security.
- A JWT token is generated and returned upon successful login.
- Ensure the `JWT_SECRET` environment variable is set for token generation.

---

# User Profile Endpoint Documentation

## Endpoint

`GET /user/profile`

This endpoint is used to retrieve the profile of the currently authenticated user.

---

## Headers

The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Example Header

```json
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

---

## Responses

### Success

- **200 OK**
  - Returns the authenticated user's profile.
  - Example response:
    ```json
    {
      "_id": "64f8c0e5b9d2f8a1b2c3d4e5",
      "fullname": {
        "firstname": "test_firstname",
        "lastname": "test_lastname"
      },
      "email": "test@example.com"
    }
    ```

### Errors

- **401 Unauthorized**
  - Token is missing, invalid, or blacklisted.
  - Example response:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

## Example cURL Request

```bash
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## Notes

- The endpoint requires the user to be authenticated.
- Ensure the `JWT_SECRET` environment variable is set for token verification.

---

# User Logout Endpoint Documentation

## Endpoint

`GET /user/logout`

This endpoint is used to log out the currently authenticated user by blacklisting their JWT token.

---

## Headers

The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Example Header

```json
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

---

## Responses

### Success

- **200 OK**
  - Logout successful.
  - Example response:
    ```json
    {
      "message": "Logged out"
    }
    ```

### Errors

- **401 Unauthorized**
  - Token is missing, invalid, or blacklisted.
  - Example response:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

---

## Example cURL Request

```bash
curl -X GET http://localhost:3000/user/logout \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## Notes

- The endpoint requires the user to be authenticated.
- The token is added to a blacklist to prevent further use.
- Ensure the `JWT_SECRET` environment variable is set for token verification.

---

# Captain Routes Documentation

---

## 1. Register Captain

### Endpoint

`POST /captain/register`

This endpoint is used to register a new captain. Upon successful registration, it returns the created captain object.

---

### Request Body

The request body must be sent as `application/json` and include the following fields:

```json
{
  "fullname": {
    "firstname": "string, required, minimum 3 characters",
    "lastname": "string, required, minimum 3 characters"
  },
  "email": "string, required, valid email format",
  "password": "string, required, minimum 6 characters",
  "vehicle": {
    "color": "string, required, minimum 3 characters",
    "plate": "string, required, minimum 3 characters",
    "capacity": "integer, required, minimum 1",
    "vehicleType": "string, required, one of ['car', 'motorcycle', 'auto']"
  }
}
```

### Example Request Body

```json
{
  "fullname": {
    "firstname": "test_captain_firstname",
    "lastname": "test_captain_lastname"
  },
  "email": "test_email1@gmail.com",
  "password": "test_cpatin",
  "vehicle": {
    "color": "red",
    "plate": "MP 04 XY 6204",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

---

### Validation Rules

- `fullname.firstname`: Required, must be a string with at least 3 characters.
- `fullname.lastname`: Required, must be a string with at least 3 characters.
- `email`: Required, must be a valid email address.
- `password`: Required, must be a string with at least 6 characters.
- `vehicle.color`: Required, must be a string with at least 3 characters.
- `vehicle.plate`: Required, must be a string with at least 3 characters.
- `vehicle.capacity`: Required, must be an integer with a minimum value of 1.
- `vehicle.vehicleType`: Required, must be one of `['car', 'motorcycle', 'auto']`.

---

### Responses

#### Success

- **201 Created**
  - Registration successful.
  - Example response:
    ```json
    {
      "_id": "64f8c0e5b9d2f8a1b2c3d4e6",
      "fullname": {
        "firstname": "test_captain_firstname",
        "lastname": "test_captain_lastname"
      },
      "email": "test_email1@gmail.com",
      "vehicle": {
        "color": "red",
        "plate": "MP 04 XY 6204",
        "capacity": 3,
        "vehicleType": "car"
      }
    }
    ```



### Example cURL Request

```bash
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": {
      "firstname": "test_captain_firstname",
      "lastname": "test_captain_lastname"
    },
    "email": "test_email1@gmail.com",
    "password": "test_cpatin",
    "vehicle": {
      "color": "red",
      "plate": "MP 04 XY 6204",
      "capacity": 3,
      "vehicleType": "car"
    }
  }'
```

---

## Notes

- Ensure the `JWT_SECRET` environment variable is set for token generation.
- Passwords are hashed using `bcrypt` before being stored in the database.
- The `fullname.firstname` and `fullname.lastname` fields are required for proper captain registration.

---

# Captain Login Endpoint Documentation

---

## Endpoint

`POST /captain/login`

This endpoint is used to authenticate a captain. Upon successful login, it returns a JWT token and the captain object.

---

### Request Body

The request body must be sent as `application/json` and include the following fields:

```json
{
  "email": "string, required, valid email format",         // Captain's email address
  "password": "string, required, minimum 6 characters"     // Captain's password
}
```

### Example Request Body

```json
{
  "email": "test_email1@gmail.com",
  "password": "test_cpatin"
}
```

---

### Validation Rules

- `email`: Required, must be a valid email address.
- `password`: Required, must be a string with at least 6 characters.

---

### Responses

#### Success

- **200 OK**
  - Login successful.
  - Example response:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT token for authentication
      "captain": {
        "_id": "64f8c0e5b9d2f8a1b2c3d4e6",               // Unique ID of the captain
        "fullname": {
          "firstname": "test_captain_firstname",         // Captain's first name
          "lastname": "test_captain_lastname"            // Captain's last name
        },
        "email": "test_email1@gmail.com",                // Captain's email address
        "vehicle": {
          "color": "red",                                // Vehicle color
          "plate": "MP 04 XY 6204",                      // Vehicle plate number
          "capacity": 3,                                 // Vehicle capacity
          "vehicleType": "car"                           // Vehicle type
        }
      }
    }
    ```



---

### Example cURL Request

```bash
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test_email1@gmail.com",
    "password": "test_cpatin"
  }'
```

---

## Notes

- Passwords are compared using `bcrypt` to ensure security.
- A JWT token is generated and returned upon successful login.
- Ensure the `JWT_SECRET` environment variable is set for token generation.
- The token must be included in subsequent requests to access protected routes.

---

# Captain Profile Endpoint Documentation

---

## Endpoint

`GET /captain/profile`

This endpoint is used to retrieve the profile of the currently authenticated captain.

---

### Headers

The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Example Header

```json
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

---

### Responses

#### Success

- **200 OK**
  - Returns the authenticated captain's profile.
  - Example response:
    ```json
    {
      "captain": {
        "_id": "64f8c0e5b9d2f8a1b2c3d4e6",               // Unique ID of the captain
        "fullname": {
          "firstname": "test_captain_firstname",         // Captain's first name
          "lastname": "test_captain_lastname"            // Captain's last name
        },
        "email": "test_email1@gmail.com",                // Captain's email address
        "vehicle": {
          "color": "red",                                // Vehicle color
          "plate": "MP 04 XY 6204",                      // Vehicle plate number
          "capacity": 3,                                 // Vehicle capacity
          "vehicleType": "car"                           // Vehicle type
        }
      }
    }
    ```



---

### Example cURL Request

```bash
curl -X GET http://localhost:3000/captain/profile \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## Notes

- The endpoint requires the captain to be authenticated.
- Ensure the `JWT_SECRET` environment variable is set for token verification.

---

# Captain Logout Endpoint Documentation

---

## Endpoint

`GET /captain/logout`

This endpoint is used to log out the currently authenticated captain by blacklisting their JWT token.

---

### Headers

The request must include a valid JWT token in the `Authorization` header or as a cookie.

### Example Header

```json
{
  "Authorization": "Bearer <your-jwt-token>"
}
```

---

### Responses

#### Success

- **200 OK**
  - Logout successful.
  - Example response:
    ```json
    {
      "message": "Logout successfully"
    }
    ```


---

### Example cURL Request

```bash
curl -X GET http://localhost:3000/captain/logout \
  -H "Authorization: Bearer <your-jwt-token>"
```

---

## Notes

- The endpoint requires the captain to be authenticated.
- The token is added to a blacklist to prevent further use.
- Ensure the `JWT_SECRET` environment variable is set for token verification.

