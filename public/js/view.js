function fetchContact() {
    const params = new URLSearchParams(window.location.search);
    const contactId = params.get("id");

    if (!contactId) {
        document.getElementById("contact-details").innerHTML =
            "Invalid Contact ID.";
        return;
    }

    fetch(`http://localhost:3000/contacts/${contactId}`)
        .then((response) => response.json())
        .then((contact) => {
            if (contact) {
                document.getElementById("contact-details").innerHTML = `
                    <table style="margin: 0 auto;">
                        <tr><th>ID</th><td>${contact.id}</td></tr>
                        <tr><th>First Name</th><td>${
                            contact.firstName
                        }</td></tr>
                        <tr><th>Last Name</th><td>${contact.lastName}</td></tr>
                        <tr><th>Email</th><td>${contact.emailAddress}</td></tr>
                        <tr><th>Contact Number</th><td>${
                            contact.contactNumber
                        }</td></tr>
                        <tr><th>Deleted</th><td>${
                            contact.isDeleted ? "Yes" : "No"
                        }</td></tr>
                    </table>
                `;
            } else {
                document.getElementById("contact-details").innerHTML =
                    "Contact not found.";
            }
        })
        .catch((err) => {
            console.error("Error fetching contact:", err);
            document.getElementById("contact-details").innerHTML =
                "An error occurred while fetching the contact.";
        });
}

function goBack() {
    window.history.back();
}

fetchContact();
