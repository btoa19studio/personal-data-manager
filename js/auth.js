// Tunggu sampai Appwrite siap
document.addEventListener('appwrite-ready', function() {
    initAuth();
});

// Atau langsung jalankan kalau sudah siap
if (window.account) {
    initAuth();
} else {
    document.addEventListener('appwrite-ready', initAuth);
}

function initAuth() {
    const account = window.account;
    
    // ============ REGISTER ============
    if (document.getElementById('registerForm')) {
        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageEl = document.getElementById('message');
            
            try {
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
                messageEl.className = 'message error';
                messageEl.textContent = '❌ ' + error.message;
            }
        });
    }

    // ============ LOGIN ============
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const messageEl = document.getElementById('message');
            
            try {
                // Login
                await account.createEmailPasswordSession(email, password);
                
                messageEl.className = 'message success';
                messageEl.textContent = '✅ Login berhasil! Redirecting...';
                
                // Redirect ke dashboard
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                
            } catch (error) {
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
