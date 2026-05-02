import { useState } from "react"
import DestinationCard from "../components/DestinationCard"
import { Search } from 'lucide-react'

const destinations = [
  { id: 1, name: "Paris", country: "France", price: 1200, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400", rating: 4.8 },
  { id: 2, name: "Tokyo", country: "Japan", price: 1500, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400", rating: 4.9 },
  { id: 3, name: "New York", country: "USA", price: 900, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400", rating: 4.7 },
  { id: 4, name: "Bali", country: "Indonesia", price: 800, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400", rating: 4.9 },
  { id: 5, name: "London", country: "UK", price: 1100, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400", rating: 4.6 },
  { id: 6, name: "Dubai", country: "UAE", price: 1300, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400", rating: 4.8 }
]

export default function DestinationsPage() {
  const [search, setSearch] = useState("")
  
  const filtered = destinations.filter(dest => 
    dest.name.toLowerCase().includes(search.toLowerCase()) ||
    dest.country.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2 className="page-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Explore Amazing Destinations 🌍
      </h2>
      <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#666' }}>
        Discover the most beautiful places around the world
      </p>
      
      <div className="search-wrapper">
        <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
        <input 
          className="search-box"
          placeholder="Search by destination name or country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: '50px' }}
        />
      </div>
      
      <div className="destinations-grid">
        {filtered.map(dest => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
      
      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>No destinations found</h3>
          <p>Try searching with a different keyword</p>
        </div>
      )}
    </div>
  )
}