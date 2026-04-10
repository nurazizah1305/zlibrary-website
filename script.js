// 1. LOGIKA NAVIGASI BERGERAK (STICKY & SHRINK)
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-section');
    
    // Jika scroll lebih dari 80px, tambahkan class 'scrolled'
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. MOOD TRACKER & RECOMMENDATION
function setMood(mood){
    // Simpan ke localStorage agar tidak hilang saat refresh
    localStorage.setItem("userMood", mood);
    
    // Tampilkan area rekomendasi (hapus class d-none)
    const area = document.getElementById('recommendationArea');
    if(area) {
        area.classList.remove('d-none');
    }
    
    // Jalankan fungsi update konten
    updateRecommendation(mood);

    // Scroll otomatis ke arah hasil rekomendasi agar user tahu sudah muncul
    area.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


function updateRecommendation(mood){
    let book = document.getElementById("bookRec");
    let music = document.getElementById("musicRec");
    let podcast = document.getElementById("podcastRec");

    // Jika elemen tidak ditemukan di HTML, batalkan fungsi
    if(!book || !music || !podcast) return;

    // Mood yang muncul
    if(mood === "happy"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p class='fw-bold text-success'>The How of Happiness</p><p class='small text-muted'>Pelajari cara ilmiah untuk meningkatkan kebahagiaanmu.</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/AxM758IkMHg" allowfullscreen></iframe></div>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/pHK2UxwfaL0" allowfullscreen></iframe></div>`;
    }

    if(mood === "calm"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p class='fw-bold text-success'>Atomic Habits</p><p class='small text-muted'>Perubahan kecil yang memberikan hasil luar biasa.</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/69ZpOi5K4Mo" allowfullscreen></iframe></div>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/dmFKPhjoRrE" allowfullscreen></iframe></div>`;
    }

    if(mood === "sad"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p class='fw-bold text-success'>Anak Kos Dodol</p><p class='small text-muted'>Cerita kocak yang pasti bikin kamu senyum lagi.</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/ioGwyBZwWVo" allowfullscreen></iframe></div>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/FIXQQ7X7tZE" allowfullscreen></iframe></div>`;
    }

    if(mood === "stress"){
        book.innerHTML = "<h3>📚 Bacaan</h3><p class='fw-bold text-success'>The Midnight Library</p><p class='small text-muted'>Menjelajahi ribuan kehidupan untuk menemukan arti hidup.</p>";
        music.innerHTML = `<h3>🎧 Musik</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/S30BAGHTaHY" allowfullscreen></iframe></div>`;
        podcast.innerHTML = `<h3>🎙️ Podcast</h3><div class="ratio ratio-16x9"><iframe src="https://www.youtube.com/embed/q5x1SNjRQwY" allowfullscreen></iframe></div>`;
    }
}


// 3. FUNGSI PENCARIAN (SEARCH)
function searchBook() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    
    if (input.trim() === "") {
        alert("Silakan masukkan kata kunci pencarian.");
        return;
    }

    // Arahkan ke halaman koleksi sambil membawa kata kunci pencarian
    window.location.href = `koleksi.html?search=${encodeURIComponent(input)}`;
}


// 4. AUTO-LOAD SAAT HALAMAN DIBUKA
window.onload = function() {
    // Cek apakah ada mood yang tersimpan sebelumnya
    let savedMood = localStorage.getItem("userMood");
    if(savedMood) {
        // Jika ada, langsung tampilkan rekomendasinya
        setMood(savedMood);
    }

    // Ganti kutipan (Quote) secara acak tiap refresh
    const quotes = [
        "\"Reading is to the mind what exercise is to the body.\"",
        "\"A room without books is like a body without a soul.\"",
        "\"Self-care is how you take your power back.\"",
        "\"Grow at your own pace, but never stop growing.\""
    ];
    const marquee = document.getElementById('quoteText');
    if(marquee) {
        marquee.innerText = quotes[Math.floor(Math.random() * quotes.length)];
    }
};

