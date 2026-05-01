import { useState } from "react"
import DestinationCard from "../components/DestinationCard"

const destinations = [
  { id: 1, name: "Paris", country: "France", price: 1200, image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400" },
  { id: 2, name: "Tokyo", country: "Japan", price: 1500, image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400" },
  { id: 3, name: "New York", country: "USA", price: 900, image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400" },
  { id: 4, name: "Bali", country: "Indonesia", price: 800, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" },
  { id: 5, name: "London", country: "UK", price: 1100, image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400" },
  { id: 6, name: "Dubai", country: "UAE", price: 1300, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400" }
]

export default function DestinationsPage() {
  const [search, setSearch] = useState("")
  
  const filtered = destinations.filter(dest => 
    dest.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2 className="page-title">Popular Destinations</h2>
      <input 
        className="search-box"
        placeholder="Search destinations..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="destinations-grid">
        {filtered.map(dest => (
          <DestinationCard key={dest.id} destination={dest} />
        ))}
      </div>
    </div>
  )
}