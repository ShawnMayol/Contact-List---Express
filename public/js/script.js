// Fetch contact data from the API
fetch("http://localhost:3000/contacts")
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.querySelector("#contact-table tbody");
        data.forEach((contact) => {
            const row = document.createElement("tr");
            row.innerHTML = `
<td>${contact.id}</td>
<td>${contact.firstName} ${contact.lastName}</td>
<td>${contact.emailAddress}</td>
<td>${contact.contactNumber}</td>
<td class="actions">
<button class="edit" onclick="editContact(${contact.id})">Edit</button>
<button class="delete" onclick="deleteContact(${contact.id})">Delete</button>
<button class="view" onclick="viewContact(${contact.id})">View</button>
</td>
`;
            tableBody.appendChild(row);
        });
    })
    .catch((err) => console.error("Error fetching contacts:", err));

// Function to delete a contact
function deleteContact(contactId) {
    fetch(`http://localhost:3000/contacts/${contactId}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            alert(data.message);
            location.reload(); // Reload page to update the table
        })
        .catch((err) => console.error("Error deleting contact:", err));
}

// Function to edit a contact
function editContact(contactId) {
    // Fetch contact details from the API
    fetch(`http://localhost:3000/contacts/${contactId}`)
        .then((response) => response.json())
        .then((contact) => {
            // Prompt user for new contact data
            const newFirstName = prompt("Edit First Name:", contact.firstName);
            const newLastName = prompt("Edit Last Name:", contact.lastName);
            const newEmail = prompt("Edit Email:", contact.emailAddress);
            const newContactNumber = prompt(
                "Edit Contact Number:",
                contact.contactNumber
            );

            // If all fields are filled, send the updated contact data
            if (newFirstName && newLastName && newEmail && newContactNumber) {
                const updatedContact = {
                    firstName: newFirstName,
                    lastName: newLastName,
                    emailAddress: newEmail,
                    contactNumber: newContactNumber,
                };

                // Send PUT request to update the contact
                fetch(`http://localhost:3000/contacts/${contactId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedContact),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        alert(data.message); // Show success message
                        location.reload(); // Reload page to update the table
                    })
                    .catch((err) =>
                        console.error("Error updating contact:", err)
                    );
            } else {
                alert("All fields must be filled in!");
            }
        })
        .catch((err) => console.error("Error fetching contact details:", err));
}

// Function to add a new contact
function addContact() {
    const firstName = prompt("Enter First Name:");
    const lastName = prompt("Enter Last Name:");
    const emailAddress = prompt("Enter Email:");
    const contactNumber = prompt("Enter Contact Number:");

    if (firstName && lastName && emailAddress && contactNumber) {
        const newContact = {
            firstName,
            lastName,
            emailAddress,
            contactNumber,
        };

        fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newContact),
        })
            .then((response) => response.json())
            .then((data) => {
                alert(data.message);
                location.reload(); // Reload page to update the table
            })
            .catch((err) => console.error("Error adding contact:", err));
    } else {
        alert("All fields must be filled in!");
    }
}

function viewContact(contactId) {
    window.location.href = `/html/view.html?id=${contactId}`;
}
