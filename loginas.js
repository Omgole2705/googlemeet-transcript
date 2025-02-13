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
  const app = initializeApp(firebaseConfig);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const googleLoginButton = document.querySelector('.google-btn');

    // Login Form submission event
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission

        // Get form values
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Firebase email/password authentication
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Successful login
                alert('Login successful!');
                window.location.href = 'adminlogin.html'; // Redirect to admin login page
            })
            .catch((error) => {
                const errorMessage = error.message;
                showErrorMessage(errorMessage);
            });
    });

    // Google Sign-In button event
    googleLoginButton.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default button behavior

        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then((result) => {
                // Successful login
                alert('Login successful with Google!');
                window.location.href = 'login.html'; // Redirect to admin login page
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
        loginForm.appendChild(errorContainer);

        // Optional: Remove the error message after a few seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 3000);
    }
});
