import { useState } from "react"
import { useTrip } from "../contexts/TripContext"

export default function BudgetPage() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const { budget, addExpense } = useTrip()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && amount) {
      addExpense({ name, amount: parseFloat(amount) })
      setName("")
      setAmount("")
    }
  }

  return (
    <div>
      <h2 className="page-title">Budget Planner</h2>
      
      <div className="budget-tip">
        💡 Recommended budget: $2000
      </div>

      <div className="card">
        <div className="total-amount">Total Spent: ${budget.total}</div>
        
        <form onSubmit={handleSubmit} className="expense-form">
          <input placeholder="Expense name" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <button className="btn btn-primary" type="submit">Add</button>
        </form>

        <h3>Expenses</h3>
        {budget.expenses.length === 0 ? (
          <div className="empty-state">No expenses yet</div>
        ) : (
          budget.expenses.map(exp => (
            <div key={exp.id} className="expense-item">
              <span>{exp.name}</span>
              <span>${exp.amount}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}