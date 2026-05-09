import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span>✈️</span>
        <span>TravelPlanner</span>
      </div>
      <div className="nav-links">
        <Link to="/">🏠 Home</Link>
        <Link to="/destinations">🌍 Destinations</Link>
        <Link to="/itinerary">📅 Itinerary</Link>
        <Link to="/budget">💰 Budget</Link>
      </div>
    </nav>
  )
}