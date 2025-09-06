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
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
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
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
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
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
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
  "email": "john.doe@example.com",
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
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "john.doe@example.com"
      }
    }
    ```



## Example cURL Request

```bash
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "securePassword123"
  }'
```

---

## Notes

- Passwords are compared using `bcrypt` to ensure security.
- A JWT token is generated and returned upon successful login.
- Ensure the `JWT_SECRET` environment variable is set for token generation.