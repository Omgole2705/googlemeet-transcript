// Import Firebase modules as ES modules
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js';
import { getDatabase, ref, get as getData } from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js';

// Firebase Configuration
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
const auth = getAuth(app);
const db = getDatabase(app);

// Handle Auth State Change
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is signed in:", user);
        chrome.storage.local.set({ authInfo: user });
    } else {
        console.log("No user is signed in.");
        chrome.storage.local.set({ authInfo: false });
    }
});

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "user-auth") {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const snapshot = await getData(ref(db, "/users/" + user.uid));
                    console.log(snapshot.val());
                    sendResponse({ type: "result", status: "success", data: user, userObj: snapshot.val() });
                } catch (error) {
                    console.error(error);
                    sendResponse({ type: "result", status: "error", data: false });
                }
            } else {
                sendResponse({ type: "result", status: "error", data: false });
            }
        });
        return true;
    }

    if (message.command === "auth-logout") {
        signOut(auth)
            .then(() => {
                console.log("User logged out.");
                chrome.storage.local.set({ authInfo: false });
                sendResponse({ type: "result", status: "success", data: false });
            })
            .catch((error) => {
                console.error("Logout error:", error);
                sendResponse({ type: "result", status: "error", data: false, message: error.message });
            });
        return true;
    }

    if (message.command === "auth-login") {
        signInWithEmailAndPassword(auth, message.e, message.p)
            .then(async (userCredential) => {
                const user = userCredential.user;
                try {
                    const snapshot = await getData(ref(db, "/users/" + user.uid));
                    chrome.storage.local.set({ authInfo: user });
                    sendResponse({ type: "result", status: "success", data: user, userObj: snapshot.val() });
                } catch (error) {
                    console.error("Database error:", error);
                    sendResponse({ type: "result", status: "error", data: false });
                }
            })
            .catch((error) => {
                console.error("Login error:", error);
                sendResponse({ type: "result", status: "error", data: false, message: error.message });
            });
        return true;
    }

    if (message.type === "audioData") {
        // Example: Handle and send audio data to server
        console.log("Received audio data:", message.data);
        // socket.emit("audioData", message.data); // Ensure socket is properly initialized
        sendResponse({ type: "result", status: "success", data: true });
        return true;
    }

    return false; // No async response
});
