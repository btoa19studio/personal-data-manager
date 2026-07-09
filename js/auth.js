// ============ REGISTER ============
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const messageEl = document.getElementById('message');
        
        try {
            // Gunakan window.account (dari app.js)
            const account = window.account;
            
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
            // Gunakan window.account (dari app.js)
            const account = window.account;
            
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
async function logout() {
    try {
        const account = window.account;
        await account.deleteSession('current');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// Export logout ke global
window.logout = logout;
