type="module"
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBsud7N44s1_0tneuJzxOht61ERU5YqnG0",
    authDomain: "meet-transcription-6c80a.firebaseapp.com",
    databaseURL: "https://meet-transcription-6c80a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "meet-transcription-6c80a",
    storageBucket: "meet-transcription-6c80a.firebasestorage.app",
    messagingSenderId: "921789884249",
    appId: "1:921789884249:web:d959bec95fb58a8f6c4e48"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm_password').value;

        // Basic validation
        if (password !== confirmPassword) {
            showErrorMessage("Passwords do not match.");
            return;
        }

        // Create user in Firebase
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                // Save additional user data to the database
                database.ref('users/' + user.uid).set({
                    email: user.email
                });

                alert("Signup successful!"); 
                window.location.href = "loginas.html"; // Redirect to login page
            })
            .catch((error) => {
                const errorMessage = error.message;
                showErrorMessage(errorMessage);
            });
    });

    function showErrorMessage(message) {
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        errorContainer.innerText = message;
        signupForm.appendChild(errorContainer);

        // Remove error message after a few seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 3000);
    }
});
