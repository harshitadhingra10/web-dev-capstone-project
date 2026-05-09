import { useState, useEffect } from "react"
import { useTrip } from "../contexts/TripContext"

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const { addToItinerary } = useTrip()

  useEffect(() => {
    const loadDestinations = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region')
        const data = await response.json()
        
        const formatted = data.slice(0, 12).map((country, i) => ({
          id: i,
          name: country.name.common,
          capital: country.capital?.[0] || "Unknown",
          region: country.region,
          population: country.population.toLocaleString(),
          price: Math.floor(Math.random() * 1500) + 500,
          image: country.flags?.png || "https://placehold.co/400x250/4169E1/white?text=Country"
        }))
        
        setDestinations(formatted)
        setLoading(false)
      } catch (err) {
        console.error(err)
        setLoading(false)
      }
    }
    
    loadDestinations()
  }, [])

  const filtered = destinations.filter(dest =>
    dest.name.toLowerCase().includes(search.toLowerCase()) ||
    dest.region.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="loading">🌍 Loading amazing destinations...</div>
  }

  return (
    <div>
      <div className="page-header">
        <h1>✨ <span>Explore Destinations</span> ✨</h1>
        <p>Discover beautiful places around the world with our colorful guide</p>
      </div>

      <input
        type="text"
        className="search-box"
        placeholder="🔍 Search by country or region..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="destinations-grid">
        {filtered.map(dest => (
          <div key={dest.id} className="destination-card">
            <img src={dest.image} alt={dest.name} />
            <div className="destination-info">
              <h3>{dest.name}</h3>
              <p>📍 {dest.capital}</p>
              <p>🌍 {dest.region}</p>
              <p>👥 {dest.population}</p>
              <p className="destination-price">💰 ${dest.price}</p>
              <button 
                className="btn btn-success"
                onClick={() => addToItinerary({ 
                  name: dest.name, 
                  price: dest.price,
                  type: "destination"
                })}
                style={{ width: '100%', marginTop: '8px' }}
              >
                💖 Add to Itinerary
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <p>😢 No destinations found. Try a different search!</p>
        </div>
      )}
    </div>
  )
}