const express = require('express');
const bodyParser = require('body-parser');
const Expense = require('./models/Expense');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/expenses', (req, res) => {
    Expense.getAll(expenses => {
        res.json(expenses);
    });
});
app.post('/api/expenses', (req, res) => {
    Expense.create(req.body, expense => {
        res.json(expense);
    });
});
app.delete('/api/expenses/:id', (req, res) => {
    const id = req.params.id;
    Expense.delete(id, result => {
        res.json({ success: true });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});