// --- 5. LOGIKA FILTER EVENT ---
function filterEvent(category) {
    const items = document.querySelectorAll('.event-item');
    const buttons = document.querySelectorAll('.filter-btns-editorial button');

    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Gunakan window.event untuk keamanan browser
    if (window.event) {
        window.event.target.classList.add('active');
    }

    // Filter Cards
    items.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// --- 6. LOGIN & SIGN UP ---
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            alert("Login berhasil!");
            
            const modalEl = document.getElementById('authModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault(); 
            alert("Registrasi berhasil! Sekarang kamu sudah menjadi bagian dari komunitas.");
            
            const modalEl = document.getElementById('authModal');
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
        });
    }
});

// --- 7. HALAMAN KOMUNITAS ---
document.addEventListener('DOMContentLoaded', function() {
    
    // A. DETEKSI STATUS JOIN DARI EVENT
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get('status');
    const eventName = urlParams.get('name');

    if (status === 'joined' && eventName) {
        const decodedName = decodeURIComponent(eventName);
        
        const alertBox = document.getElementById('joinAlert');
        const nameText = document.getElementById('bookedEventName');
        if (alertBox && nameText) {
            nameText.innerText = decodedName;
            alertBox.classList.remove('d-none');
            // Animasi halus muncul
            alertBox.style.animation = "fadeInDown 0.5s ease";
        }

        const container = document.getElementById('eventListContainer');
        if (container) {
            container.innerHTML = `
                <div class="p-3 bg-light border-start border-4 border-success animate-in">
                    <p class="fw-bold small mb-1 text-dark">${decodedName}</p>
                    <div class="d-flex align-items-center text-success mb-2" style="font-size: 11px;">
                        <i class="fas fa-circle me-1" style="font-size: 6px;"></i> Terdaftar
                    </div>
                    <button class="btn btn-dark btn-sm w-100 mt-1" style="font-size: 10px; letter-spacing: 1px;">
                        <i class="fas fa-sign-in-alt me-1"></i> MASUK RUANG DISKUSI
                    </button>
                </div>
            `;
        }
    }

    // B. FUNGSI POSTING 
    window.dummyPost = function() {
        const input = document.getElementById('postContent');
        const feedArea = document.getElementById('feedArea');

        if (!input || input.value.trim() === "") {
            alert("Tuliskan sesuatu terlebih dahulu!");
            return;
        }

        const content = input.value;

        const newPost = `
            <div class="discussion-card p-4 border bg-white mb-3 shadow-sm" style="animation: slideUp 0.4s ease forwards;">
                <div class="d-flex align-items-center mb-3">
                    <img src="https://ui-avatars.com/api/?name=Reader&background=40513B&color=fff" class="rounded-circle me-3" width="45">
                    <div>
                        <h6 class="m-0 fw-bold text-dark">Reader (Kamu)</h6>
                        <small class="text-muted">Baru saja</small>
                    </div>
                </div>
                <p class="mb-0" style="color: #444; line-height: 1.6;">${content}</p>
            </div>
        `;

        feedArea.insertAdjacentHTML('afterbegin', newPost);
        
        // Reset textarea dan fokus kembali
        input.value = "";
        input.focus();
    };
});

// --- 9. LOGIKA HALAMAN KOLEKSI ---

// 1. FUNGSI PENCARIAN (SEARCH)
function searchFunction() {
    let input = document.getElementById('searchKoleksi');
    let filter = input.value.toLowerCase();
    let bookCards = document.querySelectorAll('.item-buku, .col-6.col-md-3'); // Mengambil semua grid buku

    bookCards.forEach(card => {
        let title = card.querySelector('.small-title');
        if (title) {
            let textValue = title.textContent || title.innerText;
            if (textValue.toLowerCase().indexOf(filter) > -1) {
                card.style.display = ""; // Tampilkan jika cocok
            } else {
                card.style.display = "none"; // Sembunyikan jika tidak cocok
            }
        }
    });
}

// 2. READER SPACE LOGIC (RIWAYAT & ULASAN)
document.addEventListener('DOMContentLoaded', () => {
    
    const reviewContainer = document.querySelector('.col-lg-5 .p-4');
    
    const addReview = (title, rating, text) => {
        const reviewHtml = `
            <div class="review-item mb-3 p-3 bg-light rounded animate__animated animate__fadeIn">
                <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold small">"${title}"</span>
                    <span class="text-warning small">${'⭐'.repeat(rating)}</span>
                </div>
                <p class="m-0 x-small text-muted italic">"${text}" - Kamu</p>
            </div>
        `;
        reviewContainer.insertAdjacentHTML('beforeend', reviewHtml);
    };

    // 3. PROGRESS BAR INTERACTION
    const readButtons = document.querySelectorAll('.btn-green-editorial');
    readButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {

            console.log("User mulai membaca: " + this.parentElement.querySelector('.small-title').innerText);
            
        });
    });
});

