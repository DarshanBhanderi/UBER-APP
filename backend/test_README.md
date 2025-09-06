# Tests for README.md

## Test Cases for User Registration Endpoint Documentation

### Test Case 1: Validate Email Format
- **Description**: Ensure the email field accepts only valid email formats.
- **Input**:
    ```json
    {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "invalid-email",
        "password": "securePassword123"
    }
    ```
- **Expected Output**:
  

### Test Case 1: Successful Registration
- **Description**: Ensure the endpoint successfully registers a user with valid input.
- **Input**:
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
- **Expected Output**:
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

### Test Case 4: Missing Required Fields
- **Description**: Ensure the endpoint returns an error when required fields are missing.
- **Input**:
    ```json
    {
        "fullname": {
            "firstname": "John"
        },
        "email": "",
        "password": ""
    }
    ```
- **Expected Output**:
    ```json
    {
        "errors": [
            {
                "msg": "Invalid Email",
                "param": "email",
                "location": "body"
            },
            {
                "msg": "Password must be at least 6 characters",
                "param": "password",
                "location": "body"
            }
        ]
    }
    ```

---

### Test Case 2: Optional Last Name
- **Description**: Ensure the endpoint works when the last name is not provided.
- **Input**:
    ```json
    {
        "fullname": {
            "firstname": "John"
        },
        "email": "john.doe@example.com",
        "password": "securePassword123"
    }
    ```
- **Expected Output**:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "user": {
            "_id": "64f8c0e5b9d2f8a1b2c3d4e5",
            "fullname": {
                "firstname": "John",
                "lastname": null
            },
            "email": "john.doe@example.com"
        }
    }
    ```