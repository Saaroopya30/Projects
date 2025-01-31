const db = require('../db');
class Expense {
    static getAll(callback) {
        db.query('SELECT * FROM expenses', (err, results) => {
            if (err) throw err;
            callback(results);
        });
    }
    static create(data, callback) {
        const { description, category, amount } = data;
        db.query('INSERT INTO expenses (description, category, amount, date) VALUES(?, ?, ?, NOW())',
        [description, category, amount], (err, result) => {
            if (err) throw err;
            db.query('SELECT * FROM expenses WHERE id = ?', [result.insertId], (err,
                results) => {
                if (err) throw err;
                callback(results[0]);
            });
        });
    }
    static delete(id, callback) {
        db.query('DELETE FROM expenses WHERE id = ?', [id], (err, result) => {
            if (err) throw err;
            callback(result);
        });
    }
}
module.exports = Expense;