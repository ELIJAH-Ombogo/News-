js
// TODO: Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  //...other config values
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginSection = document.getElementById('login-section');
const postSection = document.getElementById('post-section');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const loginError = document.getElementById('login-error');
const postMsg = document.getElementById('post-msg');

loginBtn.addEventListener('click', () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  auth.signInWithEmailAndPassword(email, password).catch(err => {
      loginError.textContent = err.message.toUpperCase();
    });
});

logoutBtn.addEventListener('click', () => {
  auth.signOut();
});

auth.onAuthStateChanged(user => {
  if (user) {
    loginSection.style.display = 'none';
    postSection.style.display = 'block';
    loginError.textContent = '';
  } else {
    loginSection.style.display = 'block';
    postSection.style.display = 'none';
    postMsg.textContent = '';
  }
});
