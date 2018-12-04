define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/user",
    "title": "Create a new user account.",
    "name": "CreateUserAccount",
    "version": "1.0.0",
    "group": "User",
    "permission": [
      {
        "name": "Un-authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username may be a unique email_id or mobile number.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Use uppercase, lowercase, numeric, special character &amp; at least 6 characters long password.</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n \"name\": \"James Bond\",\n \"username\": \"jamesbond@mailinator.com\",\n \"password\": \"Q@q12345\",\n \"confirm_password\": \"Q@q12345\"\n}",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Sucess message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTPS 200 OK\nIf username is email id:\n{\n  \"message\": \"Your account activation is pending. Please check your inbox or spam folder for activation email.\"\n}\nIf username is mobile number :\n{\n  \"message\": \"Your account activation is pending. Please check your number for an otp to activate account.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user_routes.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/api/v1/user/:user_id",
    "title": "Delete a user account.",
    "name": "DeleteUserAccount",
    "version": "1.0.0",
    "group": "User",
    "permission": [
      {
        "name": "Un-authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>User name.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username can be email_id or mobile number.</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirm_password",
            "description": "<p>Confirm password</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n \"name\": \"James Bond\",\n \"username\": \"jamesbond@mailinator.com\",\n \"password\": \"Q@q12345\",\n \"confirm_password\": \"Q@q12345\"\n}",
        "type": "js"
      }
    ],
    "success": {
      "examples": [
        {
          "title": "Success response:",
          "content": "HTTPS 201 OK\n{\n  \"message\": \"Account deleted successfully.\",\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user_routes.ts",
    "groupTitle": "User"
  }
] });
