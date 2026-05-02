import { useState } from "react"
import { useTrip } from "../contexts/TripContext"
import { Plus, Trash2, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export default function BudgetPage() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const { budget, addExpense } = useTrip()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && amount && amount > 0) {
      addExpense({ name, amount: parseFloat(amount) })
      setName("")
      setAmount("")
    }
  }

  const recommendedBudget = 2000
  const isOverBudget = budget.total > recommendedBudget
  const remaining = recommendedBudget - budget.total
  const percentage = (budget.total / recommendedBudget) * 100

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Budget Planner 💰
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Track your expenses and stay within budget
      </p>

      <div className="budget-stats">
        <h3>Total Spent</h3>
        <div className="total-amount">${budget.total.toFixed(2)}</div>
        <div style={{ marginTop: '1rem' }}>
          <div style={{
            width: '100%',
            height: '10px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '10px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${Math.min(percentage, 100)}%`,
              height: '100%',
              background: 'white',
              borderRadius: '10px',
              transition: 'width 0.3s ease'
            }} />
          </div>
          <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
            {percentage.toFixed(0)}% of ${recommendedBudget} budget
          </p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Plus size={20} /> Add Expense
          </h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              placeholder="Expense name (e.g., Hotel, Flight)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ flex: 2, padding: '0.8rem', border: '2px solid #e0e0e0', borderRadius: '10px' }}
              required
            />
            <input
              placeholder="Amount ($)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ flex: 1, padding: '0.8rem', border: '2px solid #e0e0e0', borderRadius: '10px' }}
              required
              min="0"
              step="0.01"
            />
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Plus size={18} /> Add
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <div style={{
          padding: '1rem',
          borderRadius: '10px',
          background: isOverBudget ? '#fee' : '#e8f5e9',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          {isOverBudget ? (
            <>
              <AlertCircle color="#dc3545" size={24} />
              <div>
                <strong style={{ color: '#dc3545' }}>Warning!</strong>
                <p style={{ margin: 0 }}>You've exceeded the recommended budget of ${recommendedBudget}</p>
              </div>
            </>
          ) : (
            <>
              <CheckCircle color="#28a745" size={24} />
              <div>
                <strong style={{ color: '#28a745' }}>Good job!</strong>
                <p style={{ margin: 0 }}>You're ${remaining.toFixed(2)} under the recommended budget</p>
              </div>
            </>
          )}
        </div>

        <h3 style={{ marginBottom: '1rem' }}>Expense History</h3>
        {budget.expenses.length === 0 ? (
          <div className="empty-state" style={{ padding: '2rem' }}>
            <p>No expenses added yet. Start tracking your budget!</p>
          </div>
        ) : (
          budget.expenses.map(exp => (
            <div key={exp.id} className="expense-item" style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.8rem',
              borderBottom: '1px solid #eee'
            }}>
              <span>{exp.name}</span>
              <span style={{ fontWeight: 'bold', color: '#667eea' }}>${exp.amount.toFixed(2)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}