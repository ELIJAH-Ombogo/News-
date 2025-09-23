
// Firebase config - replace with your details
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  // add other needed config values
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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

document.getElementById('post-btn').addEventListener('click', () => {
  const title = document.getElementById('news-title').value.trim();
  const content = document.getElementById('news-content').value.trim();
  const video = document.getElementById('news-video').value.trim();
  const photo = document.getElementById('news-photo').value.trim();

  if (!title ||!content) {
    postMsg.style.color = 'red';
    postMsg.textContent = 'TITLE AND CONTENT ARE REQUIRED';
    return;
  }

  db.collection('news').add({
    title,
    content,
    videoUrl: video || null,
    photoUrl: photo || null,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  }).then(() => {
    postMsg.style.color = 'green';
    postMsg.textContent = 'NEWS POSTED SUCCESSFULLY!';
    document.getElementById('news-title').value = '';
    document.getElementById('news-content').value = '';
    document.getElementById('news-video').value = '';
    document.getElementById('news-photo').value = '';
  }).catch(error => {
    postMsg.style.color = 'red';
    postMsg.textContent = error.message.toUpperCase();
  });
});

