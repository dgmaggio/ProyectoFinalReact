// Configuración de cache
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas en millisegundos

// Función para obtener datos del cache
function getCachedData(key) {
    try {
        const cachedItem = localStorage.getItem(key);
        if (!cachedItem) return null;

        const { data, timestamp } = JSON.parse(cachedItem);
        const now = Date.now();

        // Verificar si el cache ha expirado
        if (now - timestamp > CACHE_DURATION) {
            localStorage.removeItem(key);
            return null;
        }

        return data;
    } catch (error) {
        console.error('Error al leer del cache:', error);
        return null;
    }
}

// Función para guardar datos en el cache
function setCachedData(key, data) {
    try {
        const cacheItem = {
            data,
            timestamp: Date.now()
        };
        localStorage.setItem(key, JSON.stringify(cacheItem));
    } catch (error) {
        console.error('Error al guardar en cache:', error);
    }
}

export async function fetchProducts(category = null, limit = 18) {
    // Crear clave única para el cache
    const cacheKey = category 
        ? `products_cache_${category}` 
        : `products_cache_all_${limit}`;

    // Intentar obtener del cache primero
    const cachedProducts = getCachedData(cacheKey);
    if (cachedProducts) {
        console.log(`Productos obtenidos del cache: ${cacheKey}`);
        return cachedProducts;
    }

    // Si no hay cache, obtener de la API
    console.log(`Obteniendo productos de la API: ${cacheKey}`);
    
    const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : `https://fakestoreapi.com/products?limit=${limit}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Error al obtener productos");
    }

    const data = await response.json();
    
    // Guardar en cache para futuras consultas
    setCachedData(cacheKey, data);
    console.log(`Productos guardados en cache: ${cacheKey}`);

    return data;
}

export async function fetchUsers() {
    const cacheKey = 'users_cache';
    
    // Intentar obtener del cache
    const cachedUsers = getCachedData(cacheKey);
    if (cachedUsers) {
        console.log('Usuarios obtenidos del cache');
        return cachedUsers;
    }

    // Obtener de la API
    console.log('Obteniendo usuarios de la API');
    const response = await fetch('https://fakestoreapi.com/users');
    if (!response.ok) throw new Error('Error al obtener usuarios');
    
    const data = await response.json();
    
    // Guardar en cache
    setCachedData(cacheKey, data);
    console.log('Usuarios guardados en cache');
    
    return data;
}

export async function loginUser(username, password) {
    const users = await fetchUsers();
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
}

// Función para limpiar todo el cache (útil para desarrollo o logout)
export function clearAllCache() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.includes('_cache')) {
            localStorage.removeItem(key);
        }
    });
    console.log('Todo el cache ha sido limpiado');
}

// Función para limpiar cache específico
export function clearCacheFor(category = null) {
    const cacheKey = category 
        ? `products_cache_${category}` 
        : 'products_cache_all';
    
    localStorage.removeItem(cacheKey);
    console.log(`Cache limpiado para: ${cacheKey}`);
}