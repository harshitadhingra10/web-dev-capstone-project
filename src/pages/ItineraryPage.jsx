import { useState } from "react"
import { useTrip } from "../contexts/TripContext"
import { Plus, Trash2, Calendar, MapPin, Sparkles } from 'lucide-react'

export default function ItineraryPage() {
  const { itinerary, removeFromItinerary, addToItinerary } = useTrip()
  const [newItem, setNewItem] = useState("")

  const handleAdd = () => {
    if (newItem.trim()) {
      addToItinerary({ name: newItem, type: "custom" })
      setNewItem("")
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Your Travel Itinerary ✨
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Plan your perfect journey day by day
      </p>
      
      <div className="card">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <Sparkles size={20} color="#667eea" />
          Add Custom Activity
        </h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input 
            placeholder="e.g., Visit Eiffel Tower, Beach Day, Museum Tour..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            style={{
              flex: 1,
              padding: '0.8rem',
              border: '2px solid #e0e0e0',
              borderRadius: '10px',
              fontSize: '1rem'
            }}
          />
          <button className="btn btn-primary" onClick={handleAdd} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {itinerary.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>Your itinerary is empty</h3>
          <p>Start by adding destinations from the Destinations page!</p>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <Calendar size={20} color="#667eea" />
            <h3>Your Plan ({itinerary.length} items)</h3>
          </div>
          {itinerary.map((item, index) => (
            <div key={item.id} className="itinerary-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white',
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>{index + 1}</span>
                <div>
                  <strong>{item.name}</strong>
                  {item.price && (
                    <span style={{ color: '#667eea', marginLeft: '10px', fontWeight: 'bold' }}>
                      ${item.price}
                    </span>
                  )}
                  <span style={{ marginLeft: '10px', color: '#999', fontSize: '0.85rem' }}>
                    {item.type === 'destination' ? '📍 Destination' : '✨ Custom'}
                  </span>
                </div>
              </div>
              <button 
                className="btn btn-danger"
                onClick={() => removeFromItinerary(item.id)}
                style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}