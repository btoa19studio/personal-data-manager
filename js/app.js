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

// Cek session aktif
async function checkSession() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}

window.checkSession = checkSession;

console.log('✅ Appwrite siap!');
