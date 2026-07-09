console.log('📦 Memuat Appwrite SDK...');

// Tunggu sampai DOM siap
document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 DOM siap, cek Appwrite...');
    
    // Cek apakah Appwrite tersedia
    if (typeof Appwrite === 'undefined') {
        console.error('❌ Appwrite SDK tidak ditemukan!');
        console.log('💡 Coba muat ulang halaman atau cek koneksi internet');
        
        // Tampilkan pesan di halaman
        const body = document.querySelector('body');
        const warning = document.createElement('div');
        warning.style.cssText = 'background: #f8d7da; color: #721c24; padding: 20px; text-align: center; border-bottom: 3px solid #f5c6cb;';
        warning.innerHTML = '⚠️ Gagal memuat Appwrite SDK. Cek koneksi internet dan refresh halaman.';
        body.prepend(warning);
        return;
    }
    
    console.log('✅ Appwrite SDK terdeteksi!');
    
    const APPWRITE_CONFIG = {
        endpoint: 'https://cloud.appwrite.io/v1',
        projectId: '6a4f14c600122aca9f57',  // Ganti dengan Project ID dari Appwrite
    };

    const { Client, Account } = Appwrite;

    // Inisialisasi Appwrite Client
    const client = new Client();
    client
        .setEndpoint(APPWRITE_CONFIG.endpoint)
        .setProject(APPWRITE_CONFIG.projectId);

    // Buat instance Account
    const account = new Account(client);

    // Simpan ke window agar bisa diakses dari file lain
    window.account = account;

    console.log('✅ Appwrite siap!');
    
    // Panggil fungsi init setelah Appwrite siap
    if (typeof initAuth === 'function') {
        initAuth();
    }
    
    // Trigger event bahwa Appwrite sudah siap
    document.dispatchEvent(new Event('appwrite-ready'));
});
