import { useTrip } from "../contexts/TripContext"
import { useTheme } from "../contexts/ThemeContext"
import { MapPin, Calendar, DollarSign, TrendingUp, Download, Share2 } from 'lucide-react'

export default function TripSummary() {
  const { itinerary, budget } = useTrip()
  const { darkMode } = useTheme()

  const totalDays = itinerary.length || 1
  const avgDailyCost = budget.total / totalDays

  const handleExport = () => {
    const data = {
      itinerary: itinerary,
      totalBudget: budget.total,
      expenses: budget.expenses,
      exportDate: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `trip-summary-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        📊 Trip Summary Dashboard
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: darkMode ? '#aaa' : '#666' }}>
        Complete overview of your travel plan
      </p>

      <div className="features-grid">
        <div className="card">
          <MapPin size={32} color="#667eea" />
          <h3>Places to Visit</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{itinerary.length}</p>
          <p>destinations in your itinerary</p>
        </div>

        <div className="card">
          <DollarSign size={32} color="#28a745" />
          <h3>Total Budget</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>
            ${budget.total.toFixed(2)}
          </p>
        </div>

        <div className="card">
          <TrendingUp size={32} color="#ffc107" />
          <h3>Daily Average</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            ${avgDailyCost.toFixed(2)}
          </p>
          <p>per day</p>
        </div>
      </div>

      <div className="card">
        <h3>Your Itinerary Items</h3>
        {itinerary.length === 0 ? (
          <p>No items added yet</p>
        ) : (
          <ul style={{ marginTop: '1rem' }}>
            {itinerary.map((item, index) => (
              <li key={item.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #eee' }}>
                {index + 1}. {item.name} {item.price && `- $${item.price}`}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="card">
        <h3>Export Your Trip Plan</h3>
        <p style={{ marginBottom: '1rem' }}>
          Download your complete trip data as JSON file
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={handleExport}>
            <Download size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Export as JSON
          </button>
          <button className="btn btn-success" onClick={() => window.print()}>
            <Share2 size={18} style={{ display: 'inline', marginRight: '8px' }} />
            Print Summary
          </button>
        </div>
      </div>
    </div>
  )
}