import { useState } from "react"
import { useTrip } from "../contexts/TripContext"

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
      <h2 className="page-title">My Itinerary</h2>
      
      <div className="card">
        <h3>Add Custom Activity</h3>
        <div className="input-group">
          <input 
            placeholder="Enter activity..." 
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAdd}>Add</button>
        </div>
      </div>

      {itinerary.length === 0 ? (
        <div className="empty-state">No items in your itinerary yet</div>
      ) : (
        itinerary.map(item => (
          <div key={item.id} className="itinerary-item">
            <span>{item.name} {item.price && `($${item.price})`}</span>
            <button className="btn btn-danger" onClick={() => removeFromItinerary(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  )
}