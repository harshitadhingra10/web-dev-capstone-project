import { useState } from "react"
import { useTrip } from "../contexts/TripContext"
import { useTheme } from "../contexts/ThemeContext"
import { 
  Plus, Trash2, TrendingUp, AlertCircle, CheckCircle, 
  PieChart, Wallet, Hotel, Car, ShoppingBag, 
  Film, Plane, Utensils, Gift, Percent, Target, 
  Calendar, RefreshCw
} from 'lucide-react'

export default function BudgetPage() {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("food")
  const { budget, addExpense, removeExpense } = useTrip()
  const { darkMode } = useTheme()

  const recommendedBudget = 2000
  const isOverBudget = budget.total > recommendedBudget
  const remaining = recommendedBudget - budget.total
  const percentage = Math.min((budget.total / recommendedBudget) * 100, 100)
  
  // Category icons and colors
  const categories = {
    food: { icon: Utensils, color: "#ff6b6b", name: "Food & Dining", bg: "#ffe0e0" },
    hotel: { icon: Hotel, color: "#4ecdc4", name: "Hotel & Lodging", bg: "#e0f7f5" },
    transport: { icon: Car, color: "#45b7d1", name: "Transportation", bg: "#e0f0f5" },
    shopping: { icon: ShoppingBag, color: "#f7b731", name: "Shopping", bg: "#fff0e0" },
    entertainment: { icon: Film, color: "#a55eea", name: "Entertainment", bg: "#f0e0ff" },
    flight: { icon: Plane, color: "#eb3b5a", name: "Flights", bg: "#ffe0e5" },
    other: { icon: Gift, color: "#778ca3", name: "Other", bg: "#e8ecf1" }
  }

  const getCategoryTotal = () => {
    const totals = {}
    budget.expenses.forEach(exp => {
      const cat = exp.category || "other"
      totals[cat] = (totals[cat] || 0) + exp.amount
    })
    return totals
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && amount && amount > 0) {
      addExpense({ 
        name, 
        amount: parseFloat(amount),
        category: category,
        date: new Date().toISOString()
      })
      setName("")
      setAmount("")
    }
  }

  const handleDeleteExpense = (id) => {
    if (window.confirm('Delete this expense?')) {
      removeExpense(id)
    }
  }

  const categoryTotals = getCategoryTotal()

  // Get spending advice
  const getSpendingAdvice = () => {
    const hotelTotal = categoryTotals.hotel || 0
    const foodTotal = categoryTotals.food || 0
    const flightTotal = categoryTotals.flight || 0
    
    if (hotelTotal > 800) return "💡 Tip: Consider budget hotels or hostels to save on accommodation"
    if (foodTotal > 500) return "🍜 Tip: Try local street food instead of expensive restaurants"
    if (flightTotal > 1000) return "✈️ Tip: Book flights 2-3 months in advance for best prices"
    if (budget.total > recommendedBudget) return "⚠️ You're over budget! Try cutting unnecessary expenses"
    return "🎉 Great job staying within budget! Keep it up!"
  }

  return (
    <div>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          💰 Budget Planner
        </h2>
        <p style={{ color: darkMode ? '#aaa' : '#666' }}>
          Track your spending and save money on your trip
        </p>
      </div>

      {/* Main Stats Card */}
      <div className="budget-stats" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '20px',
        padding: '2rem',
        color: 'white',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <Wallet size={40} style={{ opacity: 0.9 }} />
            <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Total Spent</p>
            <h2 style={{ fontSize: '3rem', margin: '0.5rem 0' }}>
              ${budget.total.toFixed(2)}
            </h2>
          </div>
          <div>
            <Target size={40} style={{ opacity: 0.9 }} />
            <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Budget Left</p>
            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0', color: remaining >= 0 ? '#4ecdc4' : '#ff6b6b' }}>
              ${remaining >= 0 ? remaining.toFixed(2) : '0'}
            </h2>
          </div>
          <div>
            <Percent size={40} style={{ opacity: 0.9 }} />
            <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Budget Used</p>
            <h2 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>
              {percentage.toFixed(0)}%
            </h2>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div style={{ marginTop: '1.5rem' }}>
          <div className="progress-bar" style={{ background: 'rgba(255,255,255,0.3)' }}>
            <div className="progress-fill" style={{ 
              width: `${percentage}%`, 
              background: 'white',
              height: '8px',
              borderRadius: '10px',
              transition: 'width 0.5s ease'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            <span>$0</span>
            <span>${recommendedBudget}</span>
          </div>
        </div>
      </div>

      {/* Warning/Success Message */}
      <div className="card" style={{
        background: isOverBudget ? '#fff3cd' : '#d4edda',
        color: isOverBudget ? '#856404' : '#155724',
        marginBottom: '1.5rem',
        border: `1px solid ${isOverBudget ? '#ffeeba' : '#c3e6cb'}`
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isOverBudget ? <AlertCircle size={24} /> : <CheckCircle size={24} />}
          <div>
            <strong>{isOverBudget ? 'Warning!' : 'Good job!'}</strong>
            <p style={{ margin: 0 }}>
              {isOverBudget 
                ? `You've exceeded your budget by $${Math.abs(remaining).toFixed(2)}` 
                : `You're $${remaining.toFixed(2)} under budget. Keep it up!`}
            </p>
          </div>
        </div>
      </div>

      {/* Spending Advice */}
      <div className="card" style={{ marginBottom: '1.5rem', background: darkMode ? '#2d2d3d' : '#e7f3ff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingUp size={24} color="#667eea" />
          <div>
            <strong>Smart Spending Advice</strong>
            <p style={{ margin: 0 }}>{getSpendingAdvice()}</p>
          </div>
        </div>
      </div>

      {/* Add Expense Form */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Plus size={20} /> Add New Expense
        </h3>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <input
              placeholder="Expense name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ padding: '0.8rem', border: `2px solid ${darkMode ? '#444' : '#e0e0e0'}`, borderRadius: '10px', background: darkMode ? '#1a1a2e' : 'white', color: darkMode ? 'white' : '#333' }}
              required
            />
            <input
              placeholder="Amount ($)"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: '0.8rem', border: `2px solid ${darkMode ? '#444' : '#e0e0e0'}`, borderRadius: '10px', background: darkMode ? '#1a1a2e' : 'white', color: darkMode ? 'white' : '#333' }}
              required
              min="0"
              step="0.01"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '0.8rem', border: `2px solid ${darkMode ? '#444' : '#e0e0e0'}`, borderRadius: '10px', background: darkMode ? '#1a1a2e' : 'white', color: darkMode ? 'white' : '#333' }}
            >
              {Object.entries(categories).map(([key, cat]) => (
                <option key={key} value={key}>{cat.name}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <Plus size={18} /> Add Expense
            </button>
          </div>
        </form>
      </div>

      {/* Category Breakdown */}
      {budget.expenses.length > 0 && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <PieChart size={20} /> Spending by Category
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            {Object.entries(categories).map(([key, cat]) => {
              const total = categoryTotals[key] || 0
              if (total === 0) return null
              const percent = (total / budget.total) * 100
              return (
                <div key={key} style={{ 
                  background: cat.bg, 
                  padding: '1rem', 
                  borderRadius: '10px',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <cat.icon size={20} color={cat.color} />
                    <strong>{cat.name}</strong>
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: cat.color }}>
                    ${total.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>
                    {percent.toFixed(1)}% of total
                  </div>
                  <div className="progress-bar" style={{ marginTop: '8px', background: '#e0e0e0' }}>
                    <div style={{ width: `${percent}%`, height: '4px', background: cat.color, borderRadius: '10px' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Expense List */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3>Expense History</h3>
          <button 
            className="btn" 
            style={{ background: 'transparent', padding: '0.5rem' }}
            onClick={() => window.location.reload()}
          >
            <RefreshCw size={18} />
          </button>
        </div>
        
        {budget.expenses.length === 0 ? (
          <div className="empty-state" style={{ padding: '2rem', textAlign: 'center' }}>
            <Wallet size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No expenses added yet.</p>
            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Start tracking your budget by adding an expense above!</p>
          </div>
        ) : (
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {budget.expenses.map((exp) => {
              const cat = categories[exp.category] || categories.other
              return (
                <div key={exp.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  borderBottom: `1px solid ${darkMode ? '#333' : '#eee'}`,
                  transition: 'background 0.3s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                    <div style={{ background: cat.bg, padding: '8px', borderRadius: '10px' }}>
                      <cat.icon size={20} color={cat.color} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 'bold' }}>{exp.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666', display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <span>{cat.name}</span>
                        <span>•</span>
                        <span><Calendar size={12} style={{ display: 'inline' }} /> {new Date(exp.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#28a745' }}>
                      ${exp.amount.toFixed(2)}
                    </span>
                    <button 
                      className="btn btn-danger"
                      onClick={() => handleDeleteExpense(exp.id)}
                      style={{ padding: '0.3rem 0.8rem' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Quick Tips Section */}
      <div className="card" style={{ marginTop: '1.5rem', background: darkMode ? '#2d2d3d' : '#f0f0f0' }}>
        <h3 style={{ marginBottom: '1rem' }}>💡 Money Saving Tips</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <strong>🏨 Accommodation</strong>
            <p style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>Book hostels or Airbnb instead of hotels</p>
          </div>
          <div>
            <strong>🍜 Food</strong>
            <p style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>Eat where locals eat, not tourists</p>
          </div>
          <div>
            <strong>🚇 Transport</strong>
            <p style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>Use public transport instead of taxis</p>
          </div>
          <div>
            <strong>🎫 Attractions</strong>
            <p style={{ fontSize: '0.9rem', marginTop: '0.3rem' }}>Look for city passes and student discounts</p>
          </div>
        </div>
      </div>
    </div>
  )
}