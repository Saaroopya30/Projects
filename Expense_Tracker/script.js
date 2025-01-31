document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const response = await fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, category, amount })
    });
    const expense = await response.json();
    addExpenseToTable(expense);
    document.getElementById('expense-form').reset();
    updateTotalBalance();
});
async function fetchExpenses() {
    const response = await fetch('/api/expenses');
    const expenses = await response.json();
    expenses.forEach(expense => addExpenseToTable(expense));
    updateTotalBalance();
}
function addExpenseToTable(expense) {

    const expenseList = document.getElementById('expense-list');
    const expenseRow = document.createElement('tr');
    const formattedDate = new Date(expense.date).toLocaleDateString();
    expenseRow.innerHTML = `
    <td>${expense.description}</td>
    <td>${expense.category}</td>
    <td>₹${expense.amount}</td>
    <td>${formattedDate}</td>
    <td><button onclick="deleteExpense(${expense.id})">Delete</button></td>
    `;
    expenseRow.dataset.id = expense.id;
    expenseRow.dataset.amount = expense.amount;
    expenseList.appendChild(expenseRow);
}
async function deleteExpense(id) {
    await fetch(`/api/expenses/${id}`, {
        method: 'DELETE'
    });
    const expenseRow = document.querySelector(`tr[data-id='${id}']`);
    expenseRow.remove();
    updateTotalBalance();
}
function updateTotalBalance() {
    const expenseList = document.getElementById('expense-list');
    const rows = expenseList.getElementsByTagName('tr');
    let total = 0;
    for (const row of rows) {
        total += parseFloat(row.dataset.amount);
    }
    document.getElementById('total-balance').textContent = `Total Expenses:
    ₹${total.toFixed(2)}`;
}
fetchExpenses();