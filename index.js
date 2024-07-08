const express = require('express');
const app = express();
const machines = require('./cars.json');
const countries = require('./countries.json');
const products = require('./products.json');
const cors = require('cors');

app.use(cors())

app.get('/machines', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = machines.length;

    const results = {};

    if (endIndex < total) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.results = machines.slice(startIndex, endIndex);
    results.total = total;
    res.json(results);
});

app.get('/countries', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const total = countries.length;

    const results = {};

    if (endIndex < total) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.results = countries.slice(startIndex, endIndex);
    results.total = total;
    res.json(results);
});

app.get('/all-countries', (req, res) => {
     res.json(countries);
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/filter', (req, res) => {
    const { minPrice, maxPrice } = req.query;

    // Narxlarni raqamga aylantirish
    const min = parseInt(minPrice, 10);
    const max = parseInt(maxPrice, 10);

    // Filtrlangan mahsulotlar
    const filteredProducts = products.filter(product => product.newPrice >= min && product.newPrice <= max);

    res.json(filteredProducts);
});


app.get('/products/category', (req, res) => {
    const { category } = req.query;

    // Filtrlangan mahsulotlar
    const filteredProducts = products.filter(product => product.category === category);

    res.json(filteredProducts);
});

app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const product = products.find(p => p.id === productId);

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Mahsulot topilmadi' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
