// Configuración de MockAPI
const API_URL = 'https://68804988f1dcae717b617ffd.mockapi.io/api';

// Configuración de cache 24 horas
const CACHE_DURATION = 24 * 60 * 60 * 1000;

// Obtener datos del cache
function getCachedData(key) {
    try {
        const cachedItem = localStorage.getItem(key);
        if (!cachedItem) return null;

        const { data, timestamp } = JSON.parse(cachedItem);
        const now = Date.now();

        // Verificar si el cache expiró
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

export async function fetchProducts(category = null, limit = null) {
    const cacheKey = category 
        ? `products_cache_${category}` 
        : `products_cache_all${limit ? `_${limit}` : ''}`;

    const cachedProducts = getCachedData(cacheKey);
    if (cachedProducts) {
        return cachedProducts;
    }
    
    try {
        const response = await fetch(`${API_URL}/products`);

        if (!response.ok) {
            throw new Error("Error al obtener productos");
        }

        let data = await response.json();
        
        if (category) {
            data = data.filter(product => product.category === category);
        }
        
        if (limit) {
            data = data.slice(0, limit);
        }
        
        setCachedData(cacheKey, data);

        return data;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}

export async function fetchProductById(productId) {
    const cacheKey = `product_${productId}_cache`;
    
    const cachedProduct = getCachedData(cacheKey);
    if (cachedProduct) {
        return cachedProduct;
    }

    try {
        const response = await fetch(`${API_URL}/products/${productId}`);
        
        if (!response.ok) {
            throw new Error('Error al obtener producto');
        }

        const product = await response.json();
        
        setCachedData(cacheKey, product);        
        
        return product;
    } catch (error) {
        console.error('Error al obtener producto:', error);
        throw error;
    }
}

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
                category: productData.category || 'electronics',
                featured: productData.featured || false
            })
        });

        if (!response.ok) {
            throw new Error('Error al crear producto');
        }

        const newProduct = await response.json();
        
        clearAllCache();
        
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
                category: productData.category,
                featured: productData.featured || false
            })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar producto');
        }

        const updatedProduct = await response.json();
        
        clearAllCache();
        
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
        
        clearAllCache();
        
        return result;
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        throw error;
    }
}

export async function fetchUsers() {
    const cacheKey = 'users_cache';
    
    const cachedUsers = getCachedData(cacheKey);
    if (cachedUsers) {
        return cachedUsers;
    }

    try {
        const response = await fetch('https://fakestoreapi.com/users');
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        const data = await response.json();
        
        setCachedData(cacheKey, data);
        
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

export function clearAllCache() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.includes('_cache')) {
            localStorage.removeItem(key);
        }
    });
}

export function clearCacheFor(category = null) {
    const cacheKey = category 
        ? `products_cache_${category}` 
        : 'products_cache_all';
    
    localStorage.removeItem(cacheKey);
}

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