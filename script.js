const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");

let expenses = [];
let chart;

addExpenseBtn.addEventListener("click", () => {
    if (!expenseName.value || !expenseAmount.value) {
        alert("Please fill out all fields.");
        return;
    }

    const expense = {
        name: expenseName.value,
        amount: parseFloat(expenseAmount.value),
        category: expenseCategory.value
    };

    expenses.push(expense);
    renderExpenses();
    updateChart();

    expenseName.value = "";
    expenseAmount.value = "";
});

function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach(e => {
        const li = document.createElement("li");
        li.textContent = `${e.name} - $${e.amount} (${e.category})`;
        expenseList.appendChild(li);
    });
}

function updateChart() {
    const categoryTotals = {};
    expenses.forEach(e => {
        categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if (chart) chart.destroy();

    chart = new Chart(document.getElementById("expenseChart"), {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                label: "Expenses",
                data: data,
                backgroundColor: ["#3498db", "#e74c3c", "#f1c40f", "#2ecc71", "#9b59b6"]
            }]
        }
    });
}
