export async function searchProducts(query) {
    if (!query.trim()) {
        return [];
    }

    const response = await fetch("http://localhost:3000/api/products");

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const products = await response.json();

    return products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
}