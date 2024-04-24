const express = require('express');
const app = express();
const machines = require('./cars.json');
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

app.get('/all', (req, res) => {
     
     res.json(machines);
 });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
