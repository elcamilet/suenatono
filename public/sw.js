
const CACHE_NAME = `CacheSuenaTono`;
const toCache = [
  '/',
  '/index.html',
  '/index.js',
  '/App.js',
  '/App.css',
  '/audio/april_showers.mp3',
  '/audio/cant_stop_me.mp3',
  '/audio/faidherbe_square.mp3',
  '/static/js/bundle.js',
  '/manifest.json',
  '/favicon16.png',
  '/favicon24.png',
  '/favicon32.png',
  '/favicon64.png',
  '/favicon144.png',
  '/favicon.ico',
  '/screenshot1.png',
  '/screenshot2.png',
  '/splash/iphone5_splash.png',
  '/splash/iphone6_splash.png',
  '/splash/iphoneplus_splash.png',
  '/splash/iphonex_splash.png',
  '/splash/iphonexr_splash.png',
  '/splash/iphonexsmax_splash.png',
  '/splash/ipad_splash.png',
  '/splash/ipadpro1_splash.png',
  '/splash/ipadpro3_splash.png',
  '/splash/ipadpro2_splash.png',
]
    
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => {
    return cache.addAll(toCache);
  }));
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isPrecachedRequest = toCache.includes(url.pathname);

  if (isPrecachedRequest) {
    event.respondWith(caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request.url);
    }));
  } else {
    // Go to the network
    return;
  }
});

