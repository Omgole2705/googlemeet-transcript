document.addEventListener("DOMContentLoaded", () => {
    
    const saveButton = document.getElementById("save-btn"); // Referencing the existing button in HTML

    // Simulated login status (false = not logged in, true = logged in)
    let isLoggedIn = false;

    // Update the content when navigation buttons are clicked
    document.getElementById("home-btn").addEventListener("click", () => {
        window.location.href = "homepage.html";
    });

    document.getElementById("files-btn").addEventListener("click", () => {
        window.location.href = " files.html";
    });

    document.getElementById("about-btn").addEventListener("click", () => {
        window.location.href = "about.html";
    });

    document.getElementById("login-btn").addEventListener("click", () => {
        if (isLoggedIn) {
            alert("You are already logged in!");
        } else {
            redirectToLoginPage();
        }
    });

    // Save button functionality
    saveButton.addEventListener("click", () => {
        if (isLoggedIn) {
            saveFile();
        } else {
            alert("login First ");
            redirectToLoginPage();
        }
    });

    // Function to simulate file saving
    function saveFile() {
        alert("File saved successfully!");
        // Add actual file-saving logic here if needed
    }

    // Function to redirect to login page
    function redirectToLoginPage() {
        window.location.href = "loginas.html"; // Redirect to login page
    }
});
