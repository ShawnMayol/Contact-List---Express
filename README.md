# Contact List with Express

This project is a backend service for managing a contact list. It allows for **adding**, **updating**, **displaying**, and **deleting** contacts, utilizing a MySQL database. The backend is built using **Express**, and the database is used to store contact details.

### Features

-   **Add**: Allows users to add a new contact with `first name`, `last name`, `email address`, and `contact number`. The `is_deleted` field is set to `0` by default when a contact is added.
-   **Update**: Enables users to update contact details (first name, last name, email address, and contact number).
-   **Display**: Displays a list of all contacts in JSON format, including their `id`, `first name`, `last name`, `email address`, `contact number`, and `is_deleted` status.
-   **Delete**: Marks a contact as deleted by setting the `is_deleted` field to `1` instead of deleting the record from the database.

---

### Prerequisites

-   **Node.js** (v14 or later)
-   **MySQL**

---

### Installation Instructions

#### 1. Clone the repository

Clone this project to your local machine:

```bash
git clone <repository_url>
```

#### 2. Install dependencies

Navigate to the project folder and install the required Node.js dependencies:

```bash
npm install
```

#### 3. Set up MySQL database

Import the database from `config/db/contactListExpress.sql` or create a MySQL database named `contactListExpress` and a table named `contact_list` with the following schema:

```sql
CREATE DATABASE contactListExpress;

USE contactListExpress;

CREATE TABLE contact_list (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastName VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    emailAddress VARCHAR(255) NOT NULL,
    contactNumber VARCHAR(15) NOT NULL,
    isDeleted TINYINT DEFAULT 0
);
```

#### 4. Start the server

Run the following command to start the server:

```bash
npm start
```

The server will be running on `http://localhost:3000`.

---

### API Endpoints

-   **GET /contacts**: Retrieve a list of all contacts in JSON format.
-   **POST /contacts**: Add a new contact. The request body must include `firstName`, `lastName`, `emailAddress`, and `contactNumber`.
-   **PUT /contacts/:id**: Update a contact by ID. The request body must include `firstName`, `lastName`, `emailAddress`, and `contactNumber`.
-   **DELETE /contacts/:id**: Mark a contact as deleted by ID by setting the `isDeleted` field to `1`.

---

### Example Requests and Responses

#### Add a Contact (POST)

Request:

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "emailAddress": "john.doe@example.com",
    "contactNumber": "123-456-7890"
}
```

Response:

```json
{
    "message": "Contact added successfully!",
    "contactId": 1
}
```

#### Update a Contact (PUT)

Request:

```json
{
    "firstName": "John",
    "lastName": "Smith",
    "emailAddress": "john.smith@example.com",
    "contactNumber": "987-654-3210"
}
```

Response:

```json
{
    "message": "Contact updated successfully!"
}
```

#### Delete a Contact (DELETE)

Request:

```bash
DELETE http://localhost:3000/contacts/1
```

Response:

```json
{
    "message": "Contact deleted successfully!"
}
```

#### Display a Single Contact (GET)

Request:

```bash
GET http://localhost:3000/contacts/1
```

Response:

```json
{
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "emailAddress": "john.doe@example.com",
    "contactNumber": "123-456-7890",
    "isDeleted": 0
}
```
