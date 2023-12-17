const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample product data
const products = [
    { id: 1, name: 'Product A', category: 'Electronics' },
    { id: 2, name: 'Product B', category: 'Clothing' },
    { id: 3, name: 'Product C', category: 'Electronics' },
    // Add more products and categories as needed
];

// Sample user data
const users = {};

// Track user clicks and recommend similar products
app.post('/track', (req, res) => {
    const { userId, productId } = req.body;

    // Initialize user data if not exists
    if (!users[userId]) {
        users[userId] = { viewedProducts: [] };
    }

    // Track the viewed product for the user
    users[userId].viewedProducts.push(productId);

    res.sendStatus(200);
});

// Recommend similar products based on the user's viewed products
app.get('/recommend/:userId', (req, res) => {
    const userId = req.params.userId;

    // Retrieve viewed products for the user
    const viewedProducts = users[userId] ? users[userId].viewedProducts : [];

    // Find products from the same category as the last viewed product
    const lastViewedProductId = viewedProducts.length > 0 ? viewedProducts[viewedProducts.length - 1] : null;
    const lastViewedProduct = products.find(product => product.id === lastViewedProductId);

    if (lastViewedProduct) {
        const recommendedProducts = products.filter(product => product.category === lastViewedProduct.category);
        res.json({ recommendations: recommendedProducts });
    } else {
        res.json({ recommendations: [] });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
