import { Link, useLocation } from "react-router-dom"
import { Compass, Calendar, DollarSign, Home } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  return (
    <nav className="navbar">
      <div className="logo">
        <span>✈️</span>
        <span>TravelPlanner</span>
      </div>
      <div className="nav-links">
        <Link to="/" style={{ 
          background: isActive('/') ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
          color: isActive('/') ? 'white' : '#333'
        }}>
          <Home size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Home
        </Link>
        <Link to="/destinations" style={{ 
          background: isActive('/destinations') ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
          color: isActive('/destinations') ? 'white' : '#333'
        }}>
          <Compass size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Destinations
        </Link>
        <Link to="/itinerary" style={{ 
          background: isActive('/itinerary') ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
          color: isActive('/itinerary') ? 'white' : '#333'
        }}>
          <Calendar size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Itinerary
        </Link>
        <Link to="/budget" style={{ 
          background: isActive('/budget') ? 'linear-gradient(135deg, #667eea, #764ba2)' : 'transparent',
          color: isActive('/budget') ? 'white' : '#333'
        }}>
          <DollarSign size={18} style={{ display: 'inline', marginRight: '8px' }} />
          Budget
        </Link>
      </div>
    </nav>
  )
}