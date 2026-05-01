import { useTrip } from "../contexts/TripContext"

export default function DestinationCard({ destination }) {
  const { addToItinerary } = useTrip()

  return (
    <div className="destination-card">
      <img src={destination.image} alt={destination.name} />
      <div className="destination-info">
        <h3>{destination.name}</h3>
        <p>{destination.country}</p>
        <p className="destination-price">${destination.price}</p>
        <button 
          className="btn btn-primary"
          onClick={() => addToItinerary({ 
            name: destination.name, 
            price: destination.price 
          })}
        >
          Add to Itinerary
        </button>
      </div>
    </div>
  )
}