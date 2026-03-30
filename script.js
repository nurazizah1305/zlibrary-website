// =======================
// QUOTES
// =======================

const quotes = [
"you are doing better than you think 🌱",
"small progress is still progress ✨",
"protect your peace 🤍",
"growth takes time 🌿",
"rest is productive too 💤"
];

const quoteText = document.getElementById("quoteText");
if(quoteText){
    quoteText.innerText = quotes[Math.floor(Math.random()*quotes.length)];
}

// =======================
// SEARCH BUKU
// =======================

function searchBook(){

    let input = document.getElementById("searchInput").value.toLowerCase();
    let result = document.getElementById("bookRec");

    if(!result) return;

    let found = books.filter(book => book.includes(input));

    if(found.length > 0){
        result.innerHTML =
        "<h3>📚 Hasil Pencarian</h3>" +
        found.map(book => "<p>"+book+"</p>").join("");
    }else{
        result.innerHTML =
        "<h3>📚 Hasil Pencarian</h3><p>Buku tidak ditemukan</p>";
    }
}


// =======================
// MOOD TRACKER
// =======================

function setMood(mood){
    localStorage.setItem("userMood", mood);
    updateRecommendation(mood);
}


// =======================
// RECOMMENDATION
// =======================

function updateRecommendation(mood){

    let book = document.getElementById("bookRec");
    let music = document.getElementById("musicRec");
    let podcast = document.getElementById("podcastRec");

    if(!book || !music || !podcast) return;

    if(mood === "happy"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p>The How of Happiness</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><iframe src="https://www.youtube.com/embed/AxM758IkMHg"></iframe>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><iframe src="https://www.youtube.com/embed/A7Pt8R2Fx2Q"></iframe>`;
    }

    if(mood === "calm"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p>Atomic Habits</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><iframe src="https://www.youtube.com/embed/69ZpOi5K4Mo"></iframe>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><iframe src="https://www.youtube.com/embed/E14rVsVJk0M"></iframe>`;
    }

    if(mood === "sad"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p>Anak Kos Dodol</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><iframe src="https://www.youtube.com/embed/ioGwyBZwWVo"></iframe>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><iframe src="https://www.youtube.com/embed/6Mtj-ZdxfU8"></iframe>`;
    }

    if(mood === "stress"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p>The Midnight Library</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><iframe src="https://www.youtube.com/embed/S30BAGHTaHY"></iframe>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><iframe src="https://www.youtube.com/embed/q5x1SNjRQwY"></iframe>`;
    }
}

// =======================
// EVENT DATA 
// =======================

const eventImage = "event.jpg";

const weeklyEvents = [

    // MINGGU 1
    [
        { title:"Breathing Session", desc:"Latihan pernapasan", time:"19:00" },
        { title:"Journaling Night", desc:"Tulis perasaanmu", time:"20:00" },
        { title:"Reading Session", desc:"Baca bareng", time:"21:00" },
        { title:"Calm Music Night", desc:"Musik santai", time:"21:30" },
        { title:"Gratitude Time", desc:"Tulis rasa syukur", time:"18:30" },
        { title:"Digital Detox", desc:"Istirahat dari gadget", time:"20:30" }
    ],

    // MINGGU 2
    [
        { title:"Mind Reset", desc:"Healing time", time:"19:00" },
        { title:"Self Talk", desc:"Positive self talk", time:"20:00" },
        { title:"Focus Reading", desc:"Deep reading", time:"21:00" },
        { title:"Silent Reflection", desc:"Waktu tenang", time:"18:30" },
        { title:"Podcast Night", desc:"Denger podcast", time:"21:30" },
        { title:"Morning Boost", desc:"Start pagi positif", time:"07:00" }
    ]

];

// =======================
// AMBIL MINGGU SEKARANG
// =======================

function getCurrentWeek(){
    let week = Math.floor(new Date().getDate() / 7);
    return week % weeklyEvents.length;
}


// =======================
// LOAD EVENT + SLIDER
// =======================

function loadEvents(){

    let track = document.querySelector(".event-track");
    if(!track) return;

    let events = weeklyEvents[getCurrentWeek()];

    track.innerHTML = "";

    events.forEach(event => {
        track.innerHTML += `
        <div class="event-card">
            <img src="${eventImage}">
            <h3>${event.title}</h3>
            <p>${event.desc}</p>
            <span class="event-time">${event.time} WIB</span>
        </div>
        `;
    });

    startSlide();
}

// =======================
// AUTO SLIDE EVENT 
// =======================

let currentSlide = 0;

function startSlide(){

    const track = document.querySelector(".event-track");
    const cards = document.querySelectorAll(".event-card");

    if(cards.length === 0) return;

    let cardWidth = cards[0].offsetWidth + 20; // + gap antar card

    setInterval(() => {

        currentSlide++;

        if(currentSlide >= cards.length){
            currentSlide = 0;
        }

        track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

    }, 3000);
}


// =======================
// JALANKAN SAAT LOAD
// =======================

document.addEventListener("DOMContentLoaded", function(){
    loadEvents();
});

// =======================
// LOGIN
// =======================

document.querySelector(".auth-form")?.addEventListener("submit", function(e){
    e.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.password === password);

    if(user){
        alert("Login berhasil!");
        window.location.href = "index.html";
    } else {
        alert("Email atau password salah!");
    }
});

// =======================
// SIGN UP
// =======================

document.querySelector(".signup-form")?.addEventListener("submit", function(e){
    e.preventDefault();

    const firstname = document.querySelector('input[name="firstname"]').value;
    const lastname = document.querySelector('input[name="lastname"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const phone = document.querySelector('input[name="phone"]').value;
    const password = document.querySelector('input[name="password"]').value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // cek email
    let exist = users.find(user => user.email === email);

    if(exist){
        alert("Email sudah terdaftar!");
        return;
    }

    // simpan user
    const newUser = {
        firstname,
        lastname,
        email,
        phone,
        password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Berhasil daftar! Silakan login 🌿");
    window.location.href = "login.html";
});
