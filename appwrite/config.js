// Konfigurasi Appwrite
// Ganti YOUR_PROJECT_ID dengan Project ID dari Appwrite Console
const APPWRITE_CONFIG = {
    endpoint: 'https://cloud.appwrite.io/v1',
    projectId: '6a4f14c600122aca9f57',  // Ganti dengan Project ID kamu
};

// Export ke global
window.APPWRITE_CONFIG = APPWRITE_CONFIG;
