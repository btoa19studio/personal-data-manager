// Tunggu sampai DOM siap
document.addEventListener('DOMContentLoaded', function() {
    console.log('📦 Memuat Appwrite SDK...');
    
    // Cek apakah Appwrite tersedia
    if (typeof Appwrite === 'undefined') {
        console.error('❌ Appwrite SDK tidak ditemukan!');
        return;
    }
    
    const APPWRITE_CONFIG = {
        endpoint: 'https://cloud.appwrite.io/v1',
        projectId: 'YOUR_PROJECT_ID',  // Ganti dengan Project ID dari Appwrite
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
