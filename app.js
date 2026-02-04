window.onload = function () {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAM80Iw2hbag0QO78hQ4tQ2ubsCWEl3m8g",
    authDomain: "week-7496d.firebaseapp.com",
    projectId: "week-7496d",
    storageBucket: "week-7496d.firebasestorage.app",
    messagingSenderId: "661412770842",
    appId: "1:661412770842:web:155a3f10b49f0597990da3",
    measurementId: "G-GYK873MCR0",
  };

  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  const cards = document.querySelectorAll(".card");
  const progressBar = document.getElementById("progressBar");

  let current = 0;
  let responses = {};
  let userName = "";

  const totalSteps = cards.length - 1;

  function showCard(i) {
    cards.forEach((c) => c.classList.remove("active"));
    cards[i]?.classList.add("active");
    progressBar.style.width = (i / totalSteps) * 100 + "%";
  }

  window.next = function () {
    current++;
    showCard(current);
  };

  window.saveName = function () {
    const input = document.getElementById("userName");
    if (!input.value.trim()) return alert("Please enter your name 💕");
    userName = input.value.trim();
    responses.name = userName;
    current++;
    showCard(current);
  };

  window.selectAnswer = function (q, value) {
    responses[`q${q}`] = value;
    current++;
    showCard(current);
  };

  window.finish = function (value) {
    responses.q5 = value;

    db.collection("gfResponses")
      .add({
        responses,
        createdAt: new Date(),
      })
      .then(() => {
        document.getElementById("finalName").innerText = userName;
        current++;
        showCard(current);
      });
  };

  window.shareLove = function () {
    const shareData = {
      title: "For Us 💖",
      text: "I made something special for you 💕",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.log("Share cancelled"));
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied 💌\nYou can share it now ❤️");
    }
  };
};
