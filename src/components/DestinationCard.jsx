import { useTrip } from "../contexts/TripContext"
import { MapPin, Star, Plus } from 'lucide-react'
import { useState } from "react"

export default function DestinationCard({ destination }) {
  const { addToItinerary } = useTrip()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToItinerary({ 
      name: destination.name, 
      price: destination.price,
      type: "destination"
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="destination-card">
      <img src={destination.image} alt={destination.name} />
      <div className="destination-info">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.3rem' }}>{destination.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={16} fill="#ffc107" color="#ffc107" />
            <span style={{ fontWeight: 'bold' }}>{destination.rating}</span>
          </div>
        </div>
        <p style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '5px' }}>
          <MapPin size={14} /> {destination.country}
        </p>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea', margin: '10px 0' }}>
          ${destination.price}
        </p>
        <button 
          className="btn btn-primary"
          onClick={handleAdd}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
        >
          <Plus size={18} />
          {added ? 'Added! ✓' : 'Add to Itinerary'}
        </button>
      </div>
    </div>
  )
}