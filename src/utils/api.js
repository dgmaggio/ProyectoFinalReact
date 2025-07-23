// Configuración de MockAPI
const API_URL = 'https://68804988f1dcae717b617ffd.mockapi.io/api';

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

// FUNCIONES DE LECTURA (READ)

export async function fetchProducts(category = null, limit = null) {
    // Crear clave única para el cache
    const cacheKey = category 
        ? `products_cache_${category}` 
        : `products_cache_all${limit ? `_${limit}` : ''}`;

    // Intentar obtener del cache primero
    const cachedProducts = getCachedData(cacheKey);
    if (cachedProducts) {
        console.log(`Productos obtenidos del cache: ${cacheKey}`);
        return cachedProducts;
    }

    // Si no hay cache, obtener de MockAPI
    console.log(`Obteniendo productos de MockAPI: ${cacheKey}`);
    
    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }

        let data = await response.json();
        
        // Aplicar filtros si se especificaron
        if (category) {
            data = data.filter(product => product.category === category);
        }
        
        if (limit) {
            data = data.slice(0, limit);
        }
        
        // Guardar en cache para futuras consultas
        setCachedData(cacheKey, data);
        console.log(`Productos guardados en cache: ${cacheKey}`);

        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

export async function fetchProductById(productId) {
    const cacheKey = `product_${productId}_cache`;
    
    // Intentar obtener del cache
    const cachedProduct = getCachedData(cacheKey);
    if (cachedProduct) {
        console.log(`Producto ${productId} obtenido del cache`);
        return cachedProduct;
    }

    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener producto');
        }

        const product = await response.json();
        
        // Guardar en cache
        setCachedData(cacheKey, product);
        console.log(`Producto ${productId} guardado en cache`);
        
        return product;
    } catch (error) {
        console.error('Error al obtener producto:', error);
        throw error;
    }
}

// FUNCIONES DE ESCRITURA (CREATE, UPDATE, DELETE)

export async function createProduct(productData) {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: productData.nombre || productData.title,
                price: Number(productData.precio || productData.price),
                description: productData.description || 'Producto creado desde admin',
                image: productData.image || 'https://fakestoreapi.com/img/placeholder.jpg',
                category: productData.category || 'electronics'
            })
        });

        if (!response.ok) {
            throw new Error('Error al crear producto');
        }

        const newProduct = await response.json();
        
        // Limpiar cache para que se actualice la lista
        clearAllCache();
        console.log('Producto creado exitosamente:', newProduct);
        
        return newProduct;
    } catch (error) {
        console.error('Error al crear producto:', error);
        throw error;
    }
}

export async function updateProduct(productId, productData) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: productData.nombre || productData.title,
                price: Number(productData.precio || productData.price),
                description: productData.description,
                image: productData.image,
                category: productData.category
            })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar producto');
        }

        const updatedProduct = await response.json();
        
        // Limpiar cache para que se actualice la lista
        clearAllCache();
        console.log('Producto actualizado exitosamente:', updatedProduct);
        
        return updatedProduct;
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        throw error;
    }
}

export async function deleteProduct(productId) {
    try {
        const response = await fetch(`${API_URL}/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar producto');
        }

        const result = await response.json();
        
        // Limpiar cache para que se actualice la lista
        clearAllCache();
        console.log('Producto eliminado exitosamente:', productId);
        
        return result;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
}

// FUNCIONES PARA USUARIOS (manteniendo FakeStore por ahora)

export async function fetchUsers() {
    const cacheKey = 'users_cache';
    
    // Intentar obtener del cache
    const cachedUsers = getCachedData(cacheKey);
    if (cachedUsers) {
        console.log('Usuarios obtenidos del cache');
        return cachedUsers;
    }

    try {
        // Obtener de FakeStore API (puedes migrar esto después si quieres)
        console.log('Obteniendo usuarios de FakeStore API');
        const response = await fetch('https://fakestoreapi.com/users');
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        const data = await response.json();
        
        // Guardar en cache
        setCachedData(cacheKey, data);
        console.log('Usuarios guardados en cache');
        
        return data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

export async function loginUser(username, password) {
    const users = await fetchUsers();
    const user = users.find(u => u.username === username && u.password === password);
    return user || null;
}

// FUNCIONES DE CACHE

export function clearAllCache() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.includes('_cache')) {
            localStorage.removeItem(key);
        }
    });
    console.log('Todo el cache ha sido limpiado');
}

export function clearCacheFor(category = null) {
    const cacheKey = category 
        ? `products_cache_${category}` 
        : 'products_cache_all';
    
    localStorage.removeItem(cacheKey);
    console.log(`Cache limpiado para: ${cacheKey}`);
}

// FUNCIÓN UTILITARIA PARA OBTENER CATEGORÍAS ÚNICAS
export async function fetchCategories() {
    try {
        const products = await fetchProducts();
        const categories = [...new Set(products.map(product => product.category))];
        return categories.sort();
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return ['electronics', 'jewelery', "men's clothing", "women's clothing"];
    }
}