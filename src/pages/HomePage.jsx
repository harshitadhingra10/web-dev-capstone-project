import { Link } from "react-router-dom"
import { Compass, Calendar, DollarSign, ArrowRight, TrendingUp, Users, Globe } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero">
        <h1>Discover Your Next Adventure ✨</h1>
        <p>Plan your dream trip with our intelligent travel platform</p>
        <Link to="/destinations">
          <button className="btn btn-primary" style={{ fontSize: '1.1rem' }}>
            Start Exploring <ArrowRight size={18} style={{ display: 'inline', marginLeft: '8px' }} />
          </button>
        </Link>
      </div>

      {/* Stats Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <Globe size={40} color="#667eea" style={{ marginBottom: '10px' }} />
          <h3>50+</h3>
          <p>Destinations</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <Users size={40} color="#667eea" style={{ marginBottom: '10px' }} />
          <h3>10,000+</h3>
          <p>Happy Travelers</p>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <TrendingUp size={40} color="#667eea" style={{ marginBottom: '10px' }} />
          <h3>24/7</h3>
          <p>Support</p>
        </div>
      </div>

      {/* Features Section */}
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem', color: '#333' }}>
        Everything You Need to Plan Your Trip
      </h2>
      
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Discover Destinations</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Browse through curated destinations with stunning photos and detailed information
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📋</div>
          <h3>Build Itinerary</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Create personalized travel plans by adding destinations and activities
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Track Budget</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            Monitor expenses and get smart suggestions to save money
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        color: 'white',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>
          Ready to Start Your Journey?
        </h3>
        <p style={{ marginBottom: '1.5rem', opacity: 0.95 }}>
          Join thousands of travelers who use TravelPlanner to organize their adventures
        </p>
        <Link to="/destinations">
          <button className="btn" style={{ background: 'white', color: '#667eea' }}>
            Browse Destinations Now
          </button>
        </Link>
      </div>
    </div>
  )
}