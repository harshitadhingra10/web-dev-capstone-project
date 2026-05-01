export default function HomePage() {
  return (
    <div>
      <div className="card" style={{ textAlign: 'center' }}>
        <h1 style={{ color: '#1a73e8', fontSize: '36px' }}>
          ✈️ Travel Planning Platform
        </h1>
        <p style={{ fontSize: '18px', marginTop: '10px' }}>
          Your all-in-one tool for planning the perfect trip
        </p>
      </div>

      <div className="features">
        <div className="feature">
          <h2>🌍</h2>
          <h3>Explore Destinations</h3>
          <p>Browse popular travel destinations with prices and images</p>
          <small>→ Go to Destinations page</small>
        </div>
        
        <div className="feature">
          <h2>📝</h2>
          <h3>Create Itinerary</h3>
          <p>Add destinations and custom activities to your travel plan</p>
          <small>→ Go to Itinerary page</small>
        </div>
        
        <div className="feature">
          <h2>💰</h2>
          <h3>Manage Budget</h3>
          <p>Track expenses and get budget suggestions</p>
          <small>→ Go to Budget page</small>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', background: '#e7f3ff' }}>
        <p>
          <strong>💡 Tip:</strong> Start by exploring destinations and adding them to your itinerary!
        </p>
      </div>
    </div>
  )
}