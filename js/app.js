import APPWRITE_CONFIG from '../appwrite/config.js';

const { Client, Account } = Appwrite;

// Inisialisasi Appwrite Client
const client = new Client();
client
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId);

// Export Account untuk digunakan di file lain
const account = new Account(client);

// Cek session aktif
async function checkSession() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}

// Export ke global
window.account = account;
window.checkSession = checkSession;
