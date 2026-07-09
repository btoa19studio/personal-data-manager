// Inisialisasi setelah Appwrite siap
function initAuth() {
    console.log('🔐 Inisialisasi Auth...');
    
    // Cek apakah account tersedia
    if (!window.account) {
        console.error('❌ Account tidak tersedia!');
        return;
    }
    
    const account = window.account;
    
    // ============ REGISTER ============
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageEl = document.getElementById('message');
            
            // Reset message
            messageEl.className = 'message';
            messageEl.textContent = '';
            
            // Validasi password minimal 8 karakter
            if (password.length < 8) {
                messageEl.className = 'message error';
                messageEl.textContent = '❌ Password minimal 8 karakter!';
                return;
            }
            
            try {
                console.log('📝 Mendaftar akun...');
                
                // Buat akun baru
                await account.create('unique()', email, password, name);
                
                // Auto login setelah register
                await account.createEmailPasswordSession(email, password);
                
                messageEl.className = 'message success';
                messageEl.textContent = '✅ Pendaftaran berhasil! Redirecting...';
                
                // Redirect ke dashboard setelah 1.5 detik
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
            } catch (error) {
                console.error('Register error:', error);
                messageEl.className = 'message error';
                messageEl.textContent = '❌ ' + error.message;
            }
        });
    }

    // ============ LOGIN ============
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageEl = document.getElementById('message');
            
            // Reset message
            messageEl.className = 'message';
            messageEl.textContent = '';
            
            try {
                console.log('🔑 Login...');
                
                // Login
                await account.createEmailPasswordSession(email, password);
                
                messageEl.className = 'message success';
                messageEl.textContent = '✅ Login berhasil! Redirecting...';
                
                // Redirect ke dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
            } catch (error) {
                console.error('Login error:', error);
                messageEl.className = 'message error';
                messageEl.textContent = '❌ ' + error.message;
            }
        });
    }

    // ============ LOGOUT ============
    window.logout = async function() {
        try {
            await account.deleteSession('current');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Logout error:', error);
        }
    };
}

// Ekspos fungsi initAuth ke global
window.initAuth = initAuth;

// Jalankan init jika Appwrite sudah siap
if (window.account) {
    initAuth();
}
