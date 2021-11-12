const CACHE_ELEMENTS = [
    "./",
    "https://unpkg.com/react@17/umd/react.production.min.js",
    "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js",
    "https://unpkg.com/@babel/standalone/babel.min.js",
    "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js",
    "./css/style.css",
    "./components/Registro.js",
    "./components/Titulo.js",
    "./components/Form.js",
    "./index.js"
]

const CACHE_NAME = "v1_cache_registro_react"

self.addEventListener("install",(e) =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache =>{
                cache.addAll(CACHE_ELEMENTS).then(()=>{
                    self.skipWaiting();
                }).catch(console.log)
            }
        )
    );
});

self.addEventListener("activate",(e) =>{
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then(
            (cachesName) =>{ 
                return Promise.all(cachesName.map(cacheName =>{
                    return(
                        cacheWhitelist.indexOf(cacheName) === -1 && caches.delete(cacheName)
                    );
                }));
            }
        ).then(() => self.clients.claim())
    );
})

self.addEventListener("fetch",(e) =>{
    e.respondWith(
        caches.match(e.request).then((res)=>{
            if(res){
                return res;
            }
            return fetch(e.request);
        })
    );
});