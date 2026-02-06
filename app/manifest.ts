export default function manifest() {
  return {
    name: 'PDF Bro - Free Online PDF Tools',
    short_name: 'PDF Bro',
    description: 'Free online PDF tools to convert, merge, split, and edit PDF files',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAF9F6',
    theme_color: '#000000',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
