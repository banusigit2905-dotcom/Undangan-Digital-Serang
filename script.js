// State Management Sederhana
let state = {
    isLoggedIn: false,
    currentUser: null,
    currentStep: 1,
    invitationData: {}
};

// Navigasi Antar Section
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(sec => {
        sec.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    window.scrollTo(0,0);
}

// Auth Logic
const authForm = document.getElementById('auth-form');
authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.isLoggedIn = true;
    state.currentUser = document.getElementById('email').value;
    
    // Update UI Navigasi
    document.getElementById('login-nav').style.display = 'none';
    document.getElementById('logout-nav').style.display = 'block';
    document.getElementById('user-name').innerText = state.currentUser.split('@')[0];
    
    showSection('dashboard');
});

function handleLogout() {
    state.isLoggedIn = false;
    document.getElementById('login-nav').style.display = 'block';
    document.getElementById('logout-nav').style.display = 'none';
    showSection('home');
}

function checkAuthAndStart() {
    if (state.isLoggedIn) {
        showSection('form-builder');
    } else {
        showSection('login');
    }
}

// Multi-step Form Logic
function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    
    document.getElementById('step' + step).classList.add('active');
    document.getElementById('step' + step + '-dot').classList.add('active');
    state.currentStep = step;
}

// Generate Live Preview
function generatePreview() {
    const data = {
        title: document.getElementById('event_title').value,
        owner: document.getElementById('event_owner').value,
        date: document.getElementById('event_date').value,
        address: document.getElementById('event_address').value,
        message: document.getElementById('event_message').value
    };
    
    state.invitationData = data;

    const renderArea = document.getElementById('invitation-render');
    renderArea.innerHTML = `
        <div class="invite-card-preview">
            <div class="invite-header">
                <p>MOHON DOA RESTU</p>
                <h1 style="font-family: 'Playfair Display', serif;">${data.owner}</h1>
            </div>
            <div style="padding: 30px;">
                <h3>${data.title}</h3>
                <p style="margin: 20px 0;">${data.message}</p>
                <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                <p><strong><i class="fas fa-calendar"></i> Tanggal:</strong><br>${data.date}</p>
                <p style="margin-top:15px;"><strong><i class="fas fa-map-marker-alt"></i> Lokasi:</strong><br>${data.address}</p>
                <button class="btn-primary" style="margin-top:20px; width:100%">Buka Map</button>
            </div>
        </div>
    `;

    showSection('preview-section');
}

// Publish Logic
function publishInvite() {
    const slug = state.invitationData.owner.toLowerCase().replace(/\s+/g, '-');
    const finalUrl = `undangandigitalserang.com/${slug}`;
    
    alert(`Selamat! Undangan Anda berhasil dipublikasikan.\nLink: ${finalUrl}`);
    
    // Reset dan kembali ke dashboard
    const list = document.getElementById('invitation-list');
    list.innerHTML = `
        <div class="feature-card" style="text-align:left; display:flex; justify-content:space-between; align-items:center;">
            <div>
                <h4>${state.invitationData.title}</h4>
                <p style="font-size:0.8rem; color:green;">● Aktif: ${finalUrl}</p>
            </div>
            <button class="btn-outline" onclick="alert('Link disalin!')">Salin Link</button>
        </div>
    `;
    list.classList.remove('empty-state');
    
    showSection('dashboard');
}

// Toggle Login/Register dummy
let isLoginMode = true;
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('auth-title');
    const btn = document.querySelector('#auth-form button');
    const toggleText = document.getElementById('auth-toggle');
    
    if (isLoginMode) {
        title.innerText = "Masuk ke Akun";
        btn.innerText = "Masuk";
        toggleText.innerText = "Belum punya akun? Daftar di sini";
    } else {
        title.innerText = "Daftar Akun Baru";
        btn.innerText = "Daftar";
        toggleText.innerText = "Sudah punya akun? Login di sini";
    }
}
