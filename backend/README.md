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