// 10. NAVBAR SCROLL EFFECT

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-section');
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
    } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.backgroundColor = "#fff";
    }
});

// 11. GAME

let growthStage = 0;
const stages = ["🌱", "🌿", "🎍", "🪴", "🌷", "🌸", "🌻"];

function waterPlant() {
    const flower = document.getElementById('flower');
    const status = document.getElementById('gardenStatus');
    const waterDrop = document.getElementById('waterDrop');

    if (growthStage < stages.length - 1) {
        // 1. Jalankan animasi air jatuh
        waterDrop.classList.remove('d-none');
        waterDrop.style.animation = 'dropWater 0.8s forwards';

        setTimeout(() => {
            waterDrop.classList.add('d-none');
            waterDrop.style.animation = '';
            
            // 2. Tambah tahap pertumbuhan
            growthStage++;
            flower.innerText = stages[growthStage];
            
            // 3. Perbesar ukuran visualnya
            let currentSize = parseInt(window.getComputedStyle(flower).fontSize);
            flower.style.fontSize = (currentSize + 20) + "px";

            // 4. Update Status
            if (growthStage === stages.length - 1) {
                status.innerText = "Selamat! Bungamu mekar dengan sempurna! ✨";
                status.classList.add('text-success');
            } else {
                status.innerText = "Terus siram agar bungamu mekar!";
            }
        }, 800);
    } else {
        alert("Wah, tamanmu sudah sangat cantik! Tunggu bunga baru besok ya.");
    }
}

// 12. LOGIN DAN SIGNUP

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const loginBtnNav = document.querySelector('.btn-login-editorial');

    // --- 1. ATURAN PROTEKSI HALAMAN ---
    
    const protectedPages = ['event.html', 'koleksi.html', 'garden.html', 'komunitas.html'];
    const currentPage = window.location.pathname.split("/").pop();
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (protectedPages.includes(currentPage) && !isLoggedIn) {
        alert("Akses ditolak! Silakan Login terlebih dahulu.");
        window.location.href = 'index.html'; 
    }

    // --- 2. LOGIKA SIGNUP ---
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('s-name').value;
            const email = document.getElementById('s-email').value;
            const pass = document.getElementById('s-pass').value;

            let users = JSON.parse(localStorage.getItem('growlib_users')) || [];

            if (users.find(u => u.email === email)) {
                return alert("Email sudah terdaftar!");
            }

            users.push({ name, email, pass });
            localStorage.setItem('growlib_users', JSON.stringify(users));
            alert("Pendaftaran Berhasil! Silakan Login.");
            
            const loginTab = new bootstrap.Tab(document.querySelector('[data-bs-target="#login"]'));
            loginTab.show();
        });
    }

    // --- 3. LOGIKA LOGIN ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('l-email').value;
            const pass = document.getElementById('l-pass').value;

            let users = JSON.parse(localStorage.getItem('growlib_users')) || [];
            const user = users.find(u => u.email === email && u.pass === pass);

            if (user) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', user.name);
                alert(`Selamat datang kembali, ${user.name}!`);
                window.location.reload(); 
            } else {
                alert("Email atau Password salah!");
            }
        });
    }

    // --- 4. TAMPILAN NAVBAR SETELAH LOGIN ---
    if (isLoggedIn && loginBtnNav) {
        const userName = localStorage.getItem('userName');
        loginBtnNav.innerHTML = `<i class="fas fa-user-circle"></i> ${userName}`;
        loginBtnNav.classList.replace('btn-login-editorial', 'btn-outline-success');
        
        // Klik tombol nama untuk Logout
        loginBtnNav.onclick = () => {
            if(confirm("Apakah kamu ingin Logout?")) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userName');
                window.location.href = 'index.html';
            }
        };
    }
});
