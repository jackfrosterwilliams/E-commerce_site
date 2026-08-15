const express = require("express");

const app = express();

const products = [
    {
        id: 1,
        name: "Black Hoodie",
        category: "Shirts",
        price: 49.99,
        stock: 20,
        size: "M",
        color: "Black",
        collection: "Summer",
        tag: "New",
        image_url: "https://cdn.phototourl.com/free/2026-08-14-f2bf718a-a967-487b-94f2-54d0b4df493b.png"
    },
    {
        id: 2,
        name: "White Classic T-Shirt",
        category: "Shirts",
        price: 19.99,
        stock: 35,
        size: "S",
        color: "White",
        collection: "Winter",
        tag: "Sale",
        image_url: "https://cdn.phototourl.com/free/2026-08-14-ef7314d1-7666-456f-b31b-d0f1744bbeff.png"
    },
    {
        id: 3,
        name: "Classic Blue Denim Shirt",
        category: "Shirts",
        price: 59.99,
        stock: 15,
        size: "L",
        color: "Blue",
        collection: "Summer",
        tag: "New",
        image_url: "https://cdn.phototourl.com/free/2026-08-14-20c3d83e-de7d-4325-be15-133d0a62dfbf.png"
    },
    {
        id: 4,
        name: "Premium Dark Blue Shirt",
        category: "Shirts",
        price: 69.99,
        stock: 12,
        size: "XL",
        color: "Blue",
        collection: "Winter",
        tag: "Sale",
        image_url: "https://cdn.phototourl.com/free/2026-08-14-9eba2246-ec6d-4565-8f82-58897d580f21.png"
    },
    {
        id: 5,
        name: "Slim Fit Casual Shirt",
        category: "Shirts",
        price: 54.99,
        stock: 18,
        size: "M",
        color: "Black",
        collection: "Summer",
        tag: "Sale",
        image_url: "https://cdn.phototourl.com/free/2026-08-14-6d0b5921-0d21-402c-bf44-8cd9fe47ab78.png"
    },
    {
        id: 6,
        name: "Vintage Wash Shirt",
        category: "Shirts",
        price: 64.99,
        stock: 10,
        size: "L",
        color: "White",
        collection: "Winter",
        tag: "New",
        image_url: "https://cdn.phototourl.com/free/2026-08-14-65950f0e-62ff-4072-8e7b-6ac971749da5.png"
    },
    {
        id: 7,
        name: "Dark Brown T-Shirt",
        category: "Shirts",
        price: 22.99,
        stock: 28,
        size: "S",
        color: "Black",
        collection: "Summer",
        tag: "Sale",
        image_url: "https://cdn.phototourl.com/free/2026-08-14-010af2be-de18-4e0f-b64f-d04c332a5d88.png"
    },
    {
        id: 8,
        name: "Lavender Pastel Shirt",
        category: "Shirts",
        price: 24.99,
        stock: 22,
        size: "XS",
        color: "White",
        collection: "Winter",
        tag: "New",
        image_url: "https://cdn.phototourl.com/member/2026-08-14-b810b61e-4439-4803-886d-ac3869a904d6.png"
    },
    {
        id: 9,
        name: "Pure White Crew Neck Tee",
        category: "Shirts",
        price: 18.99,
        stock: 40,
        size: "S",
        color: "White",
        collection: "Summer",
        tag: "New",
        image_url: "https://cdn.phototourl.com/member/2026-08-14-92d47be7-5891-41aa-b64f-29c5b0f2bed8.png"
    },
    {
        id: 10,
        name: "Comfortable Casual Shirt",
        category: "Shirts",
        price: 55.99,
        stock: 0,
        size: "XL",
        color: "Blue",
        collection: "Winter",
        tag: "Sale",
        image_url: "https://cdn.phototourl.com/member/2026-08-14-fe5ae9db-2966-4d0f-a637-90185e328778.png"
    }
];

const sidebarOptions = {
    categories: [...new Set(products.map((product) => product.category))],
    sizes: ["XS", "S", "M", "L", "XL", "2X"],
    colors: ["Black", "White", "Blue"],
    collections: ["Summer", "Winter"],
    tags: ["New", "Sale"]
};

app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }
    next();
});

app.get("/", (req, res) => {
    res.send("Backend is working!");
});

app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/sidebar", (req, res) => {
    res.json(sidebarOptions);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});