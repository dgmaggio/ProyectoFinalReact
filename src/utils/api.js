export async function fetchProducts(category = null, limit = 18) {
	const url = category
		? `https://fakestoreapi.com/products/category/${category}`
		: `https://fakestoreapi.com/products?limit=${limit}`;

	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Error al obtener productos");
	}

	return response.json();
}

export async function fetchUsers() {
	const response = await fetch('https://fakestoreapi.com/users');
	if (!response.ok) throw new Error('Error al obtener usuarios');
	return response.json();
}

export async function loginUser(username, password) {
	const users = await fetchUsers();
	const user = users.find(u => u.username === username && u.password === password);
	return user || null;